"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  canAccess: boolean;
};

export default function AdminSidebarItem({ canAccess }: Props) {
  if (canAccess) {
    return (
      <Button variant="sidebar" className="justify-start h-[52px]" asChild>
        <Link href="/admin">
          <Image src="/file.svg" alt="Admin" className="mr-5" height={32} width={32} />
          Admin
        </Link>
      </Button>
    );
  }

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.error("You do not have access to the admin panel");
  };

  return (
    <Button variant="sidebar" className="justify-start h-[52px]" onClick={onClick}>
      <Image src="/file.svg" alt="Admin" className="mr-5" height={32} width={32} />
      Admin
    </Button>
  );
}
