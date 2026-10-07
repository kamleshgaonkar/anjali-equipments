import Navbar from "@/components/layout/Navbar";
import { fetchNavCatalogue } from "@/lib/catalogue/queries";

export default async function NavbarShell() {
  const catalogue = await fetchNavCatalogue();
  return <Navbar catalogue={catalogue} />;
}
