"use client";

import { DialogFormInput } from "@/components/common/board-task-column/dialog-form-input";
import { DialogFormLabel } from "@/components/common/board-task-column/dialog-form-label";
import { MyButton } from "@/components/common/my-button";
import { useEffect, useRef, useState } from "react";
import grayX from "@/assets/gray-x.svg";
import Image from "next/image";

export function DynamicLengthInputs({
  label,
  nameSuffix,
  max = 3,
}: {
  label: string;
  nameSuffix: string;
  max?: number;
}) {
  const [inputs, setInputs] = useState([
    { id: crypto.randomUUID(), value: "", focus: false },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  function addNewInput() {
    setInputs([...inputs, { id: crypto.randomUUID(), value: "", focus: true }]);
  }

  function removeInput(id: string) {
    setInputs((inputs) => {
      const newInputs = inputs.filter((input) => input.id !== id);
      if (newInputs.length === 1) newInputs[0].focus = true;
      return newInputs;
    });
  }

  useEffect(() => {
    inputs.at(-1)?.focus && inputRef.current?.focus();
  }, [inputs]);

  return (
    <fieldset className="flex flex-col gap-3">
      <DialogFormLabel label={label} />
      {inputs.map((input, i) => (
        <div key={input.id} className="flex items-center gap-4">
          <DialogFormInput
            name={`${nameSuffix}-${i}`}
            ref={i === inputs.length - 1 ? inputRef : undefined}
          />
          <button
            type="button"
            onClick={(e) => {
              removeInput(input.id);
            }}
          >
            <Image alt="x" src={grayX} />
          </button>
        </div>
      ))}
      <MyButton
        disabled={inputs.length === max}
        size="short"
        variant="secondary"
        onClick={addNewInput}
        type="button"
      >
        +Add New Task
      </MyButton>
    </fieldset>
  );
}
