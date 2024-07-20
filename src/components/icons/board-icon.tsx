import * as React from "react";

export function BoardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.846.846A2.889 2.889 0 000 2.89V13.11A2.889 2.889 0 002.889 16H13.11A2.888 2.888 0 0016 13.111V2.89A2.888 2.888 0 0013.111 0H2.89C2.123 0 1.388.304.846.846zm.487 12.265V8.444h8.445v6.223h-6.89a1.556 1.556 0 01-1.555-1.556zm8.445-6V1.333h-6.89A1.556 1.556 0 001.334 2.89V7.11h8.445zm1.333-1.333h3.556v4.444H11.11V5.778zm3.556 5.778H11.11v3.11h2a1.556 1.556 0 001.556-1.555v-1.556zm0-8.667v1.555H11.11v-3.11h2a1.556 1.556 0 011.556 1.555z"
        fill={props.fill}
      />
    </svg>
  );
}
