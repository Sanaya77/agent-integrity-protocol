"use client";

import { motion } from "framer-motion";

const data = [35, 60, 45, 80, 70, 110, 95, 120, 90, 130];

export default function ActivityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#11192B] rounded-3xl p-8 border border-cyan-500/10"
    >
      <div className="flex justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Protocol Activity
          </h2>

          <p className="text-gray-400 mt-2">
            AI Executions (24 Hours)
          </p>

        </div>

        <div className="text-right">

          <h1 className="text-4xl font-bold text-cyan-400">
            12.8K
          </h1>

          <p className="text-green-400">
            +18%
          </p>

        </div>

      </div>

      <div className="h-72 flex items-end gap-3">

        {data.map((value, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: value * 2 }}
            transition={{
              delay: index * 0.05,
              duration: 0.5,
            }}
            className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-cyan-300 hover:scale-105 transition"
          />
        ))}

      </div>

    </motion.div>
  );
}