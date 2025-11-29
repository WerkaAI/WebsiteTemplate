"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function ProgressBar() {
    const [scrollProgress, setScrollProgress] = React.useState(0)

    React.useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight
            const scroll = `${totalScroll / windowHeight}`

            setScrollProgress(Number(scroll) * 100)
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="fixed left-0 top-0 z-50 w-full">
            <Progress value={scrollProgress} className="h-1 w-full rounded-none bg-transparent" />
        </div>
    )
}
