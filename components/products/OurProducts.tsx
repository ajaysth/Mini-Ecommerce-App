import Link from 'next/link';
import ProductGrid from './ProductGrid';

const OurProducts = () => {

    return (
        <div className=" flex flex-col gap-6 justify-center items-center mt-10 mb-10">
            <div className="w-full flex justify-between items-center ">
                <h2 className="text-2xl md:text-3xl font-bold">
                    Our Products
                </h2>


            </div>

            <ProductGrid limit={8} />

            <Link
                href="/products"
                className="border shadow-md rounded-full px-2 py-1 transition"
            >
                View All
            </Link>
        </div>
    )
}

export default OurProducts