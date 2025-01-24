import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getWorkspaceTypes } from "@/lib/data-access/workspace";
import { Locales } from "@/middleware";
import heroImage from "@/public/images/hero_drawn_workspace.svg";
import Image from "next/image";
import { getDictionary } from "../../dictionarios";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locales }>;
}) {
  const { lang } = await params;
  console.log("lang", lang);
  const dict = await getDictionary(lang);

  const workspaceTypes = await getWorkspaceTypes();

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-5xl mx-auto grid grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold max-w-lg mb-4">
            {dict.workspace.prompts.workspaceName}
          </h1>
          <p className="mb-4">{dict.workspace.prompts.workspaceDescription}</p>
          <form>
            <Input
              type="text"
              placeholder={dict.workspace.prompts.workspacePlaceholder}
              required
              min={3}
            />
            <Separator className="my-4" />
            <Select required>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={dict.workspace.prompts.workspaceType}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {dict.workspace.prompts.workspaceType}
                  </SelectLabel>
                  {workspaceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit" className="mt-4">
              {dict.workspace.prompts.workspaceCTA}
            </Button>
          </form>
        </div>
        <div className="relative flex items-center justify-center">
          <Image className="w-2/3" src={heroImage} alt="Hero image" />
        </div>
      </div>
    </div>
  );
}
