"use client";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { UpdateCredentialsProps } from "@/types/types";

const minFullnameChars = 5;
const maxFullNameChars = 100;
const minPasswordChars = 8;

const formSchema = z
    .object({
        fullName: z
            .string()
            .min(minFullnameChars, {
                message: `Full name must be at least ${minFullnameChars} characters.`,
            })
            .max(maxFullNameChars, {
                message: `Full name cannot exceed ${maxFullNameChars} characters.`,
            }),
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        password: z.string().min(minPasswordChars, {
            message: `Password must be at least ${minPasswordChars} characters.`,
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

type CredentialFormValues = z.infer<typeof formSchema>;

export default function CredentialsInformation({
    updateCredentials,
}: UpdateCredentialsProps) {
    // Initialize useForm with zodResolver
    const form = useForm<CredentialFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });
    const { isSubmitting, isSubmitSuccessful } = form.formState;
    const onSubmit: SubmitHandler<CredentialFormValues> = async (values) => {
        form.setValue("fullName", values.fullName, { shouldDirty: true });
        try {
            const { disablebtn } = await updateCredentials({
                fullName: values.fullName,
                password: values.password,
                email: values.email,
            });
            if (disablebtn) {
                form.reset(values, { keepValues: true });
            } else {
                throw new Error("Update failed on the server.");
            }
        } catch (error) {
            console.error("Update failed:", error);
            form.reset(values, { keepValues: true, keepDirty: true });
        }
    };
    const handleReset = () => {
        form.reset();
    };
    const isButtonDisabled = isSubmitting || isSubmitSuccessful;
    return (
        <div className="flex w-full h-full flex-col space-y-4">
            <span className="text-2xl font-semibold">
                Setup your Credentials
            </span>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Your Full Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        id="userPass"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        id="confirmPass"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row items-center justify-between w-full pt-2">
                        <div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                            >
                                Reset Values
                            </Button>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                // Disable if submitting or already successful, AND form must be valid
                                disabled={
                                    isButtonDisabled || !form.formState.isValid
                                }
                            >
                                {isSubmitting
                                    ? "Updating..."
                                    : isSubmitSuccessful
                                    ? "Credentials Updated"
                                    : "Update Credentials"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
