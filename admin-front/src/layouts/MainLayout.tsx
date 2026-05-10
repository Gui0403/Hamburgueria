import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { api } from "../services/api";

function LoadingScreen() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-zinc-700 border-t-yellow-500 rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-zinc-400">
                    Carregando painel...
                </p>
            </div>
        </div>
    );
}

export default function AdminLayout() {
    const location = useLocation();

    const isRootAdmin = location.pathname === "/admin";

    const [burgers, setBurgers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const response = await api.get("/burgers");
                setBurgers(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return (
        <div className="flex min-h-screen bg-black text-white">

            {/* Sidebar aqui */}

            <main className="flex-1 p-6">

                <Suspense fallback={<LoadingScreen />}>

                    {/* LOADING GLOBAL */}
                    {loading ? (
                        <LoadingScreen />

                    ) : burgers.length === 0 ? (

                        /* SEM HAMBURGUER */
                        <div className="h-full flex items-center justify-center text-center">
                            <div>
                                <h2 className="text-3xl font-black">
                                    Nenhum hambúrguer cadastrado
                                </h2>

                                <p className="text-zinc-400 mt-2">
                                    Vá em “Criar Burger” para começar seu cardápio
                                </p>
                            </div>
                        </div>

                    ) : isRootAdmin ? (

                        /* DASHBOARD HOME */
                        <div className="h-full flex items-center justify-center text-center">
                            <div>
                                <h2 className="text-3xl font-black">
                                    Bem-vindo ao Admin
                                </h2>

                                <p className="text-zinc-400 mt-2">
                                    Selecione uma opção no menu lateral
                                </p>
                            </div>
                        </div>

                    ) : (

                        /* ROTAS NORMAIS */
                        <Outlet />
                    )}

                </Suspense>

            </main>

        </div>
    );
}