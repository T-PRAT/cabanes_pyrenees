import { Command, CommandInput, CommandItem, CommandList } from './ui/command'

export const SearchBar = () => {
   return (
      <Command className="absolute left-5 top-5 z-10 h-9 w-40">
         <CommandInput placeholder="Search..." />
         <CommandList>
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
         </CommandList>
      </Command>
   )
}
