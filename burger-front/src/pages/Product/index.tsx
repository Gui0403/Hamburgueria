import { useEffect, useState } from "react";

import {
    useParams,
} from "react-router-dom";

import { api } from "../../services/api";

import { useCartStore } from "../../store/cartStore";

import type { Burger } from "../../types/Burger";
import { getImageUrl } from "../../utils/image";

export default function Product() {
    const { id } = useParams();

    const [burger, setBurger] =
        useState<Burger | null>(null);

    const [loading, setLoading] =
        useState(true);

    const addToCart = useCartStore(
        (state) => state.addToCart
    );

    useEffect(() => {

        async function loadBurger() {

            try {

                const response =
                    await api.get(
                        `/burgers/${id}`
                    );

                setBurger(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        }

        loadBurger();

    }, [id]);

    if (loading) {
        return (
            <div className="
                min-h-[70vh]
                flex
                items-center
                justify-center
                text-2xl
                font-bold
            ">
                Carregando burger...
            </div>
        );
    }

    if (!burger) {
        return (
            <div className="
                min-h-[70vh]
                flex
                items-center
                justify-center
            ">
                <div className="text-center">

                    <h2 className="
                        text-5xl
                        font-black
                    ">
                        Burger não encontrado
                    </h2>

                    <p className="
                        text-zinc-400
                        mt-4
                    ">
                        Esse produto não existe.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <section className="
            max-w-7xl
            mx-auto
            px-6
            py-16
        ">

            <div className="
                grid
                md:grid-cols-2
                gap-14
                items-center
            ">

                <div
                    className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-zinc-800
                    "
                >

                    <img
                        src={getImageUrl(burger.image)}
                        alt={burger.name}
                        className="
                            w-full
                            h-[550px]
                            object-cover
                            hover:scale-105
                            transition
                            duration-500
                        "
                    />

                </div>

                <div>

                    <span className="
                        text-yellow-500
                        font-bold
                        uppercase
                        tracking-widest
                    ">
                        Burger Artesanal
                    </span>

                    <h1 className="
                        text-6xl
                        font-black
                        mt-4
                    ">
                        {burger.name}
                    </h1>

                    <p className="
                        text-zinc-400
                        text-xl
                        mt-8
                        leading-relaxed
                    ">
                        {burger.description}
                    </p>

                    <div className="
                        mt-10
                        flex
                        items-center
                        gap-4
                    ">

                        <strong className="
                            text-5xl
                            text-yellow-400
                            font-black
                        ">
                            R$ {burger.price}
                        </strong>

                    </div>

                    <button
                        onClick={() =>
                            addToCart(burger)
                        }
                        className="
                            mt-12
                            bg-yellow-500
                            text-black
                            px-10
                            py-5
                            rounded-2xl
                            font-black
                            text-xl
                            hover:scale-105
                            transition
                        "
                    >
                        Adicionar ao Carrinho
                    </button>

                </div>

            </div>

        </section>
    );
}