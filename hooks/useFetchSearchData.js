'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

const useFetchSearchData = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const searchParams = useSearchParams()

    const getSearchMatrix = async () => {
        const heroParams = searchParams.getAll('hero');
        const comicParams = searchParams.getAll('comic');
        let results,
            unwrappedResults;
        /** FETCHING DATA **/
        // case when hero param exists
        if (heroParams.length > 0) {
            results = heroParams.map( hero => {
                return fetchData(hero, undefined)
            })
            // unwraping all promises 
            unwrappedResults = await Promise.all( results);
        // case when only comic params exists
        } else if (comicParams.length > 0) {
            results = comicParams.map( comic => {
                return fetchData(undefined, comic)
            })
            // unwraping all promises 
            unwrappedResults = await Promise.all( results);
        };
        // parsing with the corresponding search param...
        let searchData
        
        if (heroParams.length > 0 && comicParams.length > 0) {
            searchData = unwrappedResults.map((heroParamRes, heroIndex) => {
                return {
                    searchParam: heroParams[heroIndex],
                    type: 'hero&comic',
                    secondarySearchParams: [...comicParams],
                    results: heroParamRes
                }
            })
        } else if (heroParams.length > 0) {
            searchData = unwrappedResults.map((heroParamRes, index) => {
                return {
                    searchParam: heroParams[index],
                    secondarySearchParams: undefined,
                    type: 'hero',
                    results: heroParamRes
                }
            })
        } else {
            searchData = unwrappedResults.map((comicParamRes, index) => {
                return {
                    searchParam: comicParams[index],
                    secondarySearchParams: undefined,
                    type: 'comic',
                    results: comicParamRes
                }
            })
        }
        setContent(searchData)
        setLoading(false);
    };

    const fetchData = async (heroParam, comicParam) => {
        const heroBaseURL = 'http://gateway.marvel.com/v1/public/characters'
        const comicBaseURL = 'http://gateway.marvel.com/v1/public/comics'
        // getting all matching heroes
        let heroRes,
            comicRes,
            matchedHeroes;

        if (heroParam && comicParam) {
            heroRes = await axios.get(
                heroBaseURL,
                {
                    params: {
                        apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                        nameStartsWith: heroParam,
                        limit: 16,
                        orderBy: 'name', // to be improved: let user select the ordering criteria
                    }
                }
            );
            matchedHeroes = heroRes.data.data.total > 0 ? heroRes.data.data.results : [];
            // getting an array of matched comics by each matched hero
            const comicResArray = await Promise.all(
                // creating the array of promises (api calls)
                matchedHeroes.map( (hero) => {
                    return axios.get(
                        `${heroBaseURL}/${hero.id}/comics`,
                        {
                            params: {
                                apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                                orderBy: '-onsaleDate',
                                formatType: 'comic',
                                titleStartsWith: comicParam,
                            }
                        }
                    )
                })
            );
            const matchedHeroesAndComics = matchedHeroes.map(
                (hero, index) => {
                    return {hero: hero, comics: comicResArray[index].data.data.results}
                }
            );
            return matchedHeroesAndComics
        } else if (heroParam) {
            heroRes = await axios.get(
                heroBaseURL,
                {
                    params: {
                        apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                        nameStartsWith: heroParam,
                        limit: 16,
                        orderBy: 'name', // to be improved: let user select the ordering criteria
                    }
                }
            );
            matchedHeroes = heroRes.data.data.total > 0 ? heroRes.data.data.results : [];
            return matchedHeroes
        } else if (comicParam) {
            comicRes = await axios.get(
                comicBaseURL,
                {
                    params: {
                        apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                        titleStartsWith: comicParam,
                        limit: 3,
                        orderBy: '-onsaleDate', // to be improved: let user select the ordering criteria
                    }
                }
            );
            return comicRes.data.data.results
        }    
    }
    
    useEffect( 
        () => {
            getSearchMatrix();
        }
        ,[searchParams])
    return [content, loading];
}
 
export default useFetchSearchData;