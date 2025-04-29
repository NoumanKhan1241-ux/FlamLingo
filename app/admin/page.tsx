// app/admin/page.tsx
import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminClientWrapper from "./AdminClientWrapper";

export default async function AdminPage() {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AdminClientWrapper />;
}
