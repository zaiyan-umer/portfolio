'use client'

import { ArrowLeft } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const BackButton = ({ className }: { className?: string }) => {
    const pathname = usePathname()
    const router = useRouter()

    if (pathname === "/") return null

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push("/")
        }
    }

    return (
        <div className="portfolio-back-button absolute left-0 right-0 z-30 pointer-events-none flex justify-center">
            <div className="layout-standard flex justify-start">
                <button
                    type="button"
                    onClick={handleBack}
                    className={cn(
                        "pointer-events-auto inline-flex items-center gap-1.5 cursor-pointer rounded-full border border-black/10 dark:border-gray-200/20 bg-background/80 backdrop-blur-sm px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 shadow-sm transition-colors hover:text-gray-900 dark:hover:text-white",
                        className
                    )}
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
            </div>
        </div>
    )
}

export default BackButton
