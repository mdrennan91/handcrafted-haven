"use server"

import postgres from "postgres";
import { getAverageRatings } from "./productActions";

const sql = postgres(process.env.DATABASE_URL!, {ssl: "require"});

//return list of all categories and all sellers
export async function getAllCategoriesAndSellers(): Promise<{
    allCategories: Array<{id: string; name: string}>;
    allSellers: Array<{id: string; name: string}>;
}> {
    const allCategories = await sql<{id: string; name: string}[]>`
    SELECT id, name
    FROM categories
    ORDER BY name;`;

    const allSellers = await sql <{id: string; name: string}[]>`
    SELECT id, name
    FROM sellers
    ORDER BY name;`;

    return {allCategories, allSellers}
}

//build dynamic WHERE clause
export async function getFilteredProducts() {    return null;}



