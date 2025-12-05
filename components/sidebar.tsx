import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { getIsAdmin } from "@/lib/admin";
import AdminSidebarItem from "@/components/admin-sidebar-item";
import { UserButtonWrapper } from "./user-button-wrapper";

type Props = {
className?: string;

}

export const Sidebar = async ({className}: Props) => {
  const isAdmin = await getIsAdmin();
return(
     
       <div className={cn("flex  h-full lg:w-[256px] lg:fixed left-0 top-0 border-r-2 flex-col",className,

       )}>
     <Link href="/learn">
     <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3"> 
                        <Image  src="/flamingo_logo_bg.png" height={50} width={50} alt="logo" />
                        <h1 className=" text-2xl font-extrabold text-green-600 tracking-wide">
                            FlamLingo
                        </h1>
                    </div>
                    </Link> 
                    <div className="flex flex-col gap-y-2 flex-1">
                        <SidebarItem  label="Learn"
                         iconSrc="/house.png"
                          href="/learn"/>
                          <SidebarItem  label="Leaderboard"
                         iconSrc="/leaderboard.png"
                          href="/leaderboard"/>
                          <SidebarItem  label="Quests"
                         iconSrc="/quests.png"
                          href="/quests"/>
                          <SidebarItem  label="Shop"
                         iconSrc="/shop.png"
                          href="/shop"/>
                          <SidebarItem  label="Translation"
                         iconSrc="/translation.png"
                          href="/translation"/>
                          <SidebarItem  label="Pronunciation"
                         iconSrc="/pronunciation.png"
                          href="/pronunciation"/>
                          <SidebarItem  label="Phrasebook"
                         iconSrc="/book.png"
                          href="/phrasebook"/>
                          <SidebarItem  label="Reading"
                         iconSrc="/reading.png"
                          href="/reading"/> 
                        </div>       
                        <div className="p-4 ">
                             {/* Admin button pinned above profile */}
                             <div className="mb-3">
                               <AdminSidebarItem canAccess={isAdmin} />
                             </div>
                             <UserButtonWrapper />
                        </div>
    </div>

 );


};
