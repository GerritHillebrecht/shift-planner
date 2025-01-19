import { LoginForm } from "@/components/login-form";
import heroImage from "@/public/images/hero-bg-image-3.jpg";
import Image from "next/image";

import { DM_Serif_Display } from "next/font/google";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export default function LoginPage() {
  return (
    <>
      <div className="flex relative z-10 min-h-svh flex-col items-center justify-center gap-6 px-6 md:px-10 overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero image"
          fill={true}
          objectFit="cover"
          className="blur-sm scale-105"
        />
        <div className="flex w-full max-w-sm flex-col gap-6 z-10">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div> */}
            {/* Acme Inc. */}
            <span className={`font-bold text-black opacity-90 text-3xl ${dmSerifDisplay.className}`}>{process.env.APP_NAME}</span>
          </a>

          <LoginForm />
        </div>
      </div>
    </>
  );
}
