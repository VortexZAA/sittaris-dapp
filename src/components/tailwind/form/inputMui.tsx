import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const InputTextMui = ({
  label,
  name,
  size,
  value,
  onChange,
  required,
  disabled = false,
  addClass,
  type,
  placeholder,
  rows,
  multiline,
  min = 0,
  max,
  addDescription,
  maxLength,
}: {
  label: string;
  name: string;
  size?: "small" | "medium";
  value?: string | number;
  onChange?: Function;
  required?: boolean;
  type?: string;
  placeholder?: string;
  rows?: number;
  multiline?: boolean;
  addClass?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  addDescription?: string;
  maxLength?: number;
}) => {
  const [input, setInput] = useState(value || "");
  useEffect(() => {
    setInput(value || "");
  }, [value]);
  const props = {
    label: label,
    name: name,
    value: input,
    required: required,
    type: type || "text",
    placeholder: placeholder,
    size: size || "small",
    multiline: multiline || false,
    rows: rows,
    disabled: disabled,
    InputProps: {
      inputProps: { min: min, max: max, maxLength: maxLength},
      endAdornment: name === "price" && (
        <InputAdornment position="start"> <span className="text-white">$</span></InputAdornment>
      ),
      className: "text-xs md:text-sm !text-white h-10"
    },
  };

  return (
    <div className={`relative w-full flex items-center gap-2 ${addClass}`}>
      <TextField
        id="outlined-basic"
        className="w-full text-white"
        {...props}
        InputLabelProps={{ className: " text-xs md:text-sm text-white" }}
        inputProps={{ className: "text-xs md:text-sm !text-white" }}
        variant="outlined"
        onChange={(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          onChange && onChange(event);
          setInput(event.target.value);
        }}
      />
    </div>
  );
};

export default InputTextMui;
