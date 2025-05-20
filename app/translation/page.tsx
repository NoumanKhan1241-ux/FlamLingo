import { redirect } from "next/navigation";
import { getUserProgress } from "@/db/queries";
import { TranslationClient } from "./translation-client";

const TranslationPage = async () => {
    const userProgress = await getUserProgress();

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return <TranslationClient />;
};

export default TranslationPage; 