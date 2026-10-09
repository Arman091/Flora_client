import React from "react";

import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import Button from "../common/button";

const ProductComponent = ({ products, title, timer }) => {
  const countdown_URL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span className="text-[1.2em] text-brand">
        {hours}:{minutes}:{seconds} OFFER ENDS IN
      </span>
    );
  };

  return (
    <div className="mt-2.5 text-black">
      <div className="flex h-20 items-center bg-deal-band p-[15px_20px] font-[cursive]">
        <p className="mr-[25px] text-[22px] font-medium leading-[34px]">
          {title}
        </p>
        {timer && (
          <div className="flex items-center text-timer">
            <img
              src={countdown_URL}
              alt="timer"
              className="w-[25px] pr-2.5"
            />
            <Countdown date={Date.now() + 12788734} renderer={renderer} />
          </div>
        )}
        <Button className="ml-auto rounded-[3px] bg-blue text-xs font-medium">
          View All
        </Button>
      </div>
      <hr className="border-divider" />

      <div className="mx-auto flex w-[95%] flex-wrap gap-[2px] bg-white p-2">
        {products.map((product) => (
          <div
            className="w-full bg-product-card hover:bg-product-card-hover md:w-[calc(33.333%-2px)]"
            key={product.id}
          >
            <Link to={`product/${product.id}`}>
              <div className="p-[25px_15px] text-center">
                <img
                  src={product.url}
                  alt="product"
                  className="h-[250px] w-[350px]"
                />
                <p className="mt-1.5 text-sm font-semibold text-product-title font-[cursive]">
                  {product.title.shortTitle}
                </p>
                <p className="mt-1.5 text-sm text-black">{product.discount}</p>
                <p className="mt-1.5 text-sm text-brand">{product.tagline}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
