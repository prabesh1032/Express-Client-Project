"use client";
import Input from "../ui/input";
import Button from "../ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/auth.schema";
import { TLogin } from "@/types/auth.types";
import { login } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { admins } from "@/types/enum.types";
import { useToast } from "@/components/common/toast/toast-provider";

const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLogin>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
        mode: 'all'
    });


    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            localStorage.setItem("nepali-store-user", JSON.stringify(response.data));
            const isAdmin = admins.includes(response.data.role);
            toast(
                isAdmin ? "Admin login successful. Opening your dashboard..." : `Welcome back, ${response.data.full_name}!`,
                "success",
            );
            window.setTimeout(() => router.replace(isAdmin ? "/admin" : "/"), 700);
        },
        onError: (error) => {
            const apiError = error as { message?: string; error?: { message?: string } };
            toast(apiError.message ?? apiError.error?.message ?? "Invalid email or password. Please try again.", "error");
        }
    })


    //* on Submit
    const onSubmit = (data: TLogin) => {
        mutate(data)
        // try {
        //    
        //     const response = await login(data)
        //     console.log("login submitted", response);

        // } catch (error) {
        //     console.log(error)
        // }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* email input  */}
            <Input
                register={register}
                name="email"
                required
                id="email"
                placeholder="johndoe@gmail.com"
                label="Email"
                type="email"
                error={errors?.email?.message}
            />
            {/* password input  */}

            <Input
                required={true}
                register={register}
                name="password"
                id="password"
                placeholder="enter password"
                label="Password"
                type="password"
                error={errors?.password?.message}

            />

            {/* button */}
            <div className="mt-4">
                <Button label={isPending ? "Logging in..." : "Login"} type={"submit"} />
            </div>
        </form>
    );
};

export default LoginForm;
