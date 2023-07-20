'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import SearchContainer from "../../components/Hero/SearchContainer";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);

    const searchParams = useSearchParams()

    const getSearchMatrix = async () => {
        const heroParams = searchParams.getAll('hero');
        const comicParams = searchParams.getAll('comic');
        let results,
            unwrappedResults;
        // case when both params exists
        if (heroParams.length > 0 && comicParams.length > 0) {
            results = heroParams.map( hero => {
                return comicParams.map( comic => {
                    return fetchData(hero, comic)
                })
            })
            // unwraping all promises 
            unwrappedResults = await Promise.all(results.map(async result => {
                return await Promise.all(result)
            }))
        // case when only hero params exists
        } else if(heroParams.length > 0) {
            results = heroParams.map( hero => {
                return fetchData(hero, undefined)
            })
            // unwraping all promises 
            unwrappedResults = await Promise.all( results
            );
        // case when only comic params exists
        } else if (comicParams.length > 0) {
            results = comicParams.map( comic => {
                return fetchData(undefined, comic)
            })
            // unwraping all promises 
            unwrappedResults = await Promise.all( results
            );
        };
        // parsing with the corresponding search param...
        let searchData
        
        if (heroParams.length > 0 && comicParams.length > 0) {
            searchData = unwrappedResults.map((heroParamRes, heroIndex) => {
                return {
                    searchParam: heroParams[heroIndex],
                    type: 'hero&comic',
                    results: heroParamRes.map((res, comicIndex) => {
                        return {
                            searchParam: comicParams[comicIndex],
                            results: res
                        }
                    })
                }
            })
        } else if (heroParams.length > 0) {
            searchData = unwrappedResults.map((heroParamRes, index) => {
                return {
                    searchParam: heroParams[index],
                    type: 'hero',
                    results: heroParamRes
                }
            })
        } else {
            searchData = unwrappedResults.map((comicParamRes, index) => {
                return {
                    searchParam: comicParams[index],
                    type: 'comic',
                    results: comicParamRes
                }
            })
        }

        //flattening the search matrix:
        let contentRows = []
        
        searchData.map( (search) => {
            if (search.type == 'hero&comic') {
                search.results.map((heroResult) => {
                    contentRows.push(
                        {
                            searchParams: [search.searchParam, heroResult.searchParam],
                            results: heroResult.results,
                        }
                    )
                })
            } else {
                contentRows.push(
                    {
                        searchParams: [search.searchParam],
                        results: search.results,
                    }
                )
            }
        })

        setContent(contentRows)
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
                        limit: 10,
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
                        limit: 10,
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
    useEffect(() => {
        getSearchMatrix();
    }, [searchParams])
    
    if (loading) {
        return <h1>Loading search results...</h1>
    }

    return (
        <>
        
        </>
     );
}
 
export default SearchPage;