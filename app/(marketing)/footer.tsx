import Image from 'next/image';
import { Button } from "@/components/ui/button";

export const Footer=()=>{
    return(
<footer className="hidden lg:block h-20 w-full b-200 p-2 border-t-2 border-slate">
    <div className="max-w-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className='w-full'>
           <Image src={'/pashtoflag.png'} 
           alt={'Pashto'} 
           height={42} 
           width={50}
           className='mr-4 rounded-md'/> 
           Pashto
        </Button>
        
    
       
         
        
    </div>
</footer>

    );
};