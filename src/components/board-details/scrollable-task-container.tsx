"use client";

import { TTask } from "@/data/types";
import { cn } from "@/lib/utils";
import { textHeadingM } from "@/styles/custom-class-names";
import { useEffect, useRef, useState } from "react";

export function ScrollableTaskContainer({ tasks }: { tasks: TTask[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    setScrollbarVisible(ref.current.scrollHeight > ref.current.clientHeight);
  }, []);

  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-main-purple"
    >
      <div className="absolute flex flex-col gap-5 ">
        {tasks.map((task) => {
          return (
            <li
              key={task.id}
              className={cn(
                "py-6 px-4 bg-white rounded-lg shadow-lg w-72",
                textHeadingM,
                scrollbarVisible && "w-[269px]"
              )}
            >
              {task.name}
            </li>
          );
        })}
      </div>
    </div>
  );
}
