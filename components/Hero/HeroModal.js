import { useAtomValue } from "jotai";
import { styled } from "styled-components";
import { secSearchParamsAtom } from "../../app/atoms";
import { useState } from "react";
import { fetchData } from "../../util/fetchData";
import { useEffect } from "react";
import 'material-icons/iconfont/outlined.css';
import axios from "axios";
import fallbackImg from '../../public/media/img/marvelbg.jpg.jpg'

const StyledModal = styled.div`
    z-index: 1000;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background-color: rgba(0,0,0,0.7);
    justify-content: center;
    align-items: center;
`
const StyledOverlay = styled.section`
    display: flex;
    flex-direction:column;
    background-color: white;
    border: 1px solid black;
    border-radius: 0.5rem;
    max-height: 70vh;
    margin: auto 1rem;
    background-color: ${props => props.theme.colors.foreground};
`
const ModalHeader = styled.div`
    padding: 0.5rem;
    margin-left: 2rem;
    margin-top: 1rem;
    user-select: none;
    cursor: default;
    color: ${props => props.theme.colors.font};
    background-color: ${props => props.theme.colors.foreground};
    button {
        float: right;
        padding: 0 2px;
        border: 0px solid white;
        background-color: transparent;
        cursor: pointer;
        color: ${props => props.theme.colors.font};
    }
    > h1 {
        font-size: 2rem;
    }
`
const ModalBody = styled.div`
    flex: 1 1 auto;
    user-select: none;
    cursor: default;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
    max-width: ${props => props.theme.breakpoints.laptop};
    background-color: ${props => props.theme.colors.foreground};
    color: ${props => props.theme.colors.font};
`
const ModalItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1ch;
    align-items: center;
    margin-bottom: 2ch;
    > img {
        height: 6rem;
        max-height: 6rem;
        background-color: lightgray;
        width: 3.94rem;
        max-width: 3.94rem;
        object-fit: cover;
    }
    h4 {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    p {
        overflow: auto;
        max-height: 6rem;
        word-wrap: break-word;
        text-overflow: ellipsis;
    }
`

const HeroModal = ({show, onClose, hero, explicitSearchParam}) => {
    // getting the secondary (comics) search params
    const globalSearchParams = useAtomValue(secSearchParamsAtom);
    const [comicList, setComicList] = useState([])
    // adding optional comics search params from props, defaults to the global value (atom). 
    const searchParams = explicitSearchParam ?? globalSearchParams;
    const getComics = async (secSearchParams) => {
        let comicsSearches;
        if (secSearchParams) {
            comicsSearches = await Promise.all(
                secSearchParams.comics.map((comicParam) => {
                    return fetchData(hero.id, comicParam)
                })
            );
        } else {
            const heroBaseURL = 'https://gateway.marvel.com/v1/public/characters'
            comicsSearches = await axios.get(
                `${heroBaseURL}/${hero.id}/comics`,
                {
                    params: {
                        apikey: process.env.NEXT_PUBLIC_API_PUBLICKEY,
                        orderBy: '-onsaleDate',
                        formatType: 'comic',
                        format: 'comic',
                    }
                }
            )
        }

        setComicList(()=>{
            let allResults = [];
            if (secSearchParams) {
                for (const search of comicsSearches) {
                    allResults.push(...search.data.data.results)
                }
            } else {
                allResults = comicsSearches.data.data.results;
            }
            return allResults
        })
    };

    useEffect(()=> {
        if (searchParams.comics?.length > 0) {
            getComics(searchParams)
        } else {
            getComics()
        }
    }, [searchParams])

    /** CREATING MODAL BODY (CONTENT) **/
    let modalBody;
    if (searchParams.comics?.length > 0 && comicList.length == 0) {
        // case when no comics were found for the specified criteria
        modalBody = <><h3>No Comics found for this hero. Try a different criteria.</h3></>
    } else if (comicList.length > 0) {
        // case when comics were found for the specified criteria
        modalBody = comicList.map((comic, index) => {
            const url = `${comic.thumbnail.path.replace('http:', 'https:')}.${comic.thumbnail.extension}`
            return (
                <ModalItem key={index*1000*Math.random()}>
                    <img src={url == 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? fallbackImg.src : url} />
                    <div>
                        <h4>{comic.title}</h4>
                        <p>{comic.description}</p>
                    </div>
                </ModalItem>
            )
        })
    } else {
        // case when no comics were found
        modalBody = <h2>No Comics found for this hero.</h2>
    }

    // modal is closed (hidden)
    if (!show) {
        return null
    }

    // modal is open (visible)
    return ( 
        <StyledModal onClick={onClose}>
            <StyledOverlay onClick={(ev) => ev.stopPropagation()}>
                <ModalHeader>
                    <button onClick={onClose}><span className="material-icons-outlined">close</span></button>
                    <h1>{hero.name}</h1>
                    <p>{searchParams.comics?.length > 0 ? `Showing results for "${searchParams.comics.join('" & "')}"` : 'Showing latest Comics for this hero'}</p>
                </ModalHeader> 
                <ModalBody>
                    {modalBody}
                </ModalBody> 
            </StyledOverlay>
        </StyledModal>
     );
}
 
export default HeroModal;