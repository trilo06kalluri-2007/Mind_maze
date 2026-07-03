"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { StartScreen } from "@/components/screens/StartScreen";
import { GameScreen } from "@/components/screens/GameScreen";
import { LevelComplete } from "@/components/screens/LevelComplete";
import { LevelSelect } from "@/components/screens/LevelSelect";
import { AllComplete } from "@/components/screens/AllComplete";

const pageVariants = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.97 },
};

function ScreenWrapper({
  screen,
  children,
}: {
  screen: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  const screen = useGameStore((s) => s.screen);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 pointer-events-none select-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-500/6 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-violet-500/6 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-cyan-500/4 blur-[120px]" />
      </div>

      {screen === "start" && (
        <ScreenWrapper screen="start">
          <StartScreen />
        </ScreenWrapper>
      )}
      {screen === "game" && (
        <ScreenWrapper screen="game">
          <GameScreen />
        </ScreenWrapper>
      )}
      {screen === "levelSelect" && (
        <ScreenWrapper screen="levelSelect">
          <LevelSelect />
        </ScreenWrapper>
      )}
      {screen === "levelComplete" && (
        <ScreenWrapper screen="levelComplete">
          <div className="relative">
            <GameScreen />
            <LevelComplete />
          </div>
        </ScreenWrapper>
      )}
      {screen === "allComplete" && (
        <ScreenWrapper screen="allComplete">
          <AllComplete />
        </ScreenWrapper>
      )}
    </main>
  );
}
