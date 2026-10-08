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
        <div className="portfolio-back-button portfolio-container">
            <button
                type="button"
                onClick={handleBack}
                className={cn("portfolio-back-control", className)}
            >
                <ArrowLeft size={16} aria-hidden="true" />
                Back
            </button>
        </div>
    )
}

export default BackButton
