'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { cn } from "@/lib/utils"

const BackButton = ({ className }: { className?: string }) => {
    const segment = useSelectedLayoutSegment()
    const router = useRouter()

    // The route tree stays consistent when SSR uses the homepage's internal /index path.
    if (segment === null) return null

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
