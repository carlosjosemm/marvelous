'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams()

    const getSearchMatrix = async () => {
        const hero = searchParams.getAll('hero');
        const comic = searchParams.getAll('comic');
        let results
        if (hero.length > 0) {
            results =  await hero.map( hero => {
                if (comic.length > 0) {
                    return comic.map( comic => {
                        return fetchData(hero, comic)
                    })
                }
            })
        }
        // unwraping all promises
        const searchData = await Promise.all(results.map(async result => {
            return await Promise.all(result)
        }))
        console.log(searchData);
    }
    const fetchData = async (heroParam, comicParam) => {
        const apiBaseURL = 'http://gateway.marvel.com/v1/public/characters'
        // getting all matching heroes
        const heroRes = await axios.get(
            apiBaseURL,
            {
                params: {
                    apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                    nameStartsWith: heroParam,
                    limit: 10,
                    orderBy: 'name', // to be improved: let user select the ordering criteria
                }
            }
        )
        const matchedHeroes = heroRes.data.data.total > 0 ? heroRes.data.data.results : null; 
        if (comicParam) {
            // getting an array of matched comics by each matched hero
            const comicResArray = await Promise.all(
                // creating the array of promises (api calls)
                matchedHeroes.map( (hero) => {
                    return axios.get(
                        `${apiBaseURL}/${hero.id}/comics`,
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
        }
        return matchedHeroes
    }
    useEffect(() => {
        getSearchMatrix();
    }, [])

    if (loading) {
        return <h1>Loading search results...</h1>
    }

    return (
        <h1>Search results here...</h1>
     );
}
 
export default SearchPage;