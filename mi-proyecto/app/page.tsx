'use client';

import useSWR from "swr";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Page() {
    const {data, error, isLoading} = useSWR(
        '/api/steam',
        fetcher,
    );
    if (isLoading) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="flex justify-center flex-col m-auto h-screen bg-stone-950">
            <h2 className="text-2xl font-bold text-center mb-8"> Juegos Destacados STEAM</h2>
            <div className="max-w-3xl mx-auto">
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={4000}
                    showStatus={false}
                    centerMode={true}
                >
                    {data.featured_win.map((game: { id: string; name: string; large_capsule_image: string }) => (
                        <div key={game.id}>
                            <img
                                src={game.large_capsule_image}
                                alt={game.name}
                                className="rounded-xl"
                                style={{
                                    maxWidth: "616px",
                                    maxHeight: "400px"
                                }}
                            />
                            <p className="legend">{game.name}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>

    );
}
