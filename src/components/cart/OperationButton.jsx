import React from "react";
import Button from "../common/button";

const OperationButton = () => {
  return (
    <div className="mt-[82px] flex">
      <Button className="rounded-full bg-qty-btn min-w-[64px]">-</Button>
      <Button className="rounded-full bg-qty-btn min-w-[64px]">1</Button>
      <Button className="rounded-full bg-qty-btn min-w-[64px]">+</Button>
    </div>
  );
};

export default OperationButton;
