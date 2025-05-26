"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner: React.FC = () => {
  const images = [
    { url: "/images/Banner/Kaal sarp (1).png", alt: "Banner 1" },
    { url: "/images/Banner/Astrology.png", alt: "Banner 2" },
    { url: "/images/Banner/Rudraabhishek (1).png", alt: "Banner 3" },
    { url: "/images/Banner/Mangal.png", alt: "Banner 4" },
    { url: "/images/Banner/maha.png", alt: "Banner 5" },
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
    <div className=" relative mt-[px] w-full h-full overflow-hidden z-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              src={image.url}
              alt={image.alt}

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
