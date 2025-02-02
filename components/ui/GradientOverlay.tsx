import React from "react";

const GradientOverlay = () => {
  return (
    <>
      <div
        className={`absolute inset-0 z-[-10] bg-gradient from-black to-transparent`}
      />
    </>
  );
};

export default GradientOverlay;
