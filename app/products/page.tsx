"use client"
import { RootState } from "@/store"
import { getAllProducts } from "@/lib/api/product"
import { setLoading } from "@/store/productsSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "@/store/productsSlice"
import ProductMain from "@/components/main-products/ProductMain"



const Page = () => {
    const dispatch = useDispatch()

    const { items: products, loading, error } = useSelector((state: RootState) => state.products)

    useEffect(() => {
        const fetchData = async () => {
            try {

                dispatch(setLoading(true))
                const data = await getAllProducts()
                dispatch(setProducts(data))

            }
            catch (err) {
                console.error("Failed to fetch products", err)
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchData()
    }, [dispatch])





    return (
        <div>
            <ProductMain products={products} />
        </div>
    )
}

export default Page