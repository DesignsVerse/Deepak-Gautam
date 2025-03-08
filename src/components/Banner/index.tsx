"use client";

import Image from "next/image";
import Slider from "react-slick";
import { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner: React.FC = () => {
  const images = [
    { url: "/images/Banner/banner-1.png", alt: "Banner 1" },
    { url: "/images/Banner/banner-2.png", alt: "Banner 2" },
    { url: "/images/Banner/banner-3.png", alt: "Banner 3" },
    { url: "/images/Banner/banner-4.png", alt: "Banner 4" },
  ];

  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
  };

  return (
    <div className="relative mt-[8px] w-full aspect-[20/7] overflow-hidden z-10">
      <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full aspect-[20/7]">
            <Image
              src={image.url}
              alt={image.alt}
              width={2000} // Example width (adjust based on your design)
              height={700} // Example height (20:7 ratio = 2000:700)
              className="w-full h-full object-contain" // Replace objectFit with Tailwind
              sizes="100vw" // Adjust based on your needs
              priority={index === 0} // Prioritize the first image for LCP
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;