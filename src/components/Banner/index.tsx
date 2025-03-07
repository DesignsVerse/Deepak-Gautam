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
    // { url: "/images/Banner/poster-3.jpg", alt: "Banner 3" },
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
              layout="fill"
              objectFit="contain"
              className="w-full h-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
