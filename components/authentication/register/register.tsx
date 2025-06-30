"use client";

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
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { RegisterSchema } from "../../../lib/zod/register";
import axios from "axios";
import Logo from "@/components/ui/logo";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // Animation trigger on component mount
  React.useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    try {
      toast.loading("Processing...");
      setIsLoading(true);
      await axios
        .post("/api/user", values)
        .then((res) => {
          if (res.data) {
            toast.dismiss();
            toast.success(`${res?.data?.message}`);
          }
        })
        .then(async () => {
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          router.push("/dashboard");
          toast.dismiss();
          setIsLoading(false);
        });
      // eslint-disable-next-line
    } catch (error: any) {
      toast.dismiss();
      setIsLoading(false);
      if (error?.response) {
        toast.error(`${error?.response?.data}`);
      }
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-gradient-to-br from-slate-50 to-green-50">
      {/* Left side - Illustration and branding */}
      <div className="hidden md:flex md:w-1/2 bg-white p-8 flex-col justify-between items-center relative overflow-hidden animate-slide-in-left">
        {/* Floating background elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-green-400 rounded-full opacity-50 animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-16 h-16 bg-green-200 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "1s" } as React.CSSProperties}
        ></div>

        <div className="absolute top-8 left-8">
          <Button
            asChild
            className="group flex items-center gap-2 transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-lg"
          >
            <Link href="/login">
              <ArrowLeft className="w-6 h-6 text-green-500 group-hover:text-white transition-all duration-300" />
              <span>Back Login</span>
            </Link>
          </Button>
        </div>

        <div className="w-full flex flex-col items-center justify-start mt-14 xl:mt-20 h-full">
          <div className="w-full">
            {/* Image Section */}
            <div className="w-full mx-auto  flex items-center justify-around animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-xl"></div>
                <Image
                  src="/assets/auth/register.jpg"
                  alt="Register"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 bg-gradient-to-br from-green-50 to-green-100 animate-slide-in-right">
        <div
          className={`w-full max-w-md space-y-8 transition-all duration-800 ${
            isFormVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center space-y-4 ">
            <div className="flex justify-center mb-6">
              <div className="flex items-center group">
                <div className="mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                  <Logo />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  BECHA{" "}
                  <span className="text-green-500 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
                    KENA
                  </span>
                </h2>
              </div>
            </div>
            <h1
              className="text-2xl font-bold text-gray-900 "
              style={{ animationDelay: "0.2s" } as React.CSSProperties}
            >
              Create Your Account
            </h1>
            <p
              className="text-gray-500 "
              style={{ animationDelay: "0.3s" } as React.CSSProperties}
            >
              Enter your credentials below to create your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-700 font-medium">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative form-input">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-50 text-gray-400 transition-colors duration-300">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          {...field}
                          placeholder="Full Name"
                          type="text"
                          autoCapitalize="none"
                          autoComplete="name"
                          disabled={isLoading}
                          className="pl-10 py-6 bg-white text-black border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-700 font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative form-input">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-50 text-gray-400 transition-colors duration-300">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="pl-10 py-6 bg-white text-black border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem
                    className=""
                    style={{ "--index": 2 } as React.CSSProperties}
                  >
                    <FormLabel className="text-gray-700 font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative form-input">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-50 text-gray-400 transition-colors duration-300">
                          <Lock className="h-5 w-5" />
                        </div>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          disabled={isLoading}
                          placeholder="Enter your password"
                          className="pl-10 py-6  text-black bg-white border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                        />

                        <Button
                          type="button"
                          size="sm"
                          variant={"link"}
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500 hover:text-green-600 transition-colors duration-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                          ) : (
                            <EyeOff className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                className="w-full py-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl  relative overflow-hidden cursor-pointer"
                style={{ "--index": 4 } as React.CSSProperties}
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Sign in
              </Button>

              <div
                className="relative my-6 "
                style={{ "--index": 5 } as React.CSSProperties}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-green-50 to-green-100 text-gray-500">
                    or
                  </span>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => signIn("google")}
                className="w-full py-6 border-gray-200 hover:text-black hover:bg-white hover:shadow-lg font-medium rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02]  group"
              >
                <svg
                  className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>

              <p
                className="text-center text-sm text-gray-500 mt-6 "
                style={{ "--index": 7 } as React.CSSProperties}
              >
                Already Have an Account?
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-800 font-medium transition-all duration-300 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
