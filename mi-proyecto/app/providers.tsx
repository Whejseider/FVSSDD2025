// app/providers.tsx
'use client'

import {HeroUIProvider, ToastProvider} from '@heroui/react'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider locale="es-ES">
            <ToastProvider
                placement="top-right"
                toastOffset={80}
            />
                {children}
        </HeroUIProvider>
    )
}