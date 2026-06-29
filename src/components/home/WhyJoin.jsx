"use client";

import React from "react";
import { Card, Button } from "@heroui/react";
import {
  LuRocket,
  LuUsers,
  LuZap,
  LuShieldCheck,
  LuArrowRight,
} from "react-icons/lu";
import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";

const PROPOSITIONS = [
  {
    icon: <LuRocket className="text-2xl text-violet-600" />,
    title: "Vetted Premium Startups",
    description:
      "Skip the noise. Connect directly with verified founders who have active runways, clear product definitions, and serious momentum.",
  },
  {
    icon: <LuUsers className="text-2xl text-violet-600" />,
    title: "True Equal Collaboration",
    description:
      "Move past generic corporate contracts. Engage as a strategic founding layer collaborator with equitable outcomes and real impact.",
  },
  {
    icon: <LuZap className="text-2xl text-violet-600" />,
    title: "Hyper-Fast Onboarding",
    description:
      "No multi-stage interview lag. Our interactive application architecture matches your verified skill stacks to active roles in days, not months.",
  },
  {
    icon: <LuShieldCheck className="text-2xl text-violet-600" />,
    title: "Secure Milestone Tracking",
    description:
      "Build safely with milestone-driven verification frameworks. Your output, timelines, and rewards are transparently mapped.",
  },
];

export const WhyJoin = () => {
  return (
    <section className="w-full bg-background text-foreground py-24 px-6 border-t border-divider transition-colors duration-300">
      <div className="max-w-[1120px] mx-auto flex flex-col gap-16">
        {/* Section Heading Row */}
          <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="flex flex-col gap-4 text-left">
            <div className="inline-flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-widest bg-violet-600/10 dark:bg-violet-600/20 px-3 py-1.5 rounded-full w-fit">
              The StartupForge Edge
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Why builders choose our{" "}
              <span className="text-violet-600">Ecosystem.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-default-500 max-w-md leading-relaxed">
            Traditional job boards are broken for rapid execution. We built a
            streamlined pipeline engineered specifically for high-growth
            technical talent and agile founders.
          </p>
        </div>
          </ScrollReveal>

        {/* 2x2 Feature Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROPOSITIONS.map((prop, index) => (
             <ScrollReveal key={index} delay={index * 80}>
           
            <Card
              key={index}
              className="bg-content1 dark:bg-content1 border border-divider hover:border-violet-500/40 shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-8 group rounded-2xl"
            >
              <Card.Content className="flex gap-5 p-0 items-start">
                {/* Icon Container with glowing context on hover */}
                <div className="p-3 bg-violet-600/5 dark:bg-violet-600/10 rounded-xl  transition-all duration-300 shrink-0">
                  <div className="group-hover:scale-110 transition-transform duration-300 text-violet-600 group-hover:text-white">
                    {prop.icon}
                  </div>
                </div>

                {/* Text Content Block */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {prop.title}
                  </h3>
                  <p className="text-sm md:text-base text-default-500 leading-relaxed font-normal">
                    {prop.description}
                  </p>
                </div>
              </Card.Content>
            </Card>
          </ScrollReveal>
          ))}
        </div>

        {/* Bottom Context Call to Action Block */}
          <ScrollReveal>
          
        <div className="bg-gradient-to-r from-violet-600/10 via-transparent to-transparent border border-divider rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
          <div className="flex flex-col gap-1 max-w-2xl text-left">
            <h4 className="text-lg font-bold text-foreground">
              Ready to find your next breakthrough project?
            </h4>
            <p className="text-xs md:text-sm text-default-400">
              Join thousands of front-end developers, backend architects, and
              creators shipping applications globally right now.
            </p>
          </div>
          <Link href={"/opportunities"}>
          <Button
            color="primary"
            endContent={
              <LuArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
            }
            className="bg-violet-600 text-white font-bold text-sm px-6 py-5 rounded-xl shadow-lg shadow-violet-600/20 hover:bg-violet-700 group cursor-pointer w-full md:w-auto"
          >
            Explore Opportunities
          </Button></Link>
        </div>
          </ScrollReveal>
      </div>
    </section>
  );
};
