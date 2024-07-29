import { usePrevValue } from "@/hooks/use-prev-value";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

export function useCloseDialogAfterSubmission(closeDialog: () => void) {
  const { pending } = useFormStatus();
  const prevPending = usePrevValue(pending);

  useEffect(() => {
    if (prevPending && !pending) closeDialog();
  }, [prevPending, pending, closeDialog]);

  return pending;
}
