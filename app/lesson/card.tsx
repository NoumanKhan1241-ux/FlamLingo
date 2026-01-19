import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";
import { useCallback, useRef } from "react";
import Image from "next/image";
import { useKey } from "react-use";

type Props = {
    id: number;
    text: string;
    imageSrc: string;
    shortcut: string;
    selected?: boolean;
    onClick: () => void;
    status?: "correct" | "incorrect" | "none";
    audioSrc?: string | null;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
}


export const Card = ({
    id,
    text,
    imageSrc,
    shortcut,
    selected,
    onClick,
    status,
    audioSrc,
    disabled,
    type,
}: Props) => {

    const hasAudio = audioSrc && typeof audioSrc === 'string' && audioSrc.trim() !== "";
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioErrorRef = useRef<boolean>(false);
    
    // Debug: Log audioSrc when component renders
    if (hasAudio) {
        console.log("Card rendered with audioSrc:", audioSrc, "for text:", text);
    }

    const handleClick = useCallback(async () => {
        if(disabled) return;

        // Always call onClick first to ensure selection works even if audio fails
        onClick();

        // Try to play audio on user click
        if(hasAudio && audioRef.current && audioSrc) {
            const audio = audioRef.current;
            
            // Debug logging (remove in production if needed)
            console.log("Attempting to play audio:", audioSrc);
            console.log("Audio readyState:", audio.readyState);
            console.log("Audio error:", audio.error);
            
            try {
                // Reset to beginning
                audio.currentTime = 0;
                
                // Load audio if needed
                if (audio.readyState === 0 || audio.readyState === 1) {
                    audio.load();
                }
                
                // Function to actually play the audio
                const playAudio = async () => {
                    if (!audioRef.current) return;
                    
                    try {
                        audioRef.current.currentTime = 0;
                        await audioRef.current.play();
                        console.log("Audio playing successfully:", audioSrc);
                    } catch (playError) {
                        console.error("Play error:", playError);
                    }
                };
                
                // If audio is ready, play immediately
                if (audio.readyState >= 2) {
                    await playAudio();
                } else {
                    // Wait for audio to be ready
                    const handleCanPlay = () => {
                        playAudio();
                    };
                    
                    audio.addEventListener('canplay', handleCanPlay, { once: true });
                    audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
                    
                    // Also try after a short delay as fallback
                    setTimeout(() => {
                        if (audioRef.current && audioRef.current.readyState >= 2) {
                            playAudio();
                        }
                    }, 100);
                }
            } catch (error) {
                console.error("Audio error:", error);
            }
        }
    },[disabled, onClick, hasAudio, audioSrc]);

         useKey(shortcut, handleClick, {}, [handleClick]);


    return(

        <div
        onClick={handleClick}
        className={cn(
          "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2 ",
          selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
          selected  && status === "correct"
           && "border-green-300 bg-green-100 hover:bg-green-100" ,
          selected && status === "incorrect" 
          && "border-rose-300 bg-rose-100 hover:bg-rose-100",
          disabled && "pointer-events-none hover:bg-white" ,
          type === "ASSIST" && "lg:p-3 w-full"

        )}
        >
            {hasAudio && audioSrc && (
                <audio 
                    ref={audioRef} 
                    src={audioSrc} 
                    preload="metadata"
                    onError={(e) => {
                        // Mark that this audio has an error
                        audioErrorRef.current = true;
                        const audioElement = e.currentTarget;
                        console.warn("Audio error for:", audioSrc, "Error:", audioElement.error?.message);
                    }}
                    onLoadedMetadata={() => {
                        // Audio loaded successfully, reset error flag
                        audioErrorRef.current = false;
                        console.log("Audio metadata loaded:", audioSrc);
                    }}
                    onCanPlay={() => {
                        console.log("Audio can play:", audioSrc);
                    }}
                />
            )}
            {imageSrc && (
                <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full ">
                    <Image
                    src={imageSrc}
                    fill
                    alt={text}
                    />
                </div>
            )}
            <div className={cn(
                "flex items-center justify-between",
                type === "ASSIST" && "flex-row-reverse",
            )}>
               {type === "ASSIST" && <div />}
               <p className={cn(
                "text-neutral-600 text-sm lg:text-base",
                selected && "text-sky-500",
                selected && status === "correct"  
                && "text-green-500 ",
                selected && status === "incorrect" 
                && "text-rose-500",
               )}>
                {text}
               </p>
               <div className={cn(
                "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs  font-semibold",
                selected && "border-sky-300 text-sky-500",
                selected && status === "correct"  
                && " border-green-300 text-green-500",
                selected && status === "incorrect" 
                && "border-rose-500 text-rose-500",
               )}>
                {shortcut}
               </div>
            </div>
        </div>
    );
};
