import { Input } from "@/components/ui/input";
import { login, signup } from "./actions";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <section className="w-full h-screen bg-red-400 flex items-center justify-center">
      <form className="p-6 border bg-neutral-50 shadow-lg rounded-xl">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Passwort"
            required
          />
        </div>

        {/* <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required /> */}
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </section>
  );
}
