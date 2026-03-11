"use client";

import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
];
const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className=" shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

                {/* logo */}
                <Link href="/" className="text-xl font-bold text-(--color-secondary)">
                    Min<span className="text-black">Store</span>
                </Link>

                {/* nav links */}
                <div className="flex gap-6">
                    <nav className="flex gap-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative group transition ${isActive ? "text-black" : "text-black"
                                        }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute left-0 -bottom-0.5 h-0.5 bg-black transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                    ></span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* icons */}
                <div className="flex items-center gap-5">
                    <Link href="/search" className="relative   transition">
                        <IoSearch size={18} />
                    </Link>
                    <Link href="/cart" className="relative   transition">
                        <LuShoppingCart size={18} />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                            3
                        </span>
                    </Link>

                    <Link href="/wishlist" className="relative  transition">
                        <FaRegHeart size={18} />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                            3
                        </span>
                    </Link>

                    <Link href="/login">
                        <span className=" transition">
                            Login
                        </span>
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;