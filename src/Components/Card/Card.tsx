import React, { memo } from "react";
import "./CardStyle.css";

type CardProps = {
  name: string;
  price: number;
  difference?: number;
};

const Card: React.FC<CardProps> = memo(({ name, price, difference }) => {
  return (
    <div className="wrapper">
      <h3>{name}</h3>
      <div className="textWrapper">
        <div>Price: {price}$</div>
        {/* <div>Difference: {}</div> */}
      </div>
    </div>
  );
});
export default Card;
