'use client';

import {useRouter} from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="relative inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg
            hover:bg-blue-600 transition-colors font-semibold shadow-lg cursor-pointer"
        >
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10" version="1.1"
                 transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                      data-darkreader-inline-stroke=""></path>
            </svg>
            Volver atrás
        </button>
    );
}