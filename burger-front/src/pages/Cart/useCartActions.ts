import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";

export function useCartActions() {
    const navigate = useNavigate();
    const clearCart = useCartStore((state) => state.clearCart);

    async function handleCancel() {
        const result = await Swal.fire({
            title: "Cancelar pedido?",
            text: "Seu carrinho será limpo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Voltar",
        });

        if (result.isConfirmed) {
            clearCart();
            toast.success("Pedido cancelado");
            navigate("/menu");
        }
    }

    async function handleFinalize() {
        clearCart();
        toast.success("Pedido finalizado!");
        navigate("/");
    }

    return {
        handleCancel,
        handleFinalize,
    };
}