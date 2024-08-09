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
  list,
}: {
  label: string;
  nameSuffix: string;
  max?: number;
  list?: { id: string; value: string }[];
}) {
  const [inputs, setInputs] = useState(
    list
      ? list.map((v) => ({ ...v, focus: false }))
      : [{ id: `new${crypto.randomUUID()}`, value: "", focus: false }],
  );
  const inputRef = useRef<HTMLInputElement>(null);

  function addNewInput() {
    setInputs([
      ...inputs,
      { id: `new${crypto.randomUUID()}`, value: "", focus: true },
    ]);
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
      <div className="flex max-h-10 flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-main-purple">
        {inputs.map((input, i) => {
          return (
            <div key={input.id} className="flex items-center gap-4">
              <DialogFormInput
                name={`${nameSuffix}^${i}^${input.id}`}
                ref={i === inputs.length - 1 ? inputRef : undefined}
                defaultValue={input.value}
              />
              <button
                type="button"
                onClick={(e) => {
                  removeInput(input.id);
                }}
                className={inputs.length > 2 ? "mr-2" : ""}
              >
                <Image alt="x" src={grayX} />
              </button>
            </div>
          );
        })}
      </div>
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
