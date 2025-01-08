"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (isSignUp) {
        // Check if passwords match for signup
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        // Create new user
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Signup successful:", result.user.email);

        // Send verification email
        await sendEmailVerification(result.user);
        setMessage(
          "Verification email sent! Please check your inbox and verify your email before signing in."
        );

        // Clear form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsSignUp(false);
      } else {
        // Sign in
        const result = await signInWithEmailAndPassword(auth, email, password);

        // Check if email is verified
        if (!result.user.emailVerified) {
          setError(
            "Please verify your email before signing in. Check your inbox for the verification link."
          );
          // Option to resend verification email
          await sendEmailVerification(result.user);
          setMessage("A new verification email has been sent.");
          return;
        }

        console.log("Signin successful:", result.user.email);
        router.push("/tools/reels/generate");
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      // setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google signin successful:", result.user.email);
      router.push("/tools/reels/generate");
    } catch (error) {
      setError("Failed to sign in with Google");
      console.error(error);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setMessage("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
        >
          <span>Continue with Google</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleEmailAuth} className="mt-8 space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleAuthMode}
            className="text-blue-600 hover:text-blue-500"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
