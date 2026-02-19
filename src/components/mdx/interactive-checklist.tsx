"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface InteractiveChecklistProps {
    items: string[] | string
    id: string
}

export function InteractiveChecklist({ items, id }: InteractiveChecklistProps) {
    // Parse items if it's passed as a JSON string (due to MDX sanitization)
    const parsedItems: string[] = React.useMemo(() => {
        if (typeof items === 'string') {
            try {
                return JSON.parse(items)
            } catch (e) {
                console.error("Failed to parse checklist items", e)
                return []
            }
        }
        return items
    }, [items])

    const [checkedState, setCheckedState] = React.useState<boolean[]>(
        new Array(parsedItems.length).fill(false)
    )

    React.useEffect(() => {
        const saved = localStorage.getItem(`checklist-${id}`)
        if (saved) {
            try {
                setCheckedState(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse checklist state", e)
            }
        }
    }, [id])

    const handleCheck = (index: number) => {
        const updated = checkedState.map((item, i) => (i === index ? !item : item))
        setCheckedState(updated)
        localStorage.setItem(`checklist-${id}`, JSON.stringify(updated))
    }

    const progress = Math.round(
        (checkedState.filter(Boolean).length / parsedItems.length) * 100
    ) || 0

    return (
        <div className="my-8 rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Twój postęp</h3>
                <span className="text-sm font-medium text-muted-foreground">
                    {progress}%
                </span>
            </div>
            <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <ul className="space-y-3">
                {parsedItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <Checkbox
                            id={`item-${id}-${index}`}
                            checked={checkedState[index]}
                            onCheckedChange={() => handleCheck(index)}
                            className="mt-1"
                        />
                        <label
                            htmlFor={`item-${id}-${index}`}
                            className={cn(
                                "text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                checkedState[index] && "text-muted-foreground line-through"
                            )}
                        >
                            {item}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
