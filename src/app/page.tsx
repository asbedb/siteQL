"use client"
import {useRef,  useEffect} from "react"
import FormBox from "./components/FormBox";
import ServiceBar from "./components/ServiceBar";
import { Providers } from "./providers";
import LoginForm from "./components/LoginForm";

export default function Home() {
  //Picking up installed app from local env file
  const isInstalled = process.env.APPLICATION_INSTALLED === 'true'; 
  const serviceBar = useRef<HTMLDivElement | null> (null)

  const setHeight = () => {
    if (serviceBar.current) {
      const mainArea = document.getElementById('content-area');
      if (mainArea) {
        mainArea.style.height = `${window.innerHeight - serviceBar.current.offsetHeight}px`;
      }
    }
  }
  useEffect(() => {
    setHeight();
    const handleResize = () => {
      setHeight();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <Providers>
        <div className="flex flex-col w-screen h-screen text-foreground bg-background">
          <div ref={serviceBar} className="flex flex-col w-full">
            <ServiceBar  />
          </div>
          <div className="flex items-center justify-center w-full h-full md:p-20" id="content-area">
            {!isInstalled && (
                  <FormBox />
              )}
              {isInstalled && <LoginForm/>} {/* redirect to login form */}
          </div>
        </div>
      </Providers>
    </>
  );
}
