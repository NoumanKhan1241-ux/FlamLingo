// app/admin/AdminClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Load the actual Admin app without SSR
const AdminApp = dynamic(() => import("./app"), { ssr: false });

export default function AdminClientWrapper() {
  return <AdminApp />;
}
