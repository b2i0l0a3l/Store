import Container from "../container";
import SidebarLinks from "./SidebarLinks";



export default function SideBar() {
  return (
    <aside className=" space-y-2 min-h-screen min-w-64 w-[17.5vw] border-r border-accent/50">
      <Container className="flex flex-col justify-between min-h-full">
          <SidebarLinks />      
      </Container>
    </aside>
  );
}
