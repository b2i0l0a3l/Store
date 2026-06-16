import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFount() {
    return <div className="flex justify-center items-center flex-col gap-3 mt-15" >
        <h1 className="text-2xl text-red-500">Not Found</h1>
        <Link href="/dashboard">
            <HomeIcon className="size-10 text-blue-600 cursor-pointer" />
        </Link>
    </div>;   
}