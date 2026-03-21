"use client"
import ProductGrid from "@/components/products/ProductGrid"
import { useMemo, useState } from "react"
import { Product } from "../../types/index"

const ProductMain = ({ products }: { products: Product[] }) => {

    const [selectedCategory, setSelectedCategory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)

    const productsPerPage = 8

    const categories = [
        "all",
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
    ]

    // Filter products
    const filteredProducts = useMemo(() => {
        return selectedCategory === "all"
            ? products
            : products.filter((p) => p.category === selectedCategory)
    }, [products, selectedCategory])
    // Pagination
    const currentProducts = useMemo(() => {
        const indexOfLastProduct = currentPage * productsPerPage
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage
        return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    }, [filteredProducts, currentPage])

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    )

    return (
        <div className="flex flex-col gap-6 mt-6 mb-8">

            <h1 className="text-center text-3xl font-bold">
                Our Products
            </h1>

            <div className="grid grid-cols-4 gap-6">

                {/* Sidebar */}
                <div className="col-span-1 border p-4 rounded-lg">

                    <h2 className="font-bold mb-4">
                        Filter by Category
                    </h2>

                    <ul className="flex flex-col gap-3">

                        {categories.map((category) => (
                            <li
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category)
                                    setCurrentPage(1)
                                }}
                                className={`cursor-pointer capitalize hover:text-blue-500
                ${selectedCategory === category
                                        ? "text-blue-500 font-semibold"
                                        : ""
                                    }`}
                            >
                                {category}
                            </li>
                        ))}

                    </ul>

                </div>


                <div className="col-span-3">

                    <ProductGrid products={currentProducts} />

                    {/* pagination */}
                    <div className="flex justify-center gap-3 mt-6">

                        {Array.from({ length: totalPages }).map((_, i) => {

                            const page = i + 1

                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 border rounded active:scale-90 cursor-pointer
                  ${currentPage === page
                                            ? "bg-black text-white"
                                            : ""
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        })}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductMain