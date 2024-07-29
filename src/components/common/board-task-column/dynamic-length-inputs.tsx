"use client";

import { DialogFormInput } from "@/components/common/board-task-column/dialog-form-input";
import { DialogFormLabel } from "@/components/common/board-task-column/dialog-form-label";
import { MyButton } from "@/components/common/my-button";
import { useState } from "react";
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
    { id: crypto.randomUUID(), value: "" },
  ]);

  function addNewInput() {
    setInputs([...inputs, { id: crypto.randomUUID(), value: "" }]);
  }

  function removeInput(id: string) {
    setInputs(inputs.filter((input) => input.id !== id));
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <DialogFormLabel label={label} />
      {inputs.map((input, i) => (
        <div key={input.id} className="flex items-center gap-4">
          <DialogFormInput name={`${nameSuffix}-${i}`} />
          <button
            type="button"
            onClick={(e) => {
              console.log(e.target);
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
