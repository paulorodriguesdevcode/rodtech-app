import * as XLSX from "xlsx";
import { Product } from "../types/product";
import { toast } from "react-toastify";

export async function exportProductsToExcel(products: Product[]) {
    try {
        const data = products.map(product => ({
            Name: product.name,
            Description: product.description,
            Quantity: product.quantity,
            PurchaseValue: product.purchaseValue,
            SaleValue: product.saleValue,
            PurchaseDate: new Date(product.purchaseDate).toLocaleDateString(), // Formata a data de compra
        }));

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");

        const wbout: ArrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const blob = new Blob([wbout], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "products.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        toast.error(`Error exporting products to Excel: ${JSON.stringify(error)}`);
    }
}
