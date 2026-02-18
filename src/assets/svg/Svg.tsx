import React from "react";
import Icons from "./icons.svg";

interface ISvg {
  name: string;
  color?: string;
  width?: number;
  height?: number;
}

const Svg = ({ name, color, width, height }: ISvg) => {
  return (
    <svg
      className={`icon icon-${name}`}
      fill={color}
      width={width}
      height={height}
    >
      <use xlinkHref={`${Icons}#${name}`} />
    </svg>
  );
};

export default Svg;
