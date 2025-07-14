"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { LoginSchema } from "./loginValidation";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  const [reCaptchaStatus, SetReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirectPath");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await LoginUser(data);

      if (res.success) {
        toast.success(res?.message || "Registration successful!");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred!");
    }
  };

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        SetReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login Join us today and start your journey!
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="h-12 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="h-12 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex mt-3 w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCA_CLIENT_KEY!}
              onChange={handleReCaptcha}
              className="mx-auto "
            />
          </div>

          {/* Submit button */}
          <Button
            disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="w-full h-12 rounded-xl text-base font-semibold"
          >
            {isSubmitting ? "Login..." : "Login"}
          </Button>
        </form>
      </Form>

      {/* Login Link */}
      <p className="text-sm text-center text-muted-foreground mt-4">
        Do not have any account?{" "}
        <a href="/register" className="text-primary font-medium">
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
