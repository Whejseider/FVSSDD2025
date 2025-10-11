'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavBar() {
    const pathname: string = usePathname();

    return (
        <nav
            className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
            style={{backgroundColor: '#232323'}}>
            <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/favicon.ico" className="h-8" alt="Snorlax Logo"/>
                </Link>
                <div className="items-center justify-between hidden md:flex md:w-auto md:order-1 md:ml-8"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg
                                   bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0
                                   md:border-0 md:bg-transparent dark:bg-gray-800
                                   md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link
                                href="/"
                                className={`block py-2 px-3 rounded-md transition-colors 
                                   ${pathname === "/"
                                    ? "bg-blue-800 text-white"
                                    : "text-gray-300 hover:bg-gray-600 hover:text-white"}`}>
                                Inicio
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
