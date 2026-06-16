import Container from "@/components/layout/container";
import PosRight from "./right/posRight";
import { Product } from "../actions/productType";

export default function PosClient({Products}:{Products:Product[]}){
    return (
        <div className="w-full">
            <Container>
                <div className="grid grid-cols-2  gap-2 max-sm:grid-1">
                    <PosRight Products={Products}/>
                    <div className="w-full ">
                        <div>d</div>
                    </div>
                </div>
            </Container>
        </div>
    )
}