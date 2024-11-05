import FormBox from "./components/FormBox";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Providers } from "./providers";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const isInstalled = process.env.APPLICATION_INSTALLED === 'true'; // Ensure the correct environment variable



  return (
    <>
    <Providers>
      <ThemeSwitcher />
      <div className="w-screen h-screen p-20 text-foreground">
        {!isInstalled && (
              <FormBox />
          )}
          {isInstalled && <LoginForm/>} {/* redirect to login form */}
      </div>
    </Providers>
    </>
  );
}
