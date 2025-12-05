"use client";

import {
    ClerkLoading,
    ClerkLoaded,
    UserButton,
} from "@clerk/nextjs"
import { Loader } from 'lucide-react';

export const UserButtonWrapper = () => {
    return (
        <>
            <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
            </ClerkLoading>
            <ClerkLoaded>
                <UserButton afterSwitchSessionUrl="/"/>
            </ClerkLoaded>
        </>
    );
};

export default UserButtonWrapper;