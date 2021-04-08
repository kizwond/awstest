import React from "react";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
];

function AdSlider({ text }) {
  return (
    <>
      <h1 style={{ fontSize: "12px" }}>{text}</h1>
      <div>
        <Carousel
          breakPoints={breakPoints}
          pagination={true}
          showArrows={true}
          enableAutoPlay={true}
        >
          <div
            style={{
              backgroundImage: `url('https://picsum.photos/id/395/900/300')`,
              width: "100%",
              height: "200px",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url('https://picsum.photos/id/435/900/300')`,
              width: "100%",
              height: "200px",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url('https://picsum.photos/id/1025/900/300')`,
              width: "100%",
              height: "200px",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url('https://picsum.photos/id/25/900/300')`,
              width: "100%",
              height: "200px",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url('https://picsum.photos/id/154/900/300')`,
              width: "100%",
              height: "200px",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url('https://picsum.photos/id/304/900/300')`,
              width: "100%",
              height: "200px",
            }}
          ></div>
        </Carousel>
      </div>
    </>
  );
}

export default AdSlider;
