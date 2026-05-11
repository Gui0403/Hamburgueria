import { persist } from "zustand/middleware";
import { create } from "zustand";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthStore {
    user: User | null;

    token: string | null;

    login: (
        user: User,
        token: string
    ) => void;

    logout: () => void;
}

export const useAuthStore =
    create<AuthStore>()(
        persist(
            (set) => ({
                user: null,

                token: null,

                login: (user, token) =>
                    set({
                        user,
                        token,
                    }),

                logout: () =>
                    set({
                        user: null,
                        token: null,
                    }),
            }),
            {
                name: "burger-auth",
            }
        )
    );