import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../constants/data";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  return (
    <Carousel
      infinite={true}
      swipeable={false}
      draggable={false}
      responsive={responsive}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      containerClass="mt-[104px] bg-carousel-bg"
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl={true}
    >
      {bannerData.map((data) => (
        <img
          key={data.id}
          src={data.url}
          alt=""
          className="ml-[62px] h-[360px] w-[92%] max-sm:h-[180px] max-sm:object-cover"
        />
      ))}
    </Carousel>
  );
};
export default Banner;
