"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "premium";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 border border-white/10",
  premium:
    "bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 hover:from-indigo-400 hover:via-violet-400 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-white/10",
  secondary:
    "bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm",
  ghost:
    "bg-transparent hover:bg-white/[0.04] text-white/50 hover:text-white/80",
  danger:
    "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 hover:border-red-500/20",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3 text-base rounded-xl",
};

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  className = "",
  type = "button",
}: Props) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2
        font-medium tracking-wide
        transition-colors duration-200
        disabled:opacity-30 disabled:cursor-not-allowed
        select-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.04,
              y: -1,
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.95,
              y: 1,
              transition: { duration: 0.08 },
            }
      }
      style={
        variant === "premium" && !disabled
          ? { boxShadow: "0 0 28px rgba(99,102,241,0.18)" }
          : undefined
      }
    >
      {children}
    </motion.button>
  );
}
