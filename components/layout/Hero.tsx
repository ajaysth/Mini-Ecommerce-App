"use client";

import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative mt-6 w-full h-100">


            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center px-6 md:px-16">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                    Discover Your <span className="text-[var(--color-accent)]">Perfect</span> Style
                </h1>

                <p className="text-sm md:text-lg text-white/90 mb-6 max-w-xl text-center">
                    Shop the latest products at MinStore and get amazing deals delivered to your doorstep.
                </p>

                <Link
                    href="/products"
                    className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-md hover:opacity-90 transition font-semibold"
                >
                    Shop Now
                </Link>
            </div>

        </section>
    );
};

export default Hero;