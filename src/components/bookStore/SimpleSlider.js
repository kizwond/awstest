import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import MyCard from "./MyCard";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
];

function SimpleSlider({ text }) {
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>{text}</h1>
      <div>
        <Carousel breakPoints={breakPoints}>
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
        </Carousel>
      </div>
    </>
  );
}

export default SimpleSlider;
