"use client";

import { TTask } from "@/data/types";
import { cn } from "@/lib/utils";
import { textHeadingM } from "@/styles/custom-class-names";
import { useEffect, useRef, useState } from "react";

export function ScrollableTaskContainer({ tasks }: { tasks: TTask[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);

  useEffect(() => {
    const container = ref.current;
    const content = ref2.current;
    if (!container || !content) return;

    const updateScrollbarVisible = () => {
      if (ref.current)
        setScrollbarVisible(
          ref.current.scrollHeight > ref.current.clientHeight,
        );
    };

    const resizeObserver = new ResizeObserver((entries) => {
      setScrollbarVisible(
        entries[0].borderBoxSize[0].blockSize <
          entries[1].borderBoxSize[0].blockSize,
      );
    });

    resizeObserver.observe(container);
    resizeObserver.observe(content);

    return () => {
      container && resizeObserver.unobserve(container);
      content && resizeObserver.unobserve(content);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-main-purple"
    >
      <div className="flex flex-col gap-5" ref={ref2}>
        {tasks.map((task) => {
          return (
            <li
              key={task.id}
              className={cn(
                "w-72 rounded-lg bg-white px-4 py-6 shadow-lg",
                textHeadingM,
                scrollbarVisible && "w-[269px]",
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
