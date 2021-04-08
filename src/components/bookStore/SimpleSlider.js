import React from "react";
import Carousel from "react-elastic-carousel";
import MyCard from "./MyCard";
import MyBookImage from "./image/한국사기출500제.png";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
];

function SimpleSlider({ sell_book_list, text }) {
  const sellbooklist = sell_book_list.map((item) => {
    return (
      <MyCard
        key={item._id}
        title={item.book_info.title}
        book_id={item._id}
        description={item.book_info.author}
        price={item.book_info.price}
        pic={MyBookImage}
        sell_book_list={sell_book_list}
      />
    );
  });
  return (
    <>
      <h1 style={{ fontSize: "12px" }}>{text}</h1>
      <div>
        <Carousel breakPoints={breakPoints} pagination={false}>
          {sellbooklist}
        </Carousel>
      </div>
    </>
  );
}

export default SimpleSlider;
