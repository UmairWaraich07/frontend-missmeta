"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  options: string[];
  placeholder: string;
  handleChange: () => void;
}

const Options = ({ options, handleChange, placeholder }: Props) => {
  return (
    <div className={`relative`}>
      <Select onValueChange={handleChange}>
        <SelectTrigger
          className={`no-focus light-border-2 background-light800_dark300 text-dark500_light700 body-regular light-border border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular light-border-2 border bg-light-900 dark:bg-dark-300">
          <SelectGroup className="">
            {options.map((filter, index) => (
              <SelectItem
                className="focus:bg-light-800 dark:focus:bg-dark-400 cursor-pointer text-dark-100"
                key={`${filter}-${index}`}
                value={filter}
              >
                {filter}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Options;
