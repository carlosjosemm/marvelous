import axios from "axios";

export const fetchData = async (heroParam, comicParam) => {
    const heroBaseURL = 'http://gateway.marvel.com/v1/public/characters'
    const comicBaseURL = 'http://gateway.marvel.com/v1/public/comics'
    // getting all matching heroes
    let heroRes,
        comicRes,
        matchedHeroes;

    if (heroParam && comicParam) {
        return axios.get(
            `${heroBaseURL}/${heroParam}/comics`,
            {
                params: {
                    apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                    orderBy: '-onsaleDate',
                    formatType: 'comic',
                    titleStartsWith: comicParam,
                    format: 'comic',
                }
            }
        )
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
