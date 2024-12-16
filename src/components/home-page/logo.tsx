"use client";

import { Variants, useAnimationControls, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};
const isBrowser = () => typeof window !== "undefined";

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

type Props = {
  className?: string;
  src?: string;
  alt?: string;
};

export function Logo({ className, alt, src }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => {
    setIsMounted(true);
    return scrollYProgress.on("change", (latestValue) => {
      if (latestValue > 0.6) {
        controls.start("show");
      } else {
        controls.start("hide");
      }
    });
  }, [controls, scrollYProgress]);

  if (!isMounted) return null;

  return (
    <div
      onClick={() => {
        scrollToTop();
        router.push("/");
      }}
      className={cn(`cursor-pointer`, className)}
    >
      <picture>
        <img
          width={80}
          src={src ? src : "/images/logo.svg"}
          alt={alt ? alt : "Zequence Logo"}
          className={cn(" object-cover")}
        />
      </picture>
    </div>
  );
}
