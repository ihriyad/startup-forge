// components/home/Banner.jsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Select, ListBox, Separator } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiChevronDown,
  FiArrowRight as FiCTA,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";

const INDUSTRIES = [
  { id: "all", label: "All Industries" },
  { id: "technology", label: "Technology" },
  { id: "health-care", label: "Health Care" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "operations", label: "Operations" },
  { id: "e-commerce", label: "E-Commerce" },
  { id: "other", label: "Other" },
];

export const Banner = ({ startups, currentUser }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [industryLabel, setIndustryLabel] = useState("All Industries");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (industry !== "all") params.set("industry", industry);
    router.push(`/opportunities?${params.toString()}`);
  };

  const featured = startups.slice(0, 8);

  return (
    <section className="relative w-full pt-8 md:pt-12 overflow-hidden">
      {/* ── Header ── */}
      <div className="max-w-[1100px] mx-auto px-6 mb-8 text-left">
        <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <FiZap size={12} />
          {startups.length} startups actively building
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-3 leading-tight">
          Join a <span className="text-violet-600">startup</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground-400 font-normal max-w-lg">
          Discover{" "}
          {startups.reduce((sum, s) => sum + (s.opportunityCount ?? 0), 0)} open
          positions across top startups.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 mt-6 flex-wrap">
          <Link
            href="/opportunities"
            className="flex items-center gap-2 bg-violet-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
          >
            Browse Opportunities
            <FiCTA size={14} />
          </Link>
          <Link
            href="/startups"
            className="flex items-center gap-2 border border-default-200 text-foreground text-sm font-medium px-6 py-3 rounded-lg hover:bg-default-50 transition-colors"
          >
            Explore Startups
          </Link>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="max-w-[1000px] mx-auto px-6 relative z-20 mb-[-40px] md:mb-[-80px]">
        <form
          onSubmit={handleSearch}
          className="bg-background border border-default-200 shadow-lg rounded-xl px-3 py-3 flex flex-col md:flex-row items-center gap-2"
        >
          {/* Keyword */}
          <div className="w-full md:flex-[1.5] flex items-center gap-2 px-3">
            <FiSearch size={16} className="text-foreground-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Role title or skill..."
              className="w-full outline-none bg-transparent text-sm py-2"
            />
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-8 bg-default-200 mx-1"
          />

          {/* Industry Select */}
          <div className="w-full md:w-48">
            <Select
              selectedKey={industry}
              onSelectionChange={(key) => {
                setIndustry(key);
                const found = INDUSTRIES.find((i) => i.id === key);
                if (found) setIndustryLabel(found.label);
              }}
              variant="flat"
              classNames={{
                trigger: "bg-transparent shadow-none border-none h-10 px-3",
                value: "text-sm text-foreground",
              }}
            >
              <Select.Trigger>
                <Select.Value>{industryLabel}</Select.Value>
                <Select.Indicator>
                  <FiChevronDown size={14} className="text-foreground-400" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {INDUSTRIES.map(({ id, label }) => (
                    <ListBox.Item key={id} id={id} textValue={label}>
                      {label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <Button
            type="submit"
            size="md"
            className="w-full md:w-auto px-8 font-semibold text-white rounded-lg bg-violet-600 hover:bg-violet-700"
          >
            Search
          </Button>
        </form>
      </div>

      {/* ── Swiper Carousel ── */}
      <div className="relative w-full z-10 pt-16">
        <button
          ref={prevRef}
          className="absolute left-4 top-[58%] -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-default-100 text-foreground border border-default-200 shadow-md flex items-center justify-center hover:bg-default-100 transition-all cursor-pointer focus:outline-none"
          aria-label="Previous"
        >
          <FiArrowLeft size={16} />
        </button>
        <button
          ref={nextRef}
          className="absolute right-4 top-[58%] -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-default-100 text-foreground border border-default-200 shadow-md flex items-center justify-center hover:bg-default-100 transition-all cursor-pointer focus:outline-none"
          aria-label="Next"
        >
          <FiArrowRight size={16} />
        </button>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={featured.length > 2}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full h-[320px] md:h-[400px]"
        >
          {featured.map((startup) => (
            <SwiperSlide
              key={startup._id}
              className="relative group overflow-hidden border-r border-background/20"
            >
              <Link
                href={`/startups/${startup._id}`}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full">
                  {startup.logo ? (
                    <Image
                      src={startup.logo}
                      alt={startup.startup_name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-500 to-violet-900" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Bottom info */}
                  <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white text-black font-bold flex items-center justify-center text-sm shadow-md uppercase tracking-wider">
                      {startup.startup_name?.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                        {startup.startup_name}
                      </h3>
                      <p className="text-white/60 text-xs capitalize mt-0.5">
                        {startup.industry}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <span className="bg-violet-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                      {startup.opportunityCount ?? 0} role
                      {startup.opportunityCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
