import {
    useEffect,
    useState,
} from "react";

import BurgerCard from "../../components/burger/BurgerCard";

import { api } from "../../services/api";

import type { Burger } from "../../types/Burger";
import { LoadingScreen } from "../../utils/LoadingScreen";

export default function Menu() {
    const [burgers, setBurgers] =
        useState<Burger[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        async function loadBurgers() {
            try {
                setError(null);

                const response =
                    await api.get("/burgers");

                console.log(response.data);
                setBurgers(response.data);

            } catch (err) {
                console.log(err);

                setError(
                    "Erro ao carregar burgers"
                );

            } finally {
                setLoading(false);
            }
        }

        loadBurgers();
    }, []);

    if (loading) {
        return (
            LoadingScreen()
        );
    }
    
    if (error) {
        return (
            <div className="
            min-h-[60vh]
            flex
            items-center
            justify-center
            text-red-500
            font-bold
            ">
                {error}
            </div>
        );
    }
    
    if (burgers.length === 0) {
        return (
            <div className="
            min-h-[60vh]
            flex
            items-center
            justify-center
            text-center
            ">
                <div>
                    <h2 className="
                        text-4xl
                        font-black
                        ">
                        Nenhum burger cadastrado
                    </h2>

                    <p className="
                        text-zinc-400
                        mt-4
                        ">
                        Cadastre no painel admin
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

            <div className="mb-14">
                <h1 className="
                    text-6xl
                    font-black
                ">
                    Cardápio
                </h1>

                <p className="
                    text-zinc-400
                    mt-4
                ">
                    Escolha seu burger favorito
                </p>
            </div>

            <div className="
                grid
                md:grid-cols-3
                gap-8
            ">
                {burgers.map((burger) => (
                    <BurgerCard
                        key={burger.id}
                        burger={burger}
                    />
                ))}
            </div>

        </section>
    );
}