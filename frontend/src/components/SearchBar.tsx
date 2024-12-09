import { Command, CommandInput, CommandItem, CommandList } from "./ui/command";

export const SearchBar = () => {
  return (
    <Command className="absolute top-5 left-5 z-10 w-40 h-9">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandItem>Item 1</CommandItem>
        <CommandItem>Item 2</CommandItem>
      </CommandList>
    </Command>
  );
};
