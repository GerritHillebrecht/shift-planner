import { LoginForm } from "@/components/forms/auth/login/login-form";
import heroImage from "@/public/images/hero-bg-image-3.jpg";
import Image from "next/image";

import { Logo } from "@/components/ui/logo";
import { Locales } from "@/middleware";
import { getDictionary } from "../../dictionaries";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: Locales }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex relative z-10 min-h-svh flex-col items-center justify-center gap-6 px-6 md:px-10 overflow-hidden">
      <Image
        src={heroImage}
        alt="Hero image"
        fill={true}
        className="blur-sm scale-105 object-cover"
      />
      <div className="flex w-full max-w-sm flex-col gap-6 z-10">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Logo className="text-black" />
        </a>

        <LoginForm dict={dict} />
      </div>
    </div>
  );
}
