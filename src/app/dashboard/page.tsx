import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Providers } from "../providers";

export default function Dashboard() {
    return (
        <>
        <Providers>
            <ThemeSwitcher />
                <div className="w-screen h-screen p-20 text-foreground">
                    Welcome 
                    Logout, Reinstall App
                </div>
        </Providers>
        </>
    );
}
