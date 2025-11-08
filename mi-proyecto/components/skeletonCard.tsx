export default function SkeletonCard() {
    return (
        <div className="
        max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700
        flex flex-col items-center relative overflow-hidden animate-pulse
        ">
            {/* Imagen */}
            <div className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
            
            {/* Contenido */}
            <div className="w-full px-4 py-3 rounded-b-lg min-h-[180px] bg-gray-800 dark:bg-gray-900 flex flex-col items-center">
                {/* Título */}
                <div className="relative flex justify-center w-full py-3">
                    <div className="h-6 w-32 bg-gray-700 dark:bg-gray-600 rounded"></div>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 bg-gray-700 dark:bg-gray-600 rounded"></div>
                </div>
                
                {/* Número */}
                <div className="h-4 w-20 bg-gray-700 dark:bg-gray-600 rounded mb-2"></div>
                
                {/* Descripción */}
                <div className="h-4 w-48 bg-gray-700 dark:bg-gray-600 rounded mb-2"></div>
                
                {/* Stats */}
                <div className="h-4 w-40 bg-gray-700 dark:bg-gray-600 rounded mb-2"></div>
                
                {/* Tipos */}
                <div className="flex gap-2 justify-center mt-2">
                    <div className="h-6 w-20 bg-gray-700 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-700 dark:bg-gray-600 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}