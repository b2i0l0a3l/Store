import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/toggle/mode-toggle";
import { Button } from "@/components/ui/button";

export default async function NavBarRight() {
    const {userId} = await auth(); 
    return (
        <div className="flex justify-center items-center gap-2.5">
            <ModeToggle/>
            {userId ? <UserButton /> : <div className="flex items-center space-x-3">
                <SignInButton>
                    <Button variant="ghost" className="cursor-pointer">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                    <Button className="cursor-pointer">Sign Up</Button>
                </SignUpButton> 
            </div>
           }
        </div>
    );
}