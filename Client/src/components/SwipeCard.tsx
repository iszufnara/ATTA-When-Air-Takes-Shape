import * as React from "react";
import "./css/swipe.scss";
import logo from "../assets/atta_logo.webp";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface SwipeCardProps {}

export function SwipeCard(props: SwipeCardProps) {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    swipeToSlide: true,
    initialSlide: 2,
    variableWidth: true,
    onSwipe: () => {
      setTimeout(() => {
        navigate("/map-route");
      }, 500);
    },
  };

  return (
      <div className="swipe">
        <div className="swipe-upper">
          <div className="swipe-header">When Air Takes Shape</div>
          <div className="swipe-description">
            - A breathing sculpture that moves with real-time air quality
          </div>
        </div>
        <div className="swipe-middle">
          <div className="swipe-by">By</div>
          <div className="swipe-logo">
            <img src={logo} />
          </div>
          <div className="swipe-atta">Activism Through Technology and Art</div>
        </div>

        <div className="swipe-lower">
          <Slider {...settings} className="swipe-button">
            <p>Welcome</p>

            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g filter="url(#filter0_d_1276_824)">
                  <path
                    d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z"
                    fill="white"
                  />
                  <path
                    d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>

            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g filter="url(#filter0_d_1276_824)">
                  <path
                    d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z"
                    fill="white"
                  />
                  <path
                    d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
            <p>Swipe to get started</p>
          </Slider>
        </div>
      </div>
  );
}
