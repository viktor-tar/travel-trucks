interface IconProps {
  id: string;
  size?: number;
  className?: string;
}

/** An icon from the SVG sprite. Icons are decorative; their meaning is always in text nearby. */
export function Icon({ id, size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
