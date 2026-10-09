import React from "react";
import { BannerMiddle_imgUrl } from "../../constants/data";

const BannerMiddle = () => {
  const url =
    "https://miamigardensflorist.com/pub/media/revslider/valentine.jpg";
  return (
    <>
      <div className="mt-2.5 flex flex-wrap justify-between">
        {BannerMiddle_imgUrl.map((image, index) => (
          <div key={index} className="w-full md:w-1/3">
            <img src={image} alt="" className="w-full" />
          </div>
        ))}
      </div>
      <img
        src={url}
        alt="img"
        className="mb-8 mt-2.5 w-full max-md:h-[100px] max-md:object-cover"
      />
    </>
  );
};

export default BannerMiddle;
