"use client";
import { useState } from "react";

import { challengeOptions, challenges } from "@/db/schema";

import { Header } from "./header";

type Props = {
 initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLesssonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    
    })[];
    userSubscription: any; //TODO: replace with subscription db type

};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLesssonChallenges,
    userSubscription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    return(
        <>
         <Header
         hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
         />

         
        </>
    )

}
