import { Autocomplete } from "@/components/ui/autocomplete";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <form className="mx-auto max-w-5xl py-20">
      <div className="grid grid-cols-2 gap-x-4">
        <Autocomplete>
          <Input type="text" placeholder="Search for a country" />
        </Autocomplete>
      </div>
    </form>
  );
}
