'use client'
import axios from 'axios';
import { useCallback, useEffect, useState } from "react";
import HeroContainer from '../../components/Hero/HeroContainer';
import HeroContent from '../../components/Hero/HeroContent';
import HeroInfo from '../../components/Hero/HeroInfo';
import HeroThumbnail from '../../components/Hero/HeroThumbnail';
import Message from '../../components/Generic/Message';
import Spinner from '../../components/Generic/Spinner';
import fallbackImg from '../../public/media/img/marvelbg-wider.jpg'

const HeroPage = () => {
    const [heroData, setHeroData] = useState(null);
    const [comicsData, setComicsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseURL = 'https://gateway.marvel.com/v1/public/characters'

    const handleApi = useCallback(async () => {
        try {
            // fetching the hero
            const heroRes = await axios.get(
                apiBaseURL, 
                {
                    params: {
                        apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                        limit: '1',
                        offset: `${200 * Math.random()}`,
                    }
                }
            );
            setHeroData(heroRes.data.data.results[0]);
            // fetching its latest comics
            const comicsRes = await axios.get(
                `${apiBaseURL}/${heroRes.data.data.results[0].id}/comics`, 
                {
                    params: {
                        apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                        limit: '10',
                        orderBy: '-onsaleDate',
                    }
                }
            );
            setComicsData(comicsRes.data.data.results);
            // stopping the loading phase
            setLoading(false)
        } catch (err) {
            setError(err);
        }
    }, [])

    useEffect(
        () => {
            handleApi();
        }  
    , [])

    if (loading) {
        return (
            <Spinner>
                <Message><h2>Loading Hero...</h2></Message>
            </Spinner>
        )
    }
    if (error) {
        return <Message><h2>Error: {error.message}</h2></Message>
    }

    const heroThumbnail = `${heroData.thumbnail.path.replace('http:', 'https:')}.${heroData.thumbnail.extension}`
    let url = ''
    if (heroThumbnail == 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || heroThumbnail == 'https://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        url = fallbackImg.src
    } else {
        url = heroThumbnail
    }

    return ( 
        <HeroContainer>
            <HeroThumbnail src={url} />
            <HeroInfo herodata={heroData}/>
            <HeroContent comicsData={comicsData} heroName={heroData.name} />
        </HeroContainer>
    );
}
 
export default HeroPage;