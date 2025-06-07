"use server"

import postgres from "postgres";
// import { ParameterOrJSON }  from "postgres";
import { getAverageRatings } from "./productActions";

const sql = postgres(process.env.DATABASE_URL!, {ssl: "require"});

//return list of all categories and all sellers
export async function getAllCategoriesAndSellers(): Promise<{
    allCategories: Array<{id: string; name: string}>;
    allSellers: Array<{id: string; name: string}>;
}> {
    const allCategories = await sql<{id: string; name: string}[]>`
    SELECT category_id, category_name
    FROM categories
    ORDER BY category_name;`;

    const allSellers = await sql <{id: string; name: string}[]>`
    SELECT id, name
    FROM sellers
    ORDER BY name;`;

    return {allCategories, allSellers}
}

//build dynamic WHERE clause
export async function getFilteredProducts(searchParams: {
    [key:string]:string | string[] | undefined;
}): Promise <
    Array<{
        id:string;
        title: string;
        price: number;
        imageUrl: string;
        sellerId:string;
        sellerName:string;
        averageRating:number;
    }>    
> {    
    //get category out of searchParams; make sure it's an array
    let categoryFilter: string [] = [];
    if (Array.isArray(searchParams.categories)) {
        categoryFilter = searchParams.categories  
    } else if ( typeof searchParams.categories === "string") {
        categoryFilter = [searchParams.categories];  //put it in an array
    }


    // get sellers out of searchParams
    let sellerFilter: string [] = [];
    if (Array.isArray(searchParams.sellers)){
        sellerFilter = searchParams.sellers
    } else if (typeof searchParams.sellers === "string") {
        sellerFilter = [searchParams.sellers];
    }

    // get filter price string out of searchParams
    const priceParam = typeof searchParams.price === "string" ? searchParams.price: "";

    //start with empty array, define type
    const whereClauses: string [] = [];
    const values: (string | number)[] = []
    let idx = 1;

    // categories filter
    if (categoryFilter.length > 0) {
        const placeholders = categoryFilter.map((_unused, i) => `$${idx+i}`);  //dynamically create placeholder values $1, $2, $3...
        whereClauses.push(`i.category_id IN (${placeholders.join(",")})`); //ex. i.category_id IN ($1,$2,$3)
        values.push(...categoryFilter);  //ex. ["Garden", "Kitchen", "Art"]
        idx += categoryFilter.length;  //placeholder number,keeps track of how many category params are in the search, can be added to or subtracted from

    }

    // sellers filter
    if (sellerFilter.length > 0) { 
        const placeholders = sellerFilter.map((_unused, i) => `$${idx+i}`); 
        whereClauses.push(`i.seller_id IN (${placeholders.join(",")})`);
        values.push(...sellerFilter);
        idx += sellerFilter.length;
    }

    // price filter, string value comes from value  in label:value pair in FilterSidebar component
    if (priceParam == 'under-25') {
        whereClauses.push(`i.inv_price < $${idx}`);
        values.push(2500);
        idx++;
    } else if (priceParam == '25-74.99') {
        whereClauses.push(`i.inv_price>=$${idx} AND i.inv_price <= $${idx+1}`);
        values.push(2500,7499);
        idx+=2;    
    } else if (priceParam == '75-150') {
        whereClauses.push(`i.inv_price >=$${idx} AND i.inv_price <= $${idx}`);
        values.push(7500, 15000);
        idx+=2;        
    } else if (priceParam == 'above-150') {
        whereClauses.push(`i.inv_price > $${idx}`);
        values.push(15000);
        idx++;
    }


    const whereString = whereClauses.length > 0 ? "WHERE" + whereClauses.join(" AND "):"";
    type InventoryRow = {
        id: string;
        inv_title: string;
        inv_price: number;
        image_url: string;
        seller_id: string;
        name: string;  //seller shop name
    };

    // create sql query string
    const sqlQuery = `
        SELECT DISTINCT
            i.id,
            i.inv_title,
            i.inv_price,
            i.image_url,
            i.seller_id,
            s.name
        FROM inventory AS i
        JOIN inventory_categories AS ic
            ON ic.inv_id = i.id
        JOIN sellers AS s
            ON i.seller_id = s.id
        ${whereString}
        ORDER BY i.inv_title;
        `;

        /**FIX THIS ??? TYPESCRIPT ERROR */
// these statements are giving type errors ????
    // @ts-expect-error : 1. Type of "await" must either be a valid promise or must not contain a callable 'then' member;  and 2) Argument of type "string" is not assignable to parameter of type 'TemplateStringsArray'.
    const products: InventoryRow[] = await sql<InventoryRow[]>(sqlQuery, ...values);
// const products: InventoryRow[] = await sql
//     .unsafe<InventoryRow[]>(sqlQuery, ...values);

    // const products: InventoryRow[] = await sql.unsafe<
    //     InventoryRow[],      // <ResultType = InventoryRow[]>
    //     (string|number)[]    // <TupleOfParams = array of string|number>
    //     >(
    //     sqlQuery,
    //     ...values
    //     );

    // const products: InventoryRow[] = await sql
    //   .unsafe<InventoryRow[]>(sqlQuery,    
    //     ...(values as any)
    // );
    

    const ids = products.map((p) => p.id);
    const ratingsMap = await getAverageRatings(ids);

    return products.map((p) => ({
        id: p.id,
        title: p.inv_title,
        price: p.inv_price,
        imageUrl: p.image_url,
        sellerId: p.seller_id,
        sellerName: p.name,
        averageRating: ratingsMap[p.id] || 0,
    }));

}

