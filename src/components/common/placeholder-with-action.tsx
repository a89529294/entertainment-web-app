import { MyButton } from "@/components/common/my-button";

export function PlaceholderWithAction({
  text,
  onAddLabel,
  onAdd,
}: {
  text: string;
  onAddLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="grid place-items-center absolute inset-0">
      <div className="flex flex-col items-center gap-6">
        <p className="text-medium-grey font-bold text-lg px-10 text-center">
          {text}
        </p>
        <MyButton variant="primary" onClick={onAdd}>
          {onAddLabel}
        </MyButton>
      </div>
    </div>
  );
}
