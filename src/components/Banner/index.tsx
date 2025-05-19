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
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    lazyLoad: "ondemand" as const,
  };

  return (
    <div className="relative w-full aspect-[20/7] overflow-hidden z-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-full flex justify-center items-center">
            <Image
              src={image.url}
              alt={image.alt}
              layout="fill"
              objectFit="contain" // Show entire image without cropping
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
