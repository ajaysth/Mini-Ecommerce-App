import { getProductById } from "@/lib/api/product";
import ProductDetails from "@/components/products/ProductDetails";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await getProductById(id);

        if (!product) {
            notFound();
        }

        return (
            <div className="min-h-screen bg-white">
                <ProductDetails product={product} />
            </div>
        );
    } catch (error) {
        // If the product doesn't exist or API fails, trigger Next.js 404
        notFound();
    }
}