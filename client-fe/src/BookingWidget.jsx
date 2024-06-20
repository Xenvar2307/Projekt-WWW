import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from './UserContext.jsx'

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    let numberOfNights = 0;

    async function bookThisPlace() {

        const response = await axios.post('/bookings', {
            checkIn, checkOut,
            numberOfGuests, name, phone,
            place: place._id, pricePerNight: numberOfNights * place.pricePerNight,
        })

        const bookingId = response.data._id;
        setRedirect('/account/bookings/' + bookingId);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    return (
        <>
            <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                    Price: ${place.pricePerNight} / night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="">
                        <div className=" py-3 px-4">
                            <label>Check in: </label>
                            <input type="date" value={checkIn}
                                onChange={ev => setCheckIn(ev.target.value)} className="" />
                        </div>
                        <div className=" py-3 px-4 border-t">
                            <label>Check out: </label>
                            <input type="date" value={checkOut}
                                onChange={ev => setCheckOut(ev.target.value)} className="" />
                        </div>
                    </div>
                    <div>
                        <div className=" py-3 px-4 border-t">
                            <label>Number of guests:</label>
                            <input type="Number" value={numberOfGuests}
                                onChange={ev => setNumberOfGuests(ev.target.value)} placeholder={1} className="" />
                        </div>
                    </div>
                    {numberOfNights > 0 && (
                        <div className=" py-3 px-4 border-t">
                            <label>Your full name</label>
                            <input type="text" value={name}
                                onChange={ev => setName(ev.target.value)} placeholder={'John Doe'} className="" />
                            <label>Your phone number</label>
                            <input type="tel" value={phone}
                                onChange={ev => setPhone(ev.target.value)} placeholder={'123456789'} className="" />

                        </div>
                    )}
                </div>

                <button onClick={bookThisPlace} className="primary mt-4">
                    Book this place
                    {numberOfNights > 0 && (
                        <>
                            <span> ${numberOfNights * place.pricePerNight}</span>
                        </>
                    )}

                </button>
            </div >
        </>
    )
}