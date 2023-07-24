'use client'
import { useSearchParams } from "next/navigation";
import ComicContainer from "../../components/Comic/ComicContainer";
import ComicInfo from "../../components/Comic/ComicInfo";
import ComicThumbnail from "../../components/Comic/ComicThumbnail";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Message from "../../components/Generic/Message";


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
        const hasParam = searcParams?.getAll('comicId').reduce(
            (acc, param) => {
                return param != '' ? acc = true : acc;
            }
        , false);

        if (!searcParams.has('comicId') || !hasParam) {
            setLoading(false)
            return
        } else {
            const comicParam = searcParams.getAll('comicId');
            for (const param of comicParam) {
                if (param != '') {
                    getComicData(param);
                    break 
                }
            }   
        }
    }, [searcParams])

    if (loading) {
        return <Message><h1>Loading comic info...</h1></Message>
    }

    if (!comicData) {
        return <h1>Comic not found. Please check the URL you searched for.</h1>
    }

    return ( 
        <ComicContainer>
            <ComicThumbnail src={`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`} />
            <ComicInfo comicData={comicData}/>
        </ComicContainer>
     );
}
 
export default ComicPage;