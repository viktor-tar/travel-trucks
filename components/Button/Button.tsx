import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "outline";

interface CommonProps {
  variant?: Variant;
  /** Stretches the button to the width of its container. */
  block?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** The design's pill button, rendered as a link when it has an href. */
export function Button({
  variant = "primary",
  block = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], block && styles.block, className]
    .filter(Boolean)
    .join(" ");

  if (rest.href !== undefined) {
    return (
      <Link {...(rest as ButtonAsLink)} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  );
}
