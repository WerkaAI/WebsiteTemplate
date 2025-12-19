"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MDXTabsProps {
    items: string[]
    children: React.ReactNode
}

export function MDXTabs({ items, children }: MDXTabsProps) {
    const childrenArray = React.Children.toArray(children)

    return (
        <Tabs defaultValue={items[0]} className="w-full my-6">
            <TabsList className="w-full justify-start overflow-x-auto">
                {items.map((item) => (
                    <TabsTrigger key={item} value={item}>
                        {item}
                    </TabsTrigger>
                ))}
            </TabsList>
            {items.map((item, index) => (
                <TabsContent key={item} value={item} className="rounded-md border border-border/50 bg-card p-4">
                    {childrenArray[index]}
                </TabsContent>
            ))}
        </Tabs>
    )
}
