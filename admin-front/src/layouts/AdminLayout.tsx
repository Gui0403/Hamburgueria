import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <aside className="w-64 h-screen bg-zinc-950 text-white border-r border-zinc-800 p-6 flex flex-col">

                {/* Logo / Title */}
                <div className="mb-10">
                    <h1 className="text-2xl font-black tracking-tight">
                        Admin SaaS
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">
                        Painel de gerenciamento
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">

                    <a
                        href="/admin"
                        className="px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition font-medium"
                    >
                        📊 Dashboard
                    </a>

                    <a
                        href="/admin/create"
                        className="px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition font-medium"
                    >
                        🍔 Criar Burger
                    </a>

                </nav>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-zinc-800 text-xs text-zinc-600">
                    v1.0 • Hamburgueria SaaS
                </div>

            </aside>

            {/* Conteúdo */}
            <main className="flex-1 bg-black text-white p-10">
                <Outlet />
            </main>

        </div>
    );
}