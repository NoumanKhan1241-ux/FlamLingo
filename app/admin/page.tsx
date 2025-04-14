import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminWrapper from "./AdminWrapper"; // <-- new wrapper (client)

export default async function AdminPage() {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AdminWrapper />;
}
