"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button, Input, Select, ListBox, Separator } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FiSearch,
  FiMapPin,
  FiArrowLeft,
  FiArrowRight,
  FiChevronDown,
} from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

const SLIDE_DATA = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    company: "reMarkable",
    jobsCount: "12 jobs",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    company: "ArchStudio",
    jobsCount: "5 jobs",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1200",
    company: "ForgeLab",
    jobsCount: "0 jobs",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
    company: "IndieHub",
    jobsCount: "8 jobs",
  },
];

export const Banner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Manage select value locally using the standard anatomy flow
  const [region, setRegion] = useState("EU");

  return (
    <section className="relative w-full  pt-8 md:pt-12 overflow-hidden">
      {/* 1. Header Typography */}
      <div className="max-w-[1100px] mx-auto px-6 mb-8 text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-3">
          Join a startup
        </h1>
        <p className="text-xl md:text-3xl text-gray-500 font-medium">
          Discover 1,047 open positions
        </p>
      </div>

      {/* 2. Floating Search Dashboard Container */}
      <div className=" max-w-[1000px] bg-background mx-auto px-6 relative z-20  mb-[-40px] md:mb-[-115px] p-4">
        <div className=" px-2 flex flex-col md:flex-row items-center gap-2">
          {/* Keyword Search */}
          <div className="w-full md:flex-[1.5] flex items-center">
            <input
            
              placeholder="Job title or keyword"
              className="w-full outline-none  p-2 md:p-6"
            />
          </div>

          {/* Desktop Separator Line */}
          <div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-8 bg-gray-600 mx-2"
            />
          </div>

          {/* Location Search */}
          <div className="w-full md:flex-1 flex items-center">
            <input
           
              placeholder="City, area or select remote"
             
             
              className="w-full p-2 md:p-6 outline-none"
            />
          </div>

          {/* Corrected Compound Select Implementation */}
          <div className="w-full md:w-32">
            <Select>
              <Select.Trigger className="flex items-center justify-between px-3 h-10 cursor-pointer text-sm font-medium">
                <Select.Value>{region}</Select.Value>
                <Select.Indicator>
                  <FiChevronDown className="text-default-400" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="min-w-[120px] p-1">
                <ListBox>
                  <ListBox.Item
                    onClick={() => setRegion("EU")}
                    className="px-3 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                  >
                    EU
                  </ListBox.Item>
                  <ListBox.Item
                    onClick={() => setRegion("US")}
                    className="px-3 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                  >
                    US
                  </ListBox.Item>
                  <ListBox.Item
                    onClick={() => setRegion("Global")}
                    className="px-3 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                  >
                    Global
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Search Submission CTA Button */}
          <Button
            
            
            size="lg"
            className="w-full md:w-auto px-8 font-semibold text-white rounded-none bg-violet-600"
          >
            Search
          </Button>
        </div>
      </div>

      {/* 3. Swiper Carousel Layer */}
      <div className="relative w-full z-10 pt-16">
        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-6 top-[55%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black border border-default-200 shadow-md flex items-center justify-center hover:bg-default-100 transition-all cursor-pointer focus:outline-none"
          aria-label="Previous slide"
        >
          <FiArrowLeft size={18} />
        </button>
        <button
          ref={nextRef}
          className="absolute right-6 top-[55%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black border border-default-200 shadow-md flex items-center justify-center hover:bg-default-100 transition-all cursor-pointer focus:outline-none"
          aria-label="Next slide"
        >
          <FiArrowRight size={18} />
        </button>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
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
          {SLIDE_DATA.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="relative group overflow-hidden border-r border-background/20"
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.company}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-white text-black font-bold flex items-center justify-center text-sm shadow-md uppercase tracking-wider">
                    {slide.company.slice(0, 2)}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    {slide.company}
                  </h3>
                </div>

                <div className="absolute bottom-6 right-6">
                  <span className="bg-[#eef2ff] text-[#3b3ce2] text-sm font-semibold px-4 py-2 rounded-md shadow-sm">
                    {slide.jobsCount}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
