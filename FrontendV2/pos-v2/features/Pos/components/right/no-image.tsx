import { Package } from "lucide-react";

export default function NoImage(){
    return(
         <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-300 dark:text-zinc-600">
            <Package className="size-10 stroke-[1.5]" />
            <span className="text-[10px] font-medium tracking-wider uppercase">
              No Image
            </span>
          </div>
    )
}