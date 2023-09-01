// css styles import
import "./css/aboutus.css";

// libraries import 
import React from 'react';

export interface aboutUsProps {
}

export function InfoPage(props: aboutUsProps) {
  return (
    <div className="info-page-container-outer">
      <div className="info-page-header"></div>
      <div className="info-page-container-inner"></div>
    </div>
  );
}
