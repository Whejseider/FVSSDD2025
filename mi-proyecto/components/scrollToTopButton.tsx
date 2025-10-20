'use client'

import {useState, useEffect} from 'react'

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        isVisible &&
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className={`
            !fixed cursor-pointer bottom-5 end-5 rounded-full bg-blue-500 p-3 text-xs font-medium uppercase leading-tight
             text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-lg
             focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
             ${isVisible ? "opacity-100" : "opacity-0"}
             `}
            id="btn-back-to-top">
                    <span className="[&>svg]:w-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"/>
                        </svg>
                    </span>
        </button>
    )
}