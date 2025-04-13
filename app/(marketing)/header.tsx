import Image from 'next/image';
import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton, 
    UserButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
    return (
        <header className="h-10 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3"> 
                    <Image className='cursor-pointer ' src="/logo2.svg" height={50} width={50} alt="logo" />
                    <h1 className="cursor-pointer text-2xl font-extrabold text-green-600 tracking-wide">
                        FlamLingo
                    </h1>
                </div>
                <ClerkLoading>
                    <Loader className='h-5 w-5 text-muted-foreground animate-spin'/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton 
                       
                        />   
                    </SignedIn>   
                    <SignedOut>
                        <SignInButton
                            mode="modal"
                            forceRedirectUrl="/learn"
                            signUpForceRedirectUrl="/learn"
                        >
                             <Button size="lg" variant="ghost">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>

                </ClerkLoaded>
            </div>
        </header>
    );
};