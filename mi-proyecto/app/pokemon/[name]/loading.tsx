export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-4 max-w-3xl">
            <div className="animate-pulse">

                {/* Boton volver */}
                <div className="h-10 w-24 bg-slate-300 rounded-lg mb-6" />

                <div className="rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="p-6 md:p-8 bg-slate-300">
                        <div className="h-9 w-3/5 bg-slate-400 rounded mb-2" />
                        <div className="h-6 w-1/4 bg-slate-400 rounded mb-2" />
                        <div className="h-5 w-2/5 bg-slate-400 rounded" />
                    </div>

                    {/* Contenido principal */}
                    <div className="bg-white p-4 md:p-6 lg:p-8">

                        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
                            {/* Imagen */}
                            <div className="flex items-center justify-center">
                                <div className="w-full max-w-sm h-auto aspect-square bg-slate-300 rounded-lg"/>
                            </div>

                            {/* Info */}
                            <div className="space-y-8">
                                <div>
                                    <div className="h-7 w-1/2 bg-slate-300 rounded mb-4" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-300 rounded" />
                                        <div className="h-4 bg-slate-300 rounded w-5/6" />
                                        <div className="h-4 bg-slate-300 rounded w-4/6" />
                                    </div>
                                </div>

                                <div>
                                    <div className="h-7 w-1/3 bg-slate-300 rounded mb-3" />
                                    <div className="space-y-2">
                                        <div className="h-5 w-3/4 bg-slate-300 rounded" />
                                        <div className="h-5 w-3/4 bg-slate-300 rounded" />
                                        <div className="h-5 w-full bg-slate-300 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seccion inferior */}
                        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                            <div>
                                <div className="h-7 w-1/2 bg-slate-300 rounded mb-3" />
                                <div className="space-y-3">
                                    <div className="h-5 w-3/4 bg-slate-300 rounded" />
                                    <div className="h-5 w-1/2 bg-slate-300 rounded" />
                                </div>
                            </div>

                            <div>
                                <div className="h-7 w-1/3 bg-slate-300 rounded mb-3" />
                                <div className="space-y-3">
                                    {/* Estadisticas */}
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between mb-1">
                                                <div className="h-4 w-1/3 bg-slate-300 rounded" />
                                                <div className="h-4 w-8 bg-slate-300 rounded" />
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                                <div className="bg-slate-300 h-2.5 rounded-full" style={{ width: '50%' }}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}