import React from 'react';
import runGif from '../assets/demon-slayer-run.gif'; // Import the image

const Runner = () => {
  return (
    <div className="running-container">
      <img src={runGif} alt="Demon Slayer Running" className="pixel-runner" />
    </div>
  );
};

export default Runner;