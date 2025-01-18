import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
    error: supabaseError,
  } = await supabase.auth.getUser();

  if (supabaseError || !user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
