// components/SiteInformation.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UpdateSiteInformationProps } from "@/types/types";

export default function SiteInformation({
    updateSiteInformation,
}: UpdateSiteInformationProps) {
    //application information state variables
    const [location, setLocation] = useState("");
    const [appName, setAppName] = useState("");
    const [aboutApp, setAboutSite] = useState("");

    // State for button disable - prevent multiple creations without a refresh/reset
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Ensure that the result is a QueryResult object with a success property
        const { disablebtn } = await updateSiteInformation({
            location,
            appName,
            aboutApp,
        });
        // Set the button disabled state based on success or failure
        setIsButtonDisabled(disablebtn);
    };

    const handleReset = () => {
        setLocation("");
        setAppName("");
        setAboutSite("");
        setIsButtonDisabled(false);
    };

    return (
        <div className="flex w-full h-full flex-col">
            <span className="text-2xl font-semibold">
                Some Information about your application
            </span>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        type="text"
                        id=";ocation"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="py-2"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="app-name">App Name</Label>
                    <Input
                        required
                        type="text"
                        id="app-name"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        placeholder="Default: newApp"
                        className="py-2"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="about-app">About App</Label>
                    <Textarea
                        id="about-app"
                        placeholder="Enter a Description about your project:"
                        value={aboutApp}
                        onChange={(e) => setAboutSite(e.target.value)}
                        className="py-2"
                    />
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <div>
                        <Button onClick={handleReset}>Reset Values</Button>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            color="success"
                            variant={isButtonDisabled ? "outline" : "default"}
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled
                                ? "Information Updated"
                                : "Save Information"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
