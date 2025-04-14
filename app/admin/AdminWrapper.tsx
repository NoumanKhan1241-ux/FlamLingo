"use client";

import dynamic from "next/dynamic";

const AdminClient = dynamic(() => import("./AdminClient"), {
  ssr: false,
});

const AdminWrapper = () => {
  return <AdminClient />;
};

export default AdminWrapper;
