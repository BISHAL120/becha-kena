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
import Logo from "@/components/ui/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDownCircleIcon,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LoginSchema } from "../../../lib/zod/login";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setValue } = form;

  // Animation trigger on component mount
  React.useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      toast.loading("Processing...", {});
      setIsLoading(true);
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (result?.error) {
        toast.dismiss();
        toast.error("Invalid number or password!", {
          position: "top-center",
        });
      } else {
        toast.dismiss();
        toast.success("Login successful!", {
          position: "top-center",
        });
        router.push(`/dashboard`);
        router.refresh();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred!", {
        position: "top-center",
      });
      console.log("Error :", error);
    }
  }

  type carouselProps = {
    id: number;
    title: string;
    desc: string;
    image: string;
    credentials?: {
      number: string;
      password: string;
    };
  };

  const CarouselDetails: carouselProps[] = [
    {
      id: 1,
      title: "Super Admin",
      desc: "Login with super admin.",
      image: "/assets/auth/super admin.avif",
      credentials: {
        number: "monerulmd5@gmail.com",
        password: "aaaaaaaa",
      },
    },
    {
      id: 2,
      title: "Admin Login",
      desc: "Login with admin.",
      image: "/assets/auth/admin.jpg",
      credentials: {
        number: "monerulislambishal@gmail.com",
        password: "aaaaaaaa",
      },
    },
    {
      id: 3,
      title: "User Login",
      desc: "Login with user",
      image: "/assets/auth/user login.jpg",
      credentials: {
        number: "demouser@gmail.com",
        password: "aaaaaaaa",
      },
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-gradient-to-br from-slate-50 to-green-50">
      {/* Left side - Illustration and branding */}
      <div className="hidden md:flex md:w-1/2 bg-white p-8 flex-col justify-center items-center relative overflow-hidden animate-slide-in-left">
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
            <Link href="/">
              <ArrowLeft className="w-6 h-6 text-green-500 group-hover:text-white transition-all duration-300" />
              <span>Back Home</span>
            </Link>
          </Button>
        </div>
        {/* Credential Section */}
        <div className="">
          <div className="relative w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center space-y-6 lg:mt-8"
            >
              {CarouselDetails.map((role, index) => (
                <motion.button
                  onClick={() => {
                    if (role.credentials) {
                      setValue("email", role.credentials.number);
                      setValue("password", role.credentials.password);
                    }
                  }}
                  key={role.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  // whileHover={{ scale: 1.05 }}
                  className="w-full bg-white rounded-xl p-3 lg:px-6 border border-gray-300 shadow-lg hover:shadow-xl hover:shadow-green-400 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  {/* <div className="flex flex-col items-center "> */}
                  <div className="w-full flex items-center gap-4">
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                      <Image
                        src={role.image}
                        alt={role.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="text-start">
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                        {role.title}
                      </h3>
                      <p className="text-sm text-gray-500">{role.desc}</p>
                    </div>
                  </div>

                  {/*  <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-gray-800/70 hover:bg-green-200 text-shadow-white px-2 py-1 lg:px-5 lg:py-2 rounded-md transition-colors duration-200 cursor-pointer"
                      onClick={() => {
                        if (role.credentials) {
                          setValue("email", role.credentials.number);
                          setValue("password", role.credentials.password);
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm lg:text-base">
                        Add Credentials
                      </span>
                    </motion.button> */}
                  {/* </div> */}

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    className="h-1 w-full bg-gradient-to-r from-green-300 to-green-500 mt-2 lg:mt-5 rounded-full"
                  />
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              animate={{
                x: [0, 10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -top-12 right-0"
            >
              <ArrowDownCircleIcon className="w-10 h-10 text-green-600" />
            </motion.div>
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
              Sign in to your account
            </h1>
            <p
              className="text-gray-500 "
              style={{ animationDelay: "0.3s" } as React.CSSProperties}
            >
              Enter your credentials below to access your account
            </p>
          </div>
          <div>
            <div className="md:hidden w-full mb-8">
              <div className="space-y-4">
                {CarouselDetails.map((role) => (
                  <motion.button
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => {
                      if (role.credentials) {
                        setValue("email", role.credentials.number);
                        setValue("password", role.credentials.password);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={role.image}
                          alt={role.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">
                          {role.title}
                        </h3>
                        <p className="text-sm text-gray-500">{role.desc}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-green-600">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 4V20M20 12L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                          <User className="h-5 w-5  " />
                        </div>
                        <Input
                          {...field}
                          placeholder="Enter your email"
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
                          className="pl-10 py-6 bg-white text-black border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                        />

                        <Button
                          type="button"
                          variant={"link"}
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 "
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

              <div
                className="flex justify-end "
                style={{ "--index": 3 } as React.CSSProperties}
              >
                <Link
                  href="/reset-password"
                  className="text-sm text-green-600 hover:text-green-800 font-medium transition-all duration-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                className="w-full py-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl  relative overflow-hidden cursor-pointer text-white "
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
                className="w-full py-6 border-gray-200 text-black dark:text-black bg-white hover:text-white hover:shadow-lg font-medium rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02]  group"
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

              <p className="text-center text-sm text-gray-500 mt-6 ">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-green-600 hover:text-green-800 font-medium transition-all duration-300 hover:underline"
                >
                  Create an account
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
