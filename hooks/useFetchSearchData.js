'use client'
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../util/fetchData";

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
        
    useEffect( 
        () => {
            getSearchMatrix();
        }
        ,[searchParams])
    return [content, loading];
}
 
export default useFetchSearchData;