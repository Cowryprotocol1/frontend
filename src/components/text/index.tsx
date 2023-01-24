import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React from "react";

type Props = VariantProps<typeof textStyles> & {
  children: React.ReactNode;
  className?: string;
  avatar?: string;
};

const textStyles = cva("", {
  variants: {
    intent: {
      h1: "sm:text-4xl text-3xl font-bold",
      h2: "sm:text-3xl text-2xl font-semibold",
      h3: "sm:text-2xl text-xl font-semibold",
      h4: "text-sm font-semibold",
      p: "text-xs",
      h6: "text-amber-700 error-msg",
      
    },
    avatar: {
      avatar_name: "text-white_day text-center mt-4 text-2xl",
      wallet_address: "text-brand_tertiary_grey text-base text-center font-thin underline",
      link: "text-purple-500 text-center"
    }, 
  },
  defaultVariants: {},
});

export function Text({ children, intent, avatar, className }: Props) {
  const Element = intent || "p";
  return (
    <span className={className}>
      <Element className={textStyles({ intent, avatar })}>{children}</Element>
    </span>
  );
}

export default Text;
