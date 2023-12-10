import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";


const MainNav = () => {
  return (
    <div className="hidden max-w-7xl mx-auto md:flex justify-between items-center space-x-3">
      <Button variant="ghost" className="uppercase text-md">Proizvodi</Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="uppercase text-md">Kategorije</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex p-4 space-x-10">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="border-b text-center">
              Men
            </DropdownMenuLabel>
            <DropdownMenuItem>
              Prvi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Drugi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Treći
            </DropdownMenuItem>
            <DropdownMenuItem>
              Četvrti
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel className="border-b text-center">
              Women
            </DropdownMenuLabel>
            <DropdownMenuItem>
              Prvi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Drugi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Treći
            </DropdownMenuItem>
            <DropdownMenuItem>
              Četvrti
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel className="border-b text-center">
              Unisex
            </DropdownMenuLabel>
            <DropdownMenuItem>
              Prvi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Drugi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Treći
            </DropdownMenuItem>
            <DropdownMenuItem>
              Četvrti
            </DropdownMenuItem>
          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" className="uppercase text-md">Brandovi</Button>
      <Button variant="ghost" className="uppercase text-md">O Nama</Button>
      <Button variant="ghost" className="uppercase text-md">Kontakt</Button>
      <Button variant="ghost" className="uppercase text-md">Moj račun</Button>
    </div>
  );
}

export default MainNav;