import Link from 'next/link'

import Image from 'next/image'
const categoryImages: Record<string, string> = {
    electronics: "/images/electronics.jpg",
    jewelery: "/images/jewel.jpg",
    "men's clothing": "/images/mens_clothing.jpg",
    "women's clothing": "/images/womens_clothing.jpg",
};

interface CatCardProps {
    category: string;
}
const CatCard = ({ category }: CatCardProps) => {
    const imageSrc = categoryImages[category];

    return (
        <Link href={`/categories/${category}`}>
            <div className="group relative h-80 rounded-2xl active:scale-85 overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <Image
                    src={imageSrc}
                    alt={category}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-xl font-bold capitalize tracking-wide">
                        {category}
                    </h2>
                </div>

            </div>
        </Link>
    )
}

export default CatCard