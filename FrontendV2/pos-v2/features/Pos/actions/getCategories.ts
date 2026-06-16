import { Category } from "./CategoryType";

export async function getCategories() {
    try {

        const response = await fetch(`http://localhost:5107/api/v1/Category/GetAllCategories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.Api_Key}`
            },
        });
        if(!response.ok) return { isSuccess: false, value: [] };
        const r = await response.json();
        const data : Category[] = r.value;

        return { isSuccess: true, value: data };
    } catch (e) {
        console.error(`Product Error : ${e}`);
        return { isSuccess: false, value: [] };
    }
}