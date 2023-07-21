import axios from "axios";

export const fetchData = async (heroParam, comicParam) => {
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
