import SidebarDialog from "./sideBar/Dilaog/SidebarDialog";
import SideBar from "./sideBar/SideBar";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return <> 
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-background">
      <div className="hidden md:block">
        <SideBar />  
      </div>

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-slate-50/40 dark:bg-slate-950/20">
        <header className="md:hidden flex items-center p-4 border-b bg-background sticky top-0 z-40">
          <SidebarDialog />
          <h1 className="ml-4 text-lg font-bold">
            My<span className="text-blue-600">Store</span>
          </h1>
        </header>    
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
    </>;
} 