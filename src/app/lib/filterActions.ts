"use server"

import postgres from "postgres";
import { getAverageRatings } from "./productActions";

const sql = postgres(process.env.DATABASE_URL!, {ssl: "require"});

type InventoryRow = {
        id: string;
        inv_title: string;
        inv_price: number;
        image_url: string;
        seller_id: string;
        name: string;  //seller shop name
    };

//return list of all categories and all sellers
export async function getAllCategories(): Promise<{
    allCategories: Array<{category_id: string; category_name: string}>;    
}> {
    try {
        const allCategories = await sql<{category_id: string; category_name: string}[]>`
        SELECT category_id::text AS category_id, category_name
        FROM categories
        ORDER BY category_name;`;

        return {allCategories}
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch category list.');
    }
}

//return list of all categories and all sellers
export async function getAllSellers(): Promise<{   
    allSellers: Array<{id: string; name: string}>;
}> {
    try {
        const allSellers = await sql <{id: string; name: string}[]>`
        SELECT id, name
        FROM sellers
        ORDER BY name;`;

        return {allSellers}
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch artisan list.');
    } 
}

//build dynamic WHERE clause, get filtered array of product objects
export async function getFilteredProducts(searchParams: {
    [key:string]:string | string[] | undefined;
}): Promise <Array<InventoryRow & {averageRating:number}>    
> {    
    try {
        // console.log("searchParams: ", searchParams);
        //normalize categories into an array (empty, ["1007"], or ["1007", "1008"])
        const categories = Array.isArray(searchParams.categories)
            ? searchParams.categories
            : searchParams.categories
            ? [searchParams.categories]
            : []

        
        // console.log("categories: ", categories);
        //normalize sellers
        const sellers = Array.isArray(searchParams.sellers)
            ? searchParams.sellers
            : searchParams.sellers
            ? [searchParams.sellers]
            : [];

        //normalize price
        const price = typeof searchParams.price === "string"
            ? searchParams.price
            : "";

        
        let categoryPartial = sql``;

        if (categories.length) {
            categoryPartial = sql`ic.category_id IN ${sql(categories)}`    
        }

        // console.log("categoriesPartial: ", categoryPartial); //only a promise, will cause error when run

        let sellerPartial = sql``;
        if (sellers.length) {
            sellerPartial = sql`i.seller_id IN ${sql(sellers)}`
        }
        

        let pricePartial = sql``;
        if(price === "under-25") {
            pricePartial  = sql`i.inv_price < ${2500}`;
        } else if (price === "25-7499") {
            pricePartial = sql`i.inv_price BETWEEN ${2500} AND ${7499}`;
        } else if (price === "75-150") {
            pricePartial = sql`i.inv_price BETWEEN ${7500} AND ${15000}`;        
        } else if (price === "above-150") {
            pricePartial = sql`i.inv_price > ${15000}`;
        }

        const products: InventoryRow[] = await sql`
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
            ${categories.length || sellers.length || price
                ?sql`WHERE
                ${categoryPartial}
                ${categories.length && sellers.length ? sql` AND `: sql``}
                ${sellerPartial}
                ${ (categories.length || sellers.length) && price ? sql`AND`: sql``}
                ${pricePartial}`:sql``}

                ORDER BY i.inv_title
                `;

        // console.log("products: ", products);

        const ids = products.map((product) => product.id);
        const ratingsMap = await getAverageRatings(ids);

        return products.map((p) => ({
            id: p.id,
            inv_title: p.inv_title,
            inv_price: p.inv_price,
            image_url: p.image_url,
            seller_id: p.seller_id,
            name: p.name,
            averageRating: ratingsMap[p.id] || 0,
        }));
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    } 

}

