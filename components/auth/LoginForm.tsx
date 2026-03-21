"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/lib/api/auth";
import { loginSuccess } from "@/store/authSlice";

export default function LoginForm() {
    // Pre-filling with Fakestore API's test user
    const [username, setUsername] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await loginAPI({ username, password });

            // 1. Save to Client Redux State
            dispatch(loginSuccess(res.token));

            // 2. Save as Cookie so Next.js Middleware can see it server-side!
            document.cookie = `token=${res.token}; path=/; max-age=86400`; // expires in 1 day

            // 3. Take them to the homepage
            router.push("/");

        } catch (err: any) {
            setError(err.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Welcome Back</h2>
            {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 disabled:bg-gray-400 transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
