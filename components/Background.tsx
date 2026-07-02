"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Cyan Glow */}
      <motion.div
        animate={{
          x: [0, 250, 0],
          y: [0, -150, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute
        w-[700px]
        h-[700px]
        rounded-full
        bg-cyan-500/20
        blur-[180px]
        left-[-250px]
        top-[-250px]"
      />

      {/* Purple Glow */}
      <motion.div
        animate={{
          x: [0, -250, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute
        w-[700px]
        h-[700px]
        rounded-full
        bg-purple-600/20
        blur-[180px]
        right-[-250px]
        bottom-[-200px]"
      />

    </div>
  );
}