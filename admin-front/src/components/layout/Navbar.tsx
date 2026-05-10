import {
    NavLink,
    Link,
} from "react-router-dom";


export default function Navbar() {

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

                {/* LOGO */}
                <Link
                    to="/"
                    className="text-3xl font-black tracking-tight"
                >
                    BURGER.
                </Link>

                {/* NAV */}
                <nav className="flex items-center gap-8">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400"
                                : "hover:text-yellow-400 transition"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400"
                                : "hover:text-yellow-400 transition"
                        }
                    >
                        Cardápio
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}