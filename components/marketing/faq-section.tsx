"use client";

import Image from "next/image";
import Wrapper from "@/components/wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Hackerspace?",
    answer: "A space for events, ideas, and the people building what is next.",
  },
  {
    question: "How do I find an event?",
    answer:
      "Explore events by type, location, or the skills you want to build.",
  },
  {
    question: "Do I need experience to join?",
    answer:
      "No. There is a place for every level, from curious beginners to experienced builders.",
  },
  {
    question: "Is it free to join?",
    answer: "Yes. Discovering events and joining the community is free.",
  },
  {
    question: "Can I join a team?",
    answer: "Yes. Meet people through events and find builders to create with.",
  },
  {
    question: "How do I get involved?",
    answer: "Choose an event, show up, and start connecting.",
  },
  {
    question: "Can I host an event?",
    answer:
      "Yes. Bring your idea to the community and create a space to share it.",
  },
  {
    question: "Where can I learn more?",
    answer:
      "Follow the community and explore upcoming events to stay connected.",
  },
  {
    question: "Can I share my project?",
    answer:
      "Yes. Share what you are building and invite others to learn from it.",
  },
];

export function FaqSection() {
  return (
    <div className="relative min-h-screen flex w-full flex-col overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/pattern2.png')] bg-center bg-cover bg-no-repeat opacity-10"
      />
      <Wrapper id="faq" className="relative z-10 w-full py-20 lg:py-28">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-20">
          <div className="order-2 w-full lg:order-1 lg:w-[60%]">
            <Accordion>
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className="border-b border-primary-foreground/20 last:border-0"
                >
                  <AccordionTrigger className="text-lg font-normal py-3 text-left text-primary-foreground hover:text-primary-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-primary-foreground/75 leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="order-1 flex w-full flex-col lg:order-2 lg:w-[40%]">
            <div className="flex flex-col space-y-4 mb-10 items-start text-left">
              <h2 className="text-4xl font-medium tracking-tight text-primary-foreground sm:text-6xl max-w-2xl leading-[1.1]">
                Questions, answered.
              </h2>
              <p className="text-lg text-primary-foreground/75 leading-relaxed max-w-2xl">
                A few quick answers about finding your place in the community.
              </p>
            </div>
            <div className="mx-auto">
              <Image
                src="/faq.png"
                alt="FAQ Illustration"
                width={1204}
                height={1060}
                className="mx-auto h-auto w-full max-w-64 object-contain object-center sm:max-w-84"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
