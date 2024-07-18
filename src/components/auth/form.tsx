"use client";

import { useFormState } from "react-dom";

export function Form({
  children,
  action,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, formAction] = useFormState(action, {
    error: null,
  });

  return (
    <form action={formAction} className={className}>
      {children}
      <p>{state.error}</p>
    </form>
  );
}

export interface ActionResult {
  error: string | null;
}
