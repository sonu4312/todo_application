import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  Transition,
  ListboxOption,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils.ts";

interface Option {
  value: string;
  label: string;
}

interface ListBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

export default function ListBox({
  value,
  onChange,
  options,
  className,
}: ListBoxProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={cn("relative", className)}>
        <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
          <span className="block truncate">{selected?.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                className={({ active }) =>
                  cn(
                    "relative cursor-pointer select-none py-2 pl-10 pr-4",
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  )
                }
                value={option.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cn(
                        "block truncate",
                        selected ? "font-medium" : "font-normal"
                      )}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
