import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { api } from "../services/api";
import { LoadingScreen } from "../utils/LoadingScreen";


export default function AdminLayout() {
    const location = useLocation();
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
            {/* 1. SIDEBAR: Garanta que o código da Sidebar esteja aqui fora das condicionais */}
            <aside className="w-64 border-r border-zinc-800 p-6">
                <nav className="space-y-4">
                    <a href="/admin" className="block text-yellow-500">Dashboard</a>
                    <a href="/admin/create" className="block text-zinc-400">Criar Burger</a>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                <Suspense fallback={<LoadingScreen />}>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        /* 2. SEMPRE RENDERIZE O OUTLET */
                        /* A lógica de "Nenhum hambúrguer" deve estar DENTRO do componente Dashboard, e não aqui no Layout */
                        <Outlet context={{ burgers }} /> 
                    )}
                </Suspense>
            </main>
        </div>
    );
}
