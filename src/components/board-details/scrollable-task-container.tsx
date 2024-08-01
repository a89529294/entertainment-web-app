"use client";

import { DraggableTask } from "@/components/board-details/draggable-task";
import { TTask } from "@/data/types";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

export function ScrollableTaskContainer({ tasks }: { tasks: TTask[] }) {
  const ref = useRef<HTMLDivElement>();
  const ref2 = useRef<HTMLDivElement>(null);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);

  useEffect(() => {
    const container = ref.current;
    const content = ref2.current;
    if (!container || !content) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 2)
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
      ref={(ele) => {
        ref.current = ele ?? undefined;
      }}
      className="relative overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-main-purple"
    >
      <div className="flex flex-col gap-5 p-2" ref={ref2}>
        {tasks.map((task) => {
          return (
            <DraggableTask
              key={task.id}
              task={task}
              scrollbarVisible={scrollbarVisible}
            />
          );
        })}
      </div>
    </div>
  );
}
