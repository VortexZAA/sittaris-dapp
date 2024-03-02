import Icon from "@/components/icon/Icon";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

interface options {
  name: string;
  value: string;
  bgcolor?: string;
  color?: string;
}

const MultipleSelectBox = ({
  label,
  name,
  multiple,
  required,
  options,
  defaultValue,
  children,
  onChange,
  addClassLabel,
}: {
  label: string;
  name: string;
  multiple: boolean;
  options: options[];
  defaultValue?: string | string[];
  required?: boolean;
  checked?: boolean;
  children?: any;
  onChange?: any;
  addClassLabel?: string;
}) => {
  const [select, setSelect]: any = useState<string[] | string>(
    !multiple ? defaultValue || "" : defaultValue || []
  );
  //console.log('select', select);

  useEffect(() => {
    setSelect(!multiple ? defaultValue || "" : defaultValue || []);
  }, [defaultValue]);

  return (
    <FormControl
      sx={{ minWidth: 100 }}
      className=" h-full w-full gap-2 mt-1"
      size="small"
    >
      <InputLabel
        className={` ${addClassLabel} bg-gray-100 text-xs text-gray-400 lg:text-sm`}
      >
        {label}
      </InputLabel>
      <Select
        name={name}
        className=" text-xs text-white lg:text-sm border-transparent  rounded-md h-10 w-full flex items-center  py-2 pr-3"
        multiple={multiple}
        value={select}
        IconComponent={() => {
          return <Icon icon="ArrowDropDown" className="text-white w-6 h-6" />;
        }}
        size="small"
        onChange={(e: any) => {
          setSelect(e.target.value);
          onChange && onChange(e);
        }}
        required={required}
      >
        {options &&
          options.map((item: any, index: number) => {
            return item?.bgcolor || item?.color ? (
              <MenuItem key={index} value={item.value}>
                <div
                  className="flex h-full w-full items-center justify-center px-1 text-xs lg:text-sm "
                  style={{
                    background: item?.bgcolor || "transparent",
                    color: item?.color || "black",
                  }}
                >
                  {item.name}
                </div>
              </MenuItem>
            ) : (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
      </Select>
      {children}
    </FormControl>
  );
};

export default MultipleSelectBox;
