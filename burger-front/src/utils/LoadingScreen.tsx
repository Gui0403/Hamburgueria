export function LoadingScreen() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="text-center">

                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-zinc-700 border-t-yellow-500 rounded-full animate-spin mx-auto"></div>

                <p className="mt-4 text-zinc-400 font-medium">
                    Carregando painel...
                </p>

            </div>
        </div>
    );
}