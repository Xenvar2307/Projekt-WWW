import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/places/' + id).then(response => (
                setPlace(response.data)
            ));
        }
    }, [id]);

    if (!place) return '';

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="mb-4">
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check in: {place.checkIn} <br />
                    Check out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests}

                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="shadow border-t mt-4 bg-white -mx-8 px-8 py-8 rounded-2xl">
                <h2 className="font-semibold text-2xl">Extra information</h2>
                <div className="my-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>
        </div >
    );
}