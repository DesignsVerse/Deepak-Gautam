"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner: React.FC = () => {
  const images = [
    { url: "/images/Banner/Kaal sarp.png", alt: "Banner 1" },
    { url: "/images/Banner/Astrology.png", alt: "Banner 2" },
    { url: "/images/Banner/Rudraabhishek.png", alt: "Banner 3" },
    { url: "/images/Banner/banner-4.webp", alt: "Banner 4" },
    { url: "/images/Banner/banner-5.webp", alt: "Banner 5" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable built-in autoplay
    autoplaySpeed: 3000, // Set autoplay interval to 3 seconds
    arrows: false,
    lazyLoad: "ondemand" as const, // Lazy load off-screen slides
  };

  return (
    <div className=" relative mt-[px] w-full aspect-[20/7] overflow-hidden z-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full aspect-[20/7]">
            <Image
              src={image.url}
              alt={image.alt}
              width={2000} // Example width (adjust based on your design)
              height={1000} // Example height (20:7 ratio = 2000:700)
              className="w-full h-full " // Use object-cover for better fit
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
              priority={index === 0} // Prioritize the first image for LCP
              loading={index === 0 ? "eager" : "lazy"} // Lazy load off-screen images
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
