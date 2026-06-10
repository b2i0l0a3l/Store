import { StoreIcon } from "lucide-react";
import Container from "../container";
import NavBarRight from "./nav-bar-right";
import { Separator } from "@/components/ui/separator";

export default function NavBar() {
    return (
        <header>  
            <Container>
                <div className="flex justify-between">
                    <div className="flex justify-between items-center gap-2.5">
                        <h1 className="flex items-center gap-2.5 font-bold text-2xl cursor-pointer hover:text-primary/50 transition-colors">
                            <StoreIcon className="size-7" />
                            <span className="bg-linear-to-r from-fuchsia-500 to-purple-500 text-transparent bg-clip-text">Store</span>
                        </h1>
                    </div>
                    <NavBarRight/>
                </div>
            </Container>
            <Separator className="my-1.5 bg-accent/25"/>
        </header> 
    );
}