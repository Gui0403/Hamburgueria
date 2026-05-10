import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
                        A MELHOR HAMBURGUERIA 🍔
                    </span>

                    <h1 className="text-7xl font-black leading-none mt-8">
                        Smash burgers
                        <br />
                        absurdamente
                        <br />
                        saborosos.
                    </h1>

                    <p className="text-zinc-400 text-xl mt-8 max-w-xl">
                        Hambúrguer artesanal, ingredientes premium
                        e entrega rápida.
                    </p>

                    <div className="flex gap-4 mt-10">
                        <Link
                            to="/menu"
                            className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
                        >
                            Ver Cardápio
                        </Link>

                        <button className="border border-zinc-700 px-8 py-4 rounded-xl hover:bg-zinc-900 transition">
                            Fazer Pedido
                        </button>
                    </div>
                </div>

                <div>
                    <img
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
                        alt="Burger"
                        className="rounded-3xl shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
}