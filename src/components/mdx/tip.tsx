import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react"

interface TipProps {
    type?: "info" | "warning" | "success" | "tip"
    title?: string
    children: React.ReactNode
}

export function Tip({ type = "info", title, children }: TipProps) {
    const icons = {
        info: Info,
        warning: AlertTriangle,
        success: CheckCircle,
        tip: Lightbulb,
    }

    const styles = {
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-200",
        warning: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200",
        success: "border-green-200 bg-green-50 text-green-900 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-200",
        tip: "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-900/50 dark:bg-purple-950/20 dark:text-purple-200",
    }

    const Icon = icons[type]

    return (
        <Alert className={`my-6 ${styles[type]}`}>
            <Icon className="h-4 w-4" />
            {title && <AlertTitle className="mb-2 font-semibold">{title}</AlertTitle>}
            <AlertDescription className="text-sm leading-relaxed">
                {children}
            </AlertDescription>
        </Alert>
    )
}
