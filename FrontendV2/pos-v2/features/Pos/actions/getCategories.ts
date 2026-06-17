import { Category } from "../types/CategoryType";

export async function getCategories() {
    try {

        const response = await fetch(`${process.env.Next_Public_Api_Url}/Category/GetAllCategories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.Api_Key}`
            },
        });
        if(!response.ok) return { isSuccess: false, value: [] };
        const r = await response.json();
        console.log("Categories",r);
        const data : Category[] = r.value;

        return { isSuccess: true, value: data };
    } catch (e) {
        console.error(`Category Error : ${e}`);
        return { isSuccess: false, value: [] };
    }
}