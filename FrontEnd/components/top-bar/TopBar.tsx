import { CurrentUser } from "@/util/currentUser";
import TopBarClient from "./TopBarClient";

export default async function TopBar() {
  const currentUser = await CurrentUser();

  return <TopBarClient user={currentUser} />;
}
