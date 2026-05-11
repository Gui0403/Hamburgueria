import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

import type { FormEvent } from "react";

export default function CreateBurger() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: null as File | null,
    });

    async function handleSubmit(
        e: FormEvent
    ) {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append(
                "description",
                form.description
            );

            formData.append(
                "price",
                String(form.price)
            );

            if (form.image) {
                formData.append(
                    "image",
                    form.image
                );
            }

            await api.post("/burgers", formData);

            // opcional: limpar form antes de sair
            setForm({
                name: "",
                description: "",
                price: "",
                image: null,
            });

            navigate("/admin");

        } catch (error: any) {
            console.log(
                error?.response?.data || error
            );
        }
    }

    return (
        <section className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-black
            text-white
        ">

            <form
                onSubmit={handleSubmit}
                className="
                    bg-zinc-900
                    p-10
                    rounded-3xl
                    w-full
                    max-w-xl
                    space-y-6
                "
            >

                <h1 className="text-4xl font-black">
                    Novo Burger
                </h1>

                <input
                    placeholder="Nome"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                    className="
                        w-full
                        p-4
                        bg-zinc-950
                        rounded-xl
                    "
                />

                <textarea
                    placeholder="Descrição"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description:
                                e.target.value,
                        })
                    }
                    className="
                        w-full
                        p-4
                        bg-zinc-950
                        rounded-xl
                    "
                />

                <input
                    placeholder="Preço"
                    value={form.price}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            price: e.target.value,
                        })
                    }
                    className="
                        w-full
                        p-4
                        bg-zinc-950
                        rounded-xl
                    "
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            image:
                                e.target.files?.[0] ??
                                null,
                        })
                    }
                    className="
                        w-full
                        p-4
                        bg-zinc-950
                        rounded-xl
                    "
                />

                <button
                    type="submit"
                    className="
                        w-full
                        bg-yellow-500
                        text-black
                        py-4
                        rounded-xl
                        font-black
                    "
                >
                    Criar Burger
                </button>

            </form>

        </section>
    );
}