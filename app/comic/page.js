'use client'
import { useSearchParams } from "next/navigation";
import ComicContainer from "../../components/Comic/ComicContainer";
import ComicInfo from "../../components/Comic/ComicInfo";
import ComicThumbnail from "../../components/Comic/ComicThumbnail";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const ComicPage = () => {
    const searcParams = useSearchParams()
    const [comicData, setComicData] = useState(undefined)
    const [loading, setLoading] = useState(true)


    const getComicData = async (comicId) => {
        const comicBaseURL = 'http://gateway.marvel.com/v1/public/comics/'
        const comicRes = await axios.get(
            comicBaseURL + comicId,
            {
                params: {
                    apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                }
            }
        );
        console.log(comicRes);
        setComicData(
            () => {
            if (comicRes.data.data.results.length > 0) {
                return comicRes.data.data.results[0]
            } 
            return undefined;
        });
        setLoading(false);
    }

    useEffect(() => {
        const comicParam = searcParams.get('comicId');
        getComicData(comicParam);
    }, [searcParams])

    if (loading) {
        return <h1>Loading comic info...</h1>
    }

    if (!comicData) {
        <h1>Comic not found. Please check the URL you searched.</h1>
    }

    return ( 
        <ComicContainer>
            <ComicThumbnail src={`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`} />
            <ComicInfo comicData={comicData}/>
        </ComicContainer>
     );
}
 
export default ComicPage;