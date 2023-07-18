'use client'
import axios from 'axios';
import { useCallback, useEffect, useState } from "react";
import HeroContainer from '../../components/Hero/HeroContainer';
import HeroContent from '../../components/Hero/HeroContent';
import HeroInfo from '../../components/Hero/HeroInfo';
import HeroThumbnail from '../../components/Hero/HeroThumbnail';

const HeroPage = ({params}) => {
    const [heroData, setHeroData] = useState(null);
    const [comicsData, setComicsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseURL = 'http://gateway.marvel.com/v1/public/characters'

    const handleApi = useCallback(async () => {
        const heroRes = await axios.get(apiBaseURL, {
            params: {
                apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                limit: '1',
                offset: `${200 * Math.random()}`,
            }
        });
        setHeroData(heroRes.data.data.results[0]);
        const comicsRes = await axios.get(`${apiBaseURL}/${heroRes.data.data.results[0].id}/comics`, {
                            params: {
                                apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                                limit: '10',
                                orderBy: '-onsaleDate',
                            }
                        })
        setComicsData(comicsRes.data.data.results);
        setLoading(false)
    }, [])

    useEffect(
        () => {
            handleApi();
        }  
    , [])

    if (loading) {
        return <h2>Loading Hero...</h2>
    }
    if (error) {
        return error.message
    }
    return ( 
        <HeroContainer>
            <HeroThumbnail src={`${heroData.thumbnail.path}.${heroData.thumbnail.extension}`} />
            <HeroInfo herodata={heroData}/>
            <HeroContent comicsData={comicsData} heroName={heroData.name} />
        </HeroContainer>
    );
}
 
export default HeroPage;