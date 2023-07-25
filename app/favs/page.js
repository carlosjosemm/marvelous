'use client'
import { useState } from "react";
import storageAvailable from "../../util/checkStorageAvailability";
import { useEffect } from "react";
import FavsContainer from "../../components/Hero/FavsContainer";
import Message from "../../components/Generic/Message";
import Spinner from "../../components/Generic/Spinner";

const FavsPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    // function to get favs from storage
    const getFavs = () => {
        /**@type {Array} */
        let favs;
        // checking which storage is available
        if (storageAvailable("localStorage")) {
            favs = JSON.parse(localStorage.getItem('fav'))
        } else if (storageAvailable("sessionStorage")) {
            favs = JSON.parse(sessionStorage.getItem('fav'))
        } else {
            // No storage available in browser. Stop loading.
            // To improve: add global state as last resort.
            setLoading(false)
            return
        }
        if (favs.length > 0) {
            setContent(favs);
        } else {
            // No favs found. Stop loading
            setLoading(false)
            return
        }
        // Content data ready. Stop loading.
        setLoading(false)
        return
    }

    useEffect(() => {
        getFavs()
    }, [])

    if (loading) {
        return (
            <Spinner>
                <Message><h2>Loading favorite searches...</h2></Message>
            </Spinner>
        )
    }

    if (!content) {
        return (
            <Message>
            <h2>No favorite searches found.</h2>
            <h3>You can add new searches here by using the star symbol on any hero.</h3>
            </Message>
        )
    }
    return ( 
        <FavsContainer content={content}/>
     );
}
 
export default FavsPage;