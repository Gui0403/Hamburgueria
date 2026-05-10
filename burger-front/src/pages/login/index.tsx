import { useState } from "react";

import {
    useNavigate,
} from "react-router-dom";

import { api } from "../../services/api";

import { useAuthStore } from "../../store/authStore";

export default function Login() {
    const navigate = useNavigate();

    const auth =
        useAuthStore();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    async function handleLogin(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            const response =
                await api.post("/login", {
                    email,
                    password,
                });

            auth.login(
                response.data.user,
                response.data.token
            );

            navigate("/admin");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-md space-y-6"
            >
                <h1 className="text-4xl font-black">
                    Login Admin
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full bg-zinc-950 p-4 rounded-xl"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    className="w-full bg-zinc-950 p-4 rounded-xl"
                />

                <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black">
                    Entrar
                </button>
            </form>
        </section>
    );
}