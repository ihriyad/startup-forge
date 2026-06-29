"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, Button, Avatar, Separator } from "@heroui/react";
import {
  LuQuote,
  LuChevronLeft,
  LuChevronRight,
  LuArrowUpRight,
} from "react-icons/lu";
import { ScrollReveal } from "../ui/ScrollReveal";

const SUCCESS_STORIES = [
  {
    id: 1,
    name: "Chloe Dubois",
    role: "Founder of SkillForge",
    avatar:
      "https://i.ibb.co.com/PJB34tN/premium-photo-1733317384289-ad17022d64bb.avif",
    storyTitle: "Raised $500k Seed within 3 weeks of posting",
    quote:
      "StartupForge completely revolutionized how we sourced our founding engineering layer. We didn't just find employees; we discovered long-term collaborators who aligned perfectly with our vision.",
    metrics: "5 Positions Filled",
  },
  {
    id: 2,
    name: "James Carter",
    role: "Founder of NexaCore",
    avatar: "https://i.ibb.co.com/HfyxvrQ5/photo-1549692520-acc6669e2f0c.avif",
    storyTitle: "Scaled Dev-Ops infrastructure 2x faster",
    quote:
      "Finding high-quality backend talent with specific niche infrastructure skills used to take months. Through this platform, we vetted and onboarded our lead engineer inside of 6 days.",
    metrics: "Onboarded in 6 Days",
  },
  {
    id: 3,
    name: "Mia Johansson",
    role: "Founder of ClearLedger",
    avatar:
      "https://i.ibb.co.com/Tx0gKv38/photo-1702047149248-a6049168d2a8.avif",
    storyTitle: "Closed product engineering loop seamlessly",
    quote:
      "The interface makes sorting through collaborator skill sets incredibly effortless. It removes all friction between startup founders looking to move fast and talent wanting immediate impact.",
    metrics: "100% Retainer Rate",
  },
];

export const SuccessStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const prevStory = () => {
    setActiveIndex(
      (prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length,
    );
  };

  const active = SUCCESS_STORIES[activeIndex];

  return (
    <section className="w-full bg-background text-foreground py-20 px-6 border-t border-divider transition-colors duration-300">
      <div className="max-w-280 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Context Header / Title Column */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-left">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-widest bg-violet-600/10 dark:bg-violet-600/20 px-3 py-1.5 mb-4 rounded-md w-fit">
              Wall of Fame
            </div>
            <h2 className="text-4xl md:text-5xl  tracking-tight leading-tight">
              Stories from the <span className="text-violet-600">Forge.</span>
            </h2>
            <p className="text-sm md:text-base text-default-500 max-w-sm leading-relaxed">
              See how forward-thinking builders connect with high-impact
              collaborators to build incredible products globally.
            </p>

            {/* Manual Control Navigation Hooks for Carousel Actions */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                size="sm"
                variant="secondary"
                radius="full"
                onClick={prevStory}
                className="text-violet-600"
              >
                <LuChevronLeft size={22} />
                Previous
              </Button>
              <Button
                size="sm"
                variant="secondary"
                radius="full"
                onClick={prevStory}
                className="text-violet-600 "
              >
                Next
                <LuChevronRight size={22} />
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Animated Card Wrapper Component Frame */}
        <div className="lg:col-span-8 w-full">
          <ScrollReveal>
            <Card className="bg-content1 dark:bg-content1 border border-divider shadow-xl rounded-2xl overflow-hidden p-6 md:p-10 relative">
              {/* Absolute Watermark Structural Floating Icon */}
              <div className="absolute top-6 right-8 text-violet-600/10 dark:text-violet-600/5 pointer-events-none">
                <LuQuote size={140} />
              </div>

              <Card.Content className="flex flex-col gap-6 relative z-10 p-0">
                {/* Badge Metric Callout Overlay info */}
                <div className="bg-violet-600 text-white text-xs  uppercase tracking-wider px-3 py-1.5 rounded-md w-fit shadow-md shadow-violet-600/20">
                  {active.metrics}
                </div>

                {/* Main Testimonial Pitch Header */}
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-snug max-w-2xl">
                  {active.storyTitle}
                </h3>

                {/* Comprehensive Descriptive Review Statement block */}
                <p className="text-sm md:text-lg text-default-600 leading-relaxed font-normal  max-w-3xl">
                  {active.quote}
                </p>

                <Separator className="bg-divider my-2" />

                {/* Author Meta Details Identity Section */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3.5">
                    <div className="relative border-2 border-violet-600 p-0.5 rounded-full">
                      <Avatar size="sm">
                        <Avatar.Image alt="User Avatar" src={active.avatar} />
                        <Avatar.Fallback>
                          {active.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      {/* Live glowing pulse presence indicator matching layout badge criteria */}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-base font-bold text-foreground leading-tight">
                        {active.name}
                      </h4>
                      <p className="text-xs font-semibold text-violet-600 mt-0.5">
                        {active.role}
                      </p>
                    </div>
                  </div>

                  {/* Micro Action Button Linking Context */}
                  <Button
                    variant="light"
                    color="primary"
                    size="sm"
                    endContent={<LuArrowUpRight className="text-sm" />}
                    className="font-bold text-xs text-violet-600 hover:bg-violet-600/10 cursor-pointer"
                  >
                    Read full case study
                  </Button>
                </div>
              </Card.Content>
            </Card>

            {/* Horizontal Stepper Progress Track Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-6 px-2">
              {SUCCESS_STORIES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeIndex
                      ? "w-8 bg-violet-600"
                      : "w-2 bg-default-200 hover:bg-default-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
