import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Providers } from "../providers";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components

export default function Dashboard() {
    return (
        <>
            <Providers>
                <ThemeSwitcher />
                <div className="w-screen h-screen p-20 text-foreground">
                    Welcome Logout, Reinstall App
                </div>
            </Providers>
        </>
    );
}
