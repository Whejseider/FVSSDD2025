export default function SkeletonCard() {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md animate-pulse">
            <div className="w-full md:h-60 lg:h-60 h-80 bg-gray-700 rounded-t-lg"></div>
            <div className="p-4">
                <div className="h-6 w-3/4 mb-2 bg-gray-700 rounded"></div>
                <div className="h-4 w-1/4 mb-4 bg-gray-700 rounded"></div>
                <div className="h-4 w-full mb-2 bg-gray-700 rounded"></div>
                <div className="flex gap-2 justify-center mt-4">
                    <div className="h-6 w-1/3 bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-1/3 bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}