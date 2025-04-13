import { X } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type Props = {

    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
};

export const Header = ({
    hearts,
    percentage,
    hasActiveSubscription,
}: Props) => {

    return(
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
        <X
        onClick={() => {}} //TOSO: add onCLick exit
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
        />
        <Progress value = {percentage}/>
        </header>
    );
};