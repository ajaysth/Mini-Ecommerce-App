"use client";

import ProductCard from "./ProductCard";
import { Product } from "../../types";

const ProductGrid = ({ products, loading, error, limit }: { products: Product[], loading?: boolean, error?: string, limit?: number }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
            )}

        </div>
    );
};

export default ProductGrid;