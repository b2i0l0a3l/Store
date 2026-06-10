
export async function getProducts() {
    try{
        const response = await fetch(`${process.env.Api_Url}/Product/All`,{method:"GET",headers:{"Content-Type":"application/json"}});
        return response.json();
    }catch(e){
        console.log(e);
        return [];
    }
}