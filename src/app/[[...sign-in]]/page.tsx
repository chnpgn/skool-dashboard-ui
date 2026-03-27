"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role;

    if (isSignedIn && role) {
      router.replace(`/${role}`);
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-linear-to-br from-sky-100 via-white to-indigo-100">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 p-16">
        <div className="max-w-lg space-y-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={42} height={42} />
            <h1 className="text-3xl font-bold text-gray-800">Skool Next</h1>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Smart School <br /> Management Platform
          </h2>

          <p className="text-gray-600 text-lg">
            Manage students, teachers, exams, attendance and communication in
            one unified platform designed for modern schools.
          </p>

          <div className="flex gap-6 pt-4 text-sm text-gray-500">
            <div>✔ Student Management</div>
            <div>✔ Attendance Tracking</div>
            <div>✔ Academic Reports</div>
          </div>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="flex flex-1 items-center justify-center p-6">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="w-full max-w-md backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl rounded-2xl p-10 space-y-6"
          >
            {/* HEADER */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>

              <p className="text-sm text-gray-500">Sign in to your account</p>
            </div>

            <Clerk.GlobalError className="text-sm text-red-500 text-center" />

            {/* USERNAME */}
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-medium text-gray-600">
                Email or Username
              </Clerk.Label>

              <Clerk.Input
                required
                className="h-11 px-3 rounded-md border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              />

              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            {/* PASSWORD */}
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-medium text-gray-600">
                Password
              </Clerk.Label>

              <div className="relative">
                <Clerk.Input
                  type={showPassword ? "text" : "password"}
                  required
                  className="h-11 w-full px-3 rounded-md border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-sky-600" />
                Remember me
              </label>

              <SignIn.Action
                navigate="forgot-password"
                className="text-sky-600 hover:underline"
              >
                Forgot password?
              </SignIn.Action>
            </div>

            {/* SIGN IN BUTTON */}
            <SignIn.Action
              submit
              className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-semibold transition"
            >
              Sign In
            </SignIn.Action>

            {/* FOOTER */}
            <p className="text-xs text-center text-gray-400">
              © {new Date().getFullYear()} Skool Next
            </p>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginPage;
