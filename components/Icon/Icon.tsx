import React from "react";

interface IconProps {
  id: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  id,
  width = 20,
  height = 20,
  className,
}) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
