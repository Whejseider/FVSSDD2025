'use client';

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white shadow-sm w-full mt-auto"
                style={{backgroundColor: '#232323'}}>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/"
                          className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/favicon.ico" className="h-8" alt="Flowbite Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pokémon</span>
                    </Link>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link
                    href="https://github.com/Whejseider" target="_blank"
                    className="hover:underline">Franco Vallone</Link></span>
            </div>
        </footer>
    );
}