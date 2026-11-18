import Input from "./ui/Input";

type InputGroupProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export default function InputGroup({ label, id, ...inputProps }: InputGroupProps) {
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id}>{label}</label>
      <Input id={id} name={id} {...inputProps} />
    </div>
  );
}
