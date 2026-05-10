import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { api } from "../../../services/api";
import { getImageUrl } from "../../../utils/getImageUrl";

export default function EditBurger() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [image, setImage] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    async function loadBurger() {
        try {
            const response =
                await api.get(
                    `/burgers/${id}`
                );

            const burger =
                response.data;

            setName(burger.name);
            setDescription(
                burger.description
            );
            setPrice(burger.price);

            setPreview(
                getImageUrl(
                    burger.image
                )
            );

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadBurger();
    }, [id]);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            const formData =
                new FormData();

            formData.append(
                "name",
                name
            );

            formData.append(
                "description",
                description
            );

            formData.append(
                "price",
                String(price)
            );

            // só envia se trocou imagem
            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            await api.post(
                `/burgers/${id}?_method=PUT`,
                formData
            );

            navigate("/admin");

        } catch (error: any) {
            console.log(
                error?.response?.data || error
            );
        }
    }

    return (
        <section className="
            max-w-3xl
            mx-auto
            px-6
            py-16
        ">

            <h1 className="
                text-5xl
                font-black
                mb-10
            ">
                Editar Burger
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <input
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        bg-zinc-900
                        border
                        border-zinc-800
                        rounded-xl
                        p-4
                    "
                />

                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        bg-zinc-900
                        border
                        border-zinc-800
                        rounded-xl
                        p-4
                        h-40
                    "
                />

                <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                        setPrice(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        bg-zinc-900
                        border
                        border-zinc-800
                        rounded-xl
                        p-4
                    "
                />

                {/* imagem atual */}
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="
                            w-full
                            h-64
                            object-cover
                            rounded-xl
                        "
                    />
                )}

                {/* nova imagem */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file =
                            e.target.files?.[0];

                        if (file) {
                            setImage(file);

                            setPreview(
                                URL.createObjectURL(
                                    file
                                )
                            );
                        }
                    }}
                    className="
                        w-full
                        p-4
                        bg-zinc-950
                        rounded-xl
                    "
                />

                <button
                    type="submit"
                    className="
                        bg-yellow-500
                        text-black
                        px-8
                        py-4
                        rounded-xl
                        font-black
                    "
                >
                    Salvar
                </button>

            </form>

        </section>
    );
}