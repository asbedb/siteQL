import FormBox from "./components/FormBox";
import ServiceBar from "./components/ServiceBar";
import { Providers } from "./providers";
import LoginForm from "./components/LoginForm";

export default function Home() {
  //Picking up installed app from local env file
  const isInstalled = process.env.APPLICATION_INSTALLED === 'true'; 
  return (
    <>
      <Providers>
        <ServiceBar />
        <div className="text-foreground bg-background">
          {!isInstalled && (
                <FormBox />
            )}
            {isInstalled && <LoginForm/>} {/* redirect to login form */}
        </div>
      </Providers>
    </>
  );
}
