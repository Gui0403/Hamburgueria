import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { api } from "@/services/api";

interface Burger {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function Dashboard() {
    const [burgers, setBurgers] =
        useState<Burger[]>([]);

    async function loadBurgers() {
        const response =
            await api.get("/burgers");

        setBurgers(response.data);
    }

    async function handleDelete(
        id: number
    ) {
        await api.delete(`/burgers/${id}`);

        loadBurgers();
    }

    useEffect(() => {
        loadBurgers();
    }, []);

    return (
        <section className="min-h-screen p-10 bg-black text-white">

            <div className="flex items-center justify-between mb-10">
                <h1 className="text-5xl font-black">
                    Dashboard
                </h1>

                <Link
                    to="/admin/create"
                    className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
                >
                    Novo Burger
                </Link>
            </div>

            <div className="grid gap-6">
                {burgers.map((burger) => (
                    <div
                        key={burger.id}
                        className="bg-zinc-900 p-6 rounded-2xl flex items-center justify-between"
                    >
                        <div>
                            <h2 className="text-2xl font-bold">
                                {burger.name}
                            </h2>

                            <p className="text-zinc-400">
                                {burger.description}
                            </p>

                            <strong>
                                R$ {burger.price}
                            </strong>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to={`/admin/edit/${burger.id}`}
                                className="bg-blue-500 px-4 py-2 rounded-xl"
                            >
                                Editar
                            </Link>

                            <button
                                onClick={() =>
                                    handleDelete(burger.id)
                                }
                                className="bg-red-500 px-4 py-2 rounded-xl"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}