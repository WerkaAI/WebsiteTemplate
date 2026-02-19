"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
    question: string
    answer: string
}

interface FAQAccordionProps {
    items: FAQItem[] | string
}

export function FAQAccordion({ items }: FAQAccordionProps) {
    // Parse items if it's passed as a JSON string (due to MDX sanitization)
    const parsedItems: FAQItem[] = typeof items === 'string' ? JSON.parse(items) : items

    if (!Array.isArray(parsedItems)) {
        return null;
    }

    return (
        <div className="my-8">
            <h3 className="mb-4 text-xl font-semibold">Często zadawane pytania</h3>
            <Accordion type="single" collapsible className="w-full">
                {parsedItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
