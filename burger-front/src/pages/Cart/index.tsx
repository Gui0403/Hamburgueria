import { useCartStore } from "../../store/cartStore";
import { getImageUrl } from "../../utils/image";
import { useCartActions } from "./useCartActions";


export default function Cart() {
    const { handleCancel, handleFinalize } = useCartActions();
    const items = useCartStore((state) => state.items) ?? [];

    const total = items.reduce((acc, item) => {
        const price = Number(item?.price ?? 0);
        const qty = Number(item?.quantity ?? 0);
        return acc + price * qty;
    }, 0);


    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-center">
                <div>
                    <h2 className="text-4xl font-black">
                        Seu carrinho está vazio
                    </h2>
                    <p className="text-zinc-400 mt-3">
                        Adicione alguns burgers deliciosos 🍔
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto px-6 py-16">

            <h1 className="text-6xl font-black mb-10">
                Carrinho
            </h1>

            <div className="space-y-6">

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between hover:border-zinc-700 transition"
                    >

                        {/* LEFT */}
                        <div className="flex items-center gap-6">

                            <img
                                src={getImageUrl(item.image)}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-xl border border-zinc-800"
                            />

                            <div>
                                <h2 className="text-xl font-bold">
                                    {item.name}
                                </h2>

                                <p className="text-zinc-400 mt-1">
                                    Quantidade:{" "}
                                    <span className="text-white font-semibold">
                                        {item.quantity}
                                    </span>
                                </p>

                                <p className="text-zinc-500 text-sm mt-1">
                                    Unitário: R$ {item.price}
                                </p>
                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="text-right">
                            <strong className="text-yellow-400 text-2xl font-black">
                                R$ {(item.price * item.quantity).toFixed(2)}
                            </strong>
                        </div>

                    </div>
                ))}

            </div>

            {/* SUMMARY */}
            <div className="mt-10 bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

                <div className="flex justify-between text-3xl font-black">
                    <span>Total</span>
                    <span className="text-yellow-400">
                        R$ {total.toFixed(2)}
                    </span>
                </div>

                <div className="mt-8 space-y-4">

                    <button onClick={handleFinalize} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-black text-xl transition">
                        Finalizar Pedido
                    </button>

                    <button onClick={handleCancel} className="w-full bg-zinc-800 hover:bg-red-500 text-white py-4 rounded-xl font-bold text-lg transition">
                        Cancelar Pedido
                    </button>

                </div>

            </div>

        </section>
    );
}