"use client";
import { motion } from "framer-motion";

const PageVariant = {
  start: {
    opacity: 0,
    x: -100,
  },
  end: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};
interface PageProps {
  children: React.ReactNode;
}
const Template: React.FC<PageProps> = ({ children }) => {
  return (
    <motion.div
      initial="start"
      animate="end"
      variants={PageVariant}
      exit={{
        opacity: 0,
        x: 100,
        transition: {
          duration: 0.5,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
