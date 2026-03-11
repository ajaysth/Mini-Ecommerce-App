"use client"
import CatGrid from '@/components/categories/CatGrid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setError, setLoading } from '@/store/categorySlice';
import { RootState } from '@/store';

const CategoryPage = () => {

    const dispatch = useDispatch();

    const { items, loading } = useSelector((state: RootState) => state.categories)

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const res = await fetch('https://fakestoreapi.com/products/categories');
                const data = await res.json();

                dispatch(setCategories(data))
            } catch (err) {
                dispatch(setError("Failed to fetch categories"))
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchData();
    }, [dispatch])

    if (loading) return <p>Loading...</p>;



    return (
        <div className='flex flex-col justify-center gap-5 mt-6 mb-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Our Categories</h1>
            </div>
            <CatGrid categories={items} />
        </div>
    )
}

export default CategoryPage