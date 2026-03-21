import { getAllProducts } from "@/lib/api/product";
import ProductMain from "@/components/main-products/ProductMain";

// No "use client" here! This runs entirely on the server
export default async function Page() {
    const products = await getAllProducts();

    return (
        <div>
            <ProductMain products={products} />
        </div>
    );
}
