import { StoreIcon } from "lucide-react";
import Container from "../container";
import NavBarRight from "./nav-bar-right";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { NavbarLogo } from "./navbar-logo";

export default async function NavBar() {
    const {userId} = await auth();
    
    return (
        <header>  
            <Container>  
                <div className="flex justify-between">
                    <NavbarLogo isAuth={!!userId} />
                    {userId &&   
                        <NavBarRight/>
                    }
                </div> 
            </Container>
            <Separator className="my-1.5 "/>
        </header> 
    );
}