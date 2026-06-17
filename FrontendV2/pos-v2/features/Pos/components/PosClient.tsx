import Container from "@/components/layout/container";
import PosRight from "./right/posRight";
import Bucket from "./left/Bucket";

export default function PosClient() {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-zinc-50/50 dark:bg-zinc-950/20">
      <Container className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-7 w-full">
            <PosRight />
          </div>
          <div className="lg:col-span-5 w-full sticky top-20">
              <Bucket />
          </div>
        </div>
      </Container>
    </div>
  );
}
