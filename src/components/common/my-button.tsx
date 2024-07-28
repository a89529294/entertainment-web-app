"use client";

import { myButtonCN, MyButtonProps } from "@/components/common/my-button-types";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  (props, ref) => {
    const { variant, size, className, ...rest } = props;

    return (
      <button
        ref={ref}
        className={cn(myButtonCN(variant, size), className)}
        {...rest}
      >
        {props.children}
      </button>
    );
  }
);

MyButton.displayName = "MyButton";
