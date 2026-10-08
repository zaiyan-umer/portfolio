'use client'

import { motion, useReducedMotion } from 'motion/react'

export default function Template({ children }: { children: React.ReactNode }) {
    const reducedMotion = useReducedMotion();
    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
            className="portfolio-route-enter"
        >
            {children}
        </motion.div>
    )
}
