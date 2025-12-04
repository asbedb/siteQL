// components/SqlNodeInformation.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SqlNodeInformationProps } from "../../types/types";

function SqlNodeInformation({
    connectCreateDB,
    showToast,
}: SqlNodeInformationProps) {
    //State variables
    const [host, setHost] = useState("0.0.0.0");
    const [user, setUser] = useState("root");
    const [dbName, setDbName] = useState("newApp");
    const [port, setPort] = useState("3306");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [blankDbPass, setBlankDbPass] = useState<boolean>(false);

    //variables for pw confirmation
    const isPasswordMatch =
        password && confirmPassword && password === confirmPassword;
    const noPassword = password === "" && confirmPassword === "";

    // State for button disable - prevent multiple creations without a refresh/reset
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const resetForm = () => {
        setHost("0.0.0.0");
        setPort("3306");
        setUser("root");
        setDbName("newApp");
        setPassword("");
        setConfirmPassword("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const portNumber = parseInt(port, 10);
        // Basic validation
        if (!host || !user || !dbName || !port) {
            showToast({
                message: "Host, User, Port, and Database names are required.",
                type: "error",
            });
            return;
        }
        if (!isPasswordMatch && !noPassword) {
            showToast({ message: "Passwords do not match.", type: "error" });
            return;
        }
        if (!blankDbPass) {
            showToast({
                message:
                    "You are trying to connect without a password. Please enter one or click 'Blank Pass' to continue.",
                type: "error",
            });
            return;
        }
        if (isNaN(portNumber)) {
            showToast({
                message: "The port specificed must be a number.",
                type: "error",
            });
        }
        setIsButtonDisabled(true);
        // Ensure that the result is a QueryResult object with a success property
        const { disablebtn } = await connectCreateDB({
            host,
            port,
            user,
            password,
            dbName,
        });
        // Set the button disabled state based on success or failure
        setIsButtonDisabled(disablebtn);
    };

    return (
        <div className="flex w-full h-full flex-col">
            <span className="text-2xl font-semibold">
                Start With Your SQL Node Information
            </span>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="host">Host</Label>
                    <Input
                        required
                        type="text"
                        id="host"
                        placeholder="Default: 0.0.0.0"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        className="py-2"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="port">Port</Label>
                    <Input
                        required
                        type="text"
                        id="port"
                        placeholder="Default: 3306"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        className="py-2"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="port">User</Label>
                    <Input
                        required
                        type="text"
                        id="db-user"
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Default: root"
                        value={user}
                        className="py-2"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="db-name">DB Name</Label>
                    <Input
                        required
                        type="text"
                        id="db-name"
                        value={dbName}
                        onChange={(e) => setDbName(e.target.value)}
                        placeholder="Default: newApp"
                        className="py-2"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="db-pass">
                        {!blankDbPass ? "DB Password" : "Blank/No Password"}
                    </Label>
                    <Input
                        required={!blankDbPass}
                        type="password"
                        id="db-pass"
                        disabled={blankDbPass}
                        onChange={(e) => setPassword(e.target.value)}
                        color={
                            isPasswordMatch && !blankDbPass
                                ? "success"
                                : "default"
                        }
                        className="py-2"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 py-2">
                    <Label htmlFor="db-pass">
                        {!blankDbPass
                            ? "Confirm Password"
                            : "Blank/No Password"}
                    </Label>
                    <Input
                        required={!blankDbPass}
                        type="password"
                        id="confirm-pass"
                        disabled={blankDbPass}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        color={
                            isPasswordMatch && !blankDbPass
                                ? "success"
                                : "default"
                        }
                        className="py-2"
                    />
                </div>
                <div className="flex items-center space-x-2 py-4">
                    <Checkbox
                        id="blankDbPass"
                        checked={blankDbPass}
                        onCheckedChange={(checked) => {
                            if (typeof checked === "boolean") {
                                setBlankDbPass(checked);
                            }
                        }}
                    />
                    <Label
                        htmlFor="blankDbPass"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Blank Pass (DevOps)
                    </Label>
                </div>
                <div className="flex flex-row items-center justify-between w-full ">
                    <div>
                        <Button onClick={resetForm}>Reset Values</Button>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            color="success"
                            variant={isButtonDisabled ? "outline" : "default"}
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled
                                ? "Database Created"
                                : "Create Database"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SqlNodeInformation;
