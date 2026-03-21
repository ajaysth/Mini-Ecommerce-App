"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { AppDispatch, RootState } from "@/store";
import { setCategoryProducts } from "@/store/categoryProductSlice";
import { setLoading } from "@/store/productsSlice";
import { getCatProducts } from "@/lib/api/categoryProduct";
import { Product } from "@/types/index";
import CategoryProductCard from "./CategoryProductCard";
import Link from "next/link";

const CategoryProductGrid = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { name } = useParams();
    const categoryName = Array.isArray(name) ? name[0] : name;

    const { items: products, loading } = useSelector(
        (state: RootState) => state.categoryProducts
    );

    useEffect(() => {
        if (!categoryName) return;

        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const res: Product[] = await getCatProducts(categoryName);
                dispatch(setCategoryProducts(res));
            } catch (err) {
                console.error("Failed to fetch category products", err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch, name]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col gap-5 justify-center">
            <h1 className="text-lg">
                Products in:{" "}
                <span className="font-bold text-2xl capitalize">
                    {categoryName ? decodeURIComponent(categoryName) : ""}
                </span>
            </h1>            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                        <CategoryProductCard product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryProductGrid;