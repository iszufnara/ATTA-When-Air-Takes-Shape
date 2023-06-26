// css styles import
import "./css/action.css";

// libraries import 
import React from 'react';

export interface takeActionPropsInterface {
}

export function TakeAction(props: takeActionPropsInterface) {
  return (
    <div className="take-action-container">
      <h1>
        Take Action Route
      </h1>
    </div>
  );
}
