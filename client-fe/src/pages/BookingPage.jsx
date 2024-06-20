import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";

import BookingDates from "../BookingDates";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id])

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <Link to={'/place/' + booking.place._id} className="text-3xl">{booking.place.title}</Link>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information</h2>
                    <BookingDates booking={booking} className={'mb-2 mt-2 text-gray-600'} />

                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total price:</div>
                    <div className="text-2xl">${booking.pricePerNight}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}