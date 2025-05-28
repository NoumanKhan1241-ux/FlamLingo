// components/modals/test-modal.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const TestModal = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Show modal only on first visit to /learn after coming from /courses
  useEffect(() => {
    if (searchParams.get("from") === "courses" && !window.sessionStorage.getItem("testModalShown")) {
      setOpen(true);
      window.sessionStorage.setItem("testModalShown", "true");
    }
  }, [searchParams]);

  const handleStart = () => {
    setOpen(false);
    router.push("/lesson");
  };

  const handleQuiz = () => {
    setOpen(false);
    router.push("/test");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md text-center">
        <div className="flex flex-col items-center gap-4">
          <Image src="/mascot_smile.png" alt="Mascot" width={80} height={80} />
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Would you like to take a quiz to unlock levels based on your knowledge, or start from level 1?
          </p>
        </div>
        <DialogFooter className="flex flex-col gap-2 mt-4">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
            onClick={handleQuiz}
          >
            Take Quiz
          </Button>
          <Button
            variant="dangerOutline"
            className="w-full text-blue-600 border-blue-300"
            size="lg"
            onClick={handleStart}
          >
            Start from Level 1
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};