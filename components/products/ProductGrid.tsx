"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setProducts, setLoading, setError } from "../../store/productsSlice";
import { getAllProducts } from "../../lib/api/product";
import ProductCard from "./ProductCard";
import { Product } from '../../types/index';

const ProductGrid = ({ limit }: { limit?: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: products, loading } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            const fetchData = async () => {
                try {
                    dispatch(setLoading(true));
                    const data = await getAllProducts();
                    dispatch(setProducts(data));
                } catch (err) {
                    dispatch(setError("Failed to fetch products"));
                } finally {
                    dispatch(setLoading(false));
                }
            };
            fetchData();
        }
    }, [dispatch, products.length]);

    if (loading) return <p>Loading...</p>;

    const displayedProducts = limit ? products.slice(0, limit) : products;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {displayedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;