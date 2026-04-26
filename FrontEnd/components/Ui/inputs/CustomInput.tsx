export default function CustomInput({
    value,
    onChange,
    placeholder,
    type,
    disabled,
    name,
    onFocus
}: {
    value: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    name: string | undefined;
    disabled?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
    return (
         <input
         disabled={disabled}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
      onFocus={onFocus}/>
    );
}   