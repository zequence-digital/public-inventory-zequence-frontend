"use client";

import {
  Variants,
  motion,
  useAnimationControls,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

import { ArrowUpIcon } from "@radix-ui/react-icons";

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};
const isBrowser = () => typeof window !== "undefined";

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function ScrollToTopButton() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();
  const [isMounted, setIsMounted] = useState(false);

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
    <motion.button
      className="fixed bottom-4 right-0 p-3 rounded-full bg-[#FF6600] text-white  z-50 group"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className=" transition duration-500 group-hover:-translate-y-1" />
    </motion.button>
  );
}
