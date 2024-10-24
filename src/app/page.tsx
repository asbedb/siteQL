import FormBox from "./components/FormBox";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Providers } from "./providers";

export default function Home() {
  return (
    <>
    <Providers>
      <div className="w-screen h-screen p-20 text-foreground">
        <ThemeSwitcher/>
        <FormBox></FormBox>
      </div>
    </Providers>
    </>
  );
}
