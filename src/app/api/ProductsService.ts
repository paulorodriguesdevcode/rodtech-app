import Cookies from "js-cookie";
import { Product } from "../types/product";
import { logoff } from "../components/common/Logoff";

// Cria um novo produto
export async function createProduct(product: Omit<Product, "id">) {
    const token = Cookies.get("token");

    const response = await fetch(`${process.env.API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });

    return response;
}

// Lista todos os produtos
export async function listProducts() {
    const token = Cookies.get("token");

    const response = await (await fetch(`${process.env.API_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })).json();

    if (response?.statusCode === 401) {
        logoff();

        throw new Error("Sua sessão expirou, faça login novamente.");
    }

    return response;
}

// Deleta um produto pelo ID
export async function deleteProduct(id: string) {
    const token = Cookies.get("token");

    return await fetch(`${process.env.API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
}

// Envia um produto por e-mail
export async function sendProductByEmail(id: string | undefined, signature: string) {
    const token = Cookies.get("token");

    return await fetch(`${process.env.API_URL}/products/send/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ id, signature }),
    });
}
