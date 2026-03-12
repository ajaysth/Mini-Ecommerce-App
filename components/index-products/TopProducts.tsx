"use client"
import { getAllProducts } from '@/lib/api/product'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../../types/index'
import { setProducts } from '@/store/productsSlice'
import { RootState } from '@/store'
import ProductGrid from '../products/ProductGrid'
import { setLoading } from '@/store/categoryProductSlice'

const TopProducts = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state: RootState) => state.products)

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true))
                const data = await getAllProducts();
                const sorted = data.sort((a: Product, b: Product) => b.rating.rate - a.rating.rate)
                const top4 = sorted.slice(0, 4)
                dispatch(setProducts(top4))

            } catch (err) {
                console.error("Failed to fetch top products", err)
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchData()
    }, [dispatch])
    return (
        <div className='flex flex-col justify-center gap-6'>
            <div>
                <h1 className='text-center text-3xl font-bold'>Our TOP RATED products</h1>
            </div>
            <div>
                <ProductGrid products={products} loading={loading} limit={4} />
            </div>
        </div>
    )
}

export default TopProducts