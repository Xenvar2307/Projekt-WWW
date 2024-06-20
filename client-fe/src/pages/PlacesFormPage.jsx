import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNavigation from "../AccountNavigation";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [pricePerNight, setPricePerNight] = useState(100);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPricePerNight(data.pricePerNight)
        })
    }, [id]);


    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(ev) {
        ev.preventDefault()

        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, pricePerNight,
        }

        if (id) {
            //update
            await axios.put('/places', {
                id,
                ...placeData
            });
            setRedirect(true);
            alert('Place editted succesfully.')

        } else {
            //new place
            await axios.post('/places', {
                ...placeData
            });
            setRedirect(true);
            alert('Place added succesfully.')
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNavigation />
            <form onSubmit={savePlace}>
                {preInput('Title', 'title for your place, should be short and catchy')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: Lovely, spacious appartment" />
                {preInput('Address', 'location')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos', 'upload photos presenting your place, the more the better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'describe your place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                {preInput('Perks', 'select all perks your place has')}
                <Perks selected={perks} onChange={setPerks} />
                {preInput('Extra info', 'provide any extra information you want, eg. house rules, neighbours')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}></textarea>
                {preInput('Check in&out times, max guests', 'add check in and out times, remember to leave time between guests for cleaning')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="15" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max. guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="4" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={pricePerNight} onChange={ev => setPricePerNight(ev.target.value)} placeholder="4" />
                    </div>
                </div>

                <div className="mt-4 my-8">
                    <button className="primary">Save</button>
                </div>
            </form>
        </div>
    );
}