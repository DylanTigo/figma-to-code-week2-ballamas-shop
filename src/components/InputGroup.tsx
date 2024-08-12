import Input from "./ui/Input";

type InputGroupProps = {
  label: string;
  id: string;
  inputType: string;
  placeholder: string;
};

export default function InputGroup({ label, id, inputType, placeholder }: InputGroupProps) {
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id}>{label}</label>
      <Input type={inputType} placeholder={placeholder} id={id} />
    </div>
  );
}
