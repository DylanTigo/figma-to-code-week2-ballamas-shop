import Button from "./ui/Button";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="col-span-full flex flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <p className="text-gray-dark">{message}</p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  );
}
