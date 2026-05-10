export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-center">
            <div>
                <h1 className="text-6xl font-black">404</h1>
                <p className="text-zinc-400 mt-4">
                    Página não encontrada
                </p>

                <a
                    href="/"
                    className="inline-block mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
                >
                    Voltar ao início
                </a>
            </div>
        </div>
    );
}