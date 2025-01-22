import { ModeToggle } from "@/components/ui/theme-selector";

export function AdminNavbar() {
  return (
    <header className="flex items-center h-14 sm:h-16 border-b shadow-lg backdrop-blur backdrop-saturate bg-background/80">
      <nav className="flex w-full items-center justify-between gap-4 mx-auto max-w-7xl px-4">
        <p>{process.env.APP_NAME}</p>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
