import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useGSAP(() => {
        if (!isOpen) return;

        const tl = gsap.timeline();

        tl.from("#login-modal", {
            scale: 0.96,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
        })
            .from(".auth-header", {
                y: 155,
                opacity: 0.5,
                duration: 1,
                ease: "power3.out",
            }, "-=0.15")
            .from(".auth-tabs", {
                y: 10,
                opacity: 0,
                duration: 0.25,
                ease: "power2.out",
            })
            .from(".auth-field", {
                y: 14,
                opacity: 0,
                stagger: 0.08,
                duration: 1,
                ease: "power3.out",
                clearProps: "transform",
            }, "-=0.15")
            .to(".submit-btn", {
                opacity: 1,
                duration: 0.5,
                ease: "none",
            }, "-=0.25")
            .from("#footer", {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            }, "+=1");
    }, { dependencies: [isOpen] });


    useEffect(() => {
        if (!isOpen) return;

        gsap.killTweensOf(".auth-field");
        gsap.killTweensOf(".submit-btn");

        gsap.fromTo(
            ".auth-field",
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.out",
                clearProps: "transform",
            }
        );

        gsap.fromTo(
            ".submit-btn",
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.25,
                ease: "none",
            }
        );

        return () => {
            gsap.killTweensOf(".auth-field");
            gsap.killTweensOf(".submit-btn");
        };
    }, [mode]);




    if (!isOpen) return null;

    const validate = () => {
        if (!email.includes("@")) {
            setError("Please enter a valid email");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        if (mode === "signup" && password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            gsap.fromTo(
                "#login-modal",
                { x: -6 },
                { x: 6, duration: 0.06, repeat: 3, yoyo: true }
            );
            return;
        }

        gsap.to("#login-modal", {
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: onClose,
        });
    };

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            <div
                id="login-modal"
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl transition cursor-pointer"
                    >
                        ×
                    </button>

                    <div className="auth-header mb-6 text-center">
                        <h2 className="text-2xl font-bold">
                            {mode === "login" ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {mode === "login"
                                ? "Login to continue"
                                : "Sign up to get started"}
                        </p>
                    </div>

                    <div className="auth-tabs flex bg-gray-100 rounded-full p-1 mb-6">
                        <button
                            onClick={() => setMode("login")}
                            className={`flex-1 py-2 rounded-full text-sm font-medium transition cursor-pointer
                            ${mode === "login" ? "bg-white shadow" : "text-gray-500"}
                            `}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setMode("signup")}
                            className={`flex-1 py-2 rounded-full text-sm font-medium transition cursor-pointer
                            ${mode === "signup" ? "bg-white shadow" : "text-gray-500"}
                            `}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-field w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-field w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {mode === "signup" && (
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="auth-field w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="submit-btn opacity-0 w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-[background-color,transform]duration-200 text-white py-3 rounded-lg font-semibold cursor-pointer"
                        >
                            {mode === "login" ? "Login" : "Create account"}
                        </button>
                    </form>

                    <p
                        id="footer"
                        className="text-center text-xs text-gray-400 mt-6"
                    >
                        This is a demo modal for portfolio purposes only
                    </p>
                </div>
            </div>
        </>
    );
}
