import React from "react"
import { motion } from "framer-motion"
import { CircleDollarSign } from 'lucide-react'

type ProductCardV2Props = {
  title: string
  subtitle?: string
  features: string[]
  price?: string
  onRequestAccess?: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ProductCardV2({
  title,
  subtitle = "Build with us now!",
  features,
  price,
  onRequestAccess,
}: ProductCardV2Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="relative"
    >
      {/* Gradient border */}
      <div className="rounded-3xl p-[1.5px] bg-gradient-to-br from-blue-500 to-blue-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        {/* Card */}
        <div className="rounded-3xl bg-white px-8 py-10 sm:px-10 sm:py-12">
          <motion.h3
            variants={fadeUp}
            className="text-[28px] sm:text-[36px] leading-tight font-extrabold text-blue-600 text-center"
          >
            {title}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-center text-gray-600 font-medium"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <p className="text-sm font-semibold text-gray-800">Key Features</p>
            <ul className="mt-3 space-y-2 text-gray-700">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-2"
                >
                  <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-gray-700" />
                  <span className="text-[15px]">{f}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-3">
            {price && (
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <CircleDollarSign className="h-4 w-4 text-gray-400" />
                <span>{price}</span>
              </div>
            )}
            <button
              onClick={onRequestAccess}
              className="rounded-xl bg-blue-600 text-white font-semibold px-6 py-3 shadow-sm hover:bg-blue-700 active:bg-blue-700 transition-colors"
            >
              Request Access
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
