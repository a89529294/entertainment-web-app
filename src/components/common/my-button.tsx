"use client";

import { myButtonCN, MyButtonProps } from "@/components/common/my-button-types";
import { cn } from "@/lib/utils";

export function MyButton(props: MyButtonProps) {
  const { variant, size, ...rest } = props;

  return (
    <button className={myButtonCN(variant, size)} {...rest}>
      {props.children}
    </button>
  );
}
