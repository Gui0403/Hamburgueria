import toast from "react-hot-toast";


import { useCartStore } from "../../store/cartStore";
import type { Burger } from "../../types/Burger";
import { getImageUrl } from "../../utils/image";

interface Props {
    burger: Burger;
}

export default function BurgerCard({
    burger,
}: Props) {
    const addToCart = useCartStore(
        (state) => state.addToCart
    );

    function handleAdd() {
        addToCart(burger);

        toast.success("Adicionado ao carrinho");
    }

    return (
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 transition">
            <img
                src={getImageUrl(burger.image)}
                alt={burger.name}
                className="
                w-full
                h-[250px]
                object-cover
                hover:scale-105
                transition
                duration-500
            "
            />

            <div className="p-6">
                <h2 className="text-2xl font-black">
                    {burger.name}
                </h2>

                <p className="text-zinc-400 mt-3">
                    {burger.description}
                </p>

                <div className="flex justify-between items-center mt-6">
                    <strong className="text-2xl text-yellow-400">
                        R$ {burger.price}
                    </strong>

                    <button
                        onClick={handleAdd}
                        className="bg-yellow-500 text-black px-5 py-3 rounded-xl font-bold hover:scale-105 transition"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}