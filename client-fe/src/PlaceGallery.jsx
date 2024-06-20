import { useState } from "react"

export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className=" bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of: {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)}
                            className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && (
                        place.photos.map(photo => (
                            <img src={'http://localhost:4000/uploads/' + photo} alt="" />
                        ))
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <img onClick={() => setShowAllPhotos(true)} className="object-cover aspect-square cursor-pointer" src={'http://localhost:4000/uploads/' + place.photos[0]} />

                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/' + place.photos[1]} />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover relative top-2 cursor-pointer" src={'http://localhost:4000/uploads/' + place.photos[2]} />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex  gap-1 absolute bottom-2 right-2 py-2 px-4 rounded-2xl bg-white shadow shadow-md shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Show more photos
            </button>
        </div>
    )
}