import * as React from 'react';
import "./css/swipe.scss";
import logo from "../assets/atta_logo.webp";

export interface SwipeCardProps {
}

export function SwipeCard(props: SwipeCardProps) {
  return (
    <div className='swipe-container'>
      <div className='swipe-upper'>
        <div className="swipe-header">When Air Takes Shape</div>
        <div className='swipe-description'>- A breathing sculpture that moves
          with real-time air quality
        </div>
      </div>
      <div className='swipe-middle'>
        <div className="swipe-by">By</div>
        <div className='swipe-logo'>
          <img src={logo} />
        </div>
        <div className='swipe-atta'>Activism Through Technology and Art</div>
      </div>
      <div className='swipe-lower'>
        <button className='swipe-button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g filter="url(#filter0_d_1276_824)">
              <path d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z" fill="black" />
              <path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" fill="black" />
            </g>
          </svg>
          <p>Swipe to get Started</p>
        </button>
      </div>
    </div>
  );
}
