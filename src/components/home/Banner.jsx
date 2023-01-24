import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../constants/data";
import { styled } from "@mui/material";
import "./Banner.css"
const Images = styled("img")(({ theme }) => ({
  width: "92%",
  height: "360px",
  'margin-left': "62px",
  [theme.breakpoints.down("sm")]: {
    objectFit: "cover",
    height: 180,
  },
}));

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
      containerClass="carousel-container"
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl={true}
    >
      {bannerData.map((data) => (
        <Images key={data.id} src={data.url} alt="" />
      ))}
    </Carousel>
  );
};
export default Banner;
