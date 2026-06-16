import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import BucketItem from "./BucketItem";
import BucketHeader from "./BucketHeader";
import BucketFooter from "./BucketFooter";


export default function Bucket() {
  return (
    <Card className="w-full flex flex-col h-[calc(100vh-100px)] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
      <CardHeader >
        <BucketHeader />
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto p-4 gap-3 flex flex-col no-scrollbar">
          <BucketItem />
      </CardContent>

      <CardFooter className="translate-4  border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col gap-3 shrink-0 w-full">
       <BucketFooter/>
      </CardFooter>
    </Card>
  );
}