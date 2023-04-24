import CarouselSliderItem from "./CarouselSliderItem";
import React, {useState} from "react";

export default function CarouselSlider() {

  const [activeIndex, setActiveIndex] = useState(0);


  return (
 <div className="carousel">
  <div className="inner"
    style={{transform: `translate:(-${activeIndex * 100})`}}>
  <CarouselSliderItem />
  </div>

  <div className="carousel-buttons">
    <button className="button-arrow"><span className="material-symbols-outlined">

</span></button>
  </div>
  <div className="indicators">
  <span className="material-symbols-outlined">
  <button className="indicator-buttons">
    {/* {items.map} */}
    </button>radio_button_checked
  </span>
  </div>
  <button className="button-arrow"><span className="material-symbols-outlined">
</span></button>
 </div>
  );
}