import {
    Link,
} from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";

import { useCartStore } from "../../store/cartStore";

export default function Navbar() {
    const items = useCartStore(
        (state) => state.items
    );

    const totalItems =
        items.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-3xl font-black tracking-tight"
                >
                    BURGER.
                </Link>

                <nav className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="hover:text-yellow-400 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/menu"
                        className="hover:text-yellow-400 transition"
                    >
                        Cardápio
                    </Link>

                    <Link
                        to="/cart"
                        className="relative"
                    >
                        <FaShoppingCart size={24} />

                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}