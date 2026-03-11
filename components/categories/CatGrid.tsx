import CatCard from "./CatCard";

interface CatGridProps {
    categories: string[];
}

const CatGrid = ({ categories }: CatGridProps) => {
    return (
        <div className="grid grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {categories.map((cat) => (
                <CatCard key={cat} category={cat} />
            ))}
        </div>
    )
}

export default CatGrid