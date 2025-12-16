"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionLabel } from "@/components/ui/section-label"

interface BotanicalFAQProps {
  eyebrow?: string
  title?: string
  questions: {
    question: string
    answer: string
  }[]
}

export function BotanicalFAQ({ eyebrow, title, questions }: BotanicalFAQProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-full">
        <div className="text-center mb-12">
          <SectionLabel variant="bubble" className="mb-4">{eyebrow}</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mt-4">
            {title || "Questions You May Have About This Botanical Origin"}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00CC99] text-white flex items-center justify-center shrink-0 text-sm font-semibold mt-1">
                    {index + 1}
                  </span>
                  <span className="text-[#003366] font-semibold">{question.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-9">{question.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
