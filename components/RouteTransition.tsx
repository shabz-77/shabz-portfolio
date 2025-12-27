"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type RouterLike = {
  push: (href: string) => void;
};

type TCtx = {
  go: (router: RouterLike, href: string) => void;
};

const TransitionCtx = createContext<TCtx | null>(null);

export function useTransitionWipe() {
  const ctx = useContext(TransitionCtx);
  if (!ctx) throw new Error("useTransitionWipe must be used inside RouteTransition");
  return ctx;
}

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [phase, setPhase] = useState<
    "idle" | "covering" | "holding" | "uncovering"
  >("idle");

  // timings (ms)
  const COVER_MS = 520;
  const UNCOVER_MS = 420;

  // promise resolver that fires when pathname changes
  const waitRouteResolveRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (waitRouteResolveRef.current) {
      const resolve = waitRouteResolveRef.current;
      waitRouteResolveRef.current = null;
      resolve();
    }
  }, [pathname]);

  function waitForRouteChange() {
    return new Promise<void>((resolve) => {
      waitRouteResolveRef.current = resolve;
    });
  }

  function waitTwoFrames() {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  }

  const value = useMemo(
    () => ({
      go: async (router: RouterLike, href: string) => {
        // 1) Cover
        setPhase("covering");
        await new Promise<void>((r) => setTimeout(r, COVER_MS));

        // 2) Hold full white
        setPhase("holding");

        // 3) Navigate while covered
        router.push(href);

        // 4) Wait for route change and paint
        await waitForRouteChange();
        await waitTwoFrames();

        // 5) Uncover
        setPhase("uncovering");
        await new Promise<void>((r) => setTimeout(r, UNCOVER_MS));

        // 6) Done
        setPhase("idle");
      },
    }),
    []
  );

  return (
    <TransitionCtx.Provider value={value}>
      {/* Overlay */}
      {phase !== "idle" && (
        <div className="pointer-events-none fixed inset-0 z-[9999] flex items-stretch justify-center">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 2 }}
            animate={
              phase === "covering"
                ? {
                    width: "100vw",
                    transition: {
                      duration: COVER_MS / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : phase === "holding"
                ? { width: "100vw" }
                : {
                    width: 2,
                    transition: {
                      duration: UNCOVER_MS / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
            }
          />
        </div>
      )}

      {children}
    </TransitionCtx.Provider>
  );
}
