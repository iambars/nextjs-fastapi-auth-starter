import ErrorText from "./error-text";

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  errorMessage?: string;
}

export default function FormInput({
  label,
  type = "text",
  name,
  id,
  placeholder,
  required = false,
  autoComplete,
  errorMessage,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-primary/80 text-sm font-medium">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="border-secondary/20 w-full rounded-md border px-3 py-2 focus:border-blue-600/90 focus:ring-0 focus:outline-none"
      />

      <ErrorText message={errorMessage} />
    </div>
  );
}
