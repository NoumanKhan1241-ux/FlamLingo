"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Make sure to import Image


type Props = {
    label: string;
    iconSrc: string;
    href: string;
};

export const SidebarItem = ({
    label,
    iconSrc,
    href,
}: Props) => {
    const pathname = usePathname(); 
    const active = pathname === href; // Determine if the item is active

    return (
        <Button
            variant={active ? "sidebarOutline" : "sidebar"}
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Image 
                    src={iconSrc} // Use the variable instead of a string
                    alt={label}
                    className="mr-5"
                    height={32}
                    width={32}
                />
                {label}
            </Link>
        </Button>
    );
};