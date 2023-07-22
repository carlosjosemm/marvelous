import { useAtomValue } from "jotai";
import { styled } from "styled-components";
import { secSearchParamsAtom } from "../../app/atoms";
import { useState } from "react";
import { fetchData } from "../../util/fetchData";
import { useEffect } from "react";
import 'material-icons/iconfont/outlined.css';

const StyledModal = styled.div`
    z-index: 1000;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background-color: rgba(0,0,0,0.4);
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
`
const ModalHeader = styled.div`
    padding: 0.5rem;
    margin-left: 2rem;
    margin-top: 1rem;
    user-select: none;
    cursor: default;
    button {
        float: right;
        padding: 0 2px;
        border: 0px solid white;
        background-color: transparent;
        cursor: pointer;
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
`
const ModalItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1ch;
    align-items: center;
    margin-bottom: 2ch;
    > img {
        max-height: 6rem;
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

const HeroModal = ({show, onClose, hero}) => {
    // getting the secondary (comics) search params
    const secSearchParams = useAtomValue(secSearchParamsAtom);
    const [comicList, setComicList] = useState([])

    const getComics = async (secSearchParams) => {
        const comicsSearches = await Promise.all(
            secSearchParams.comics.map((comicParam) => {
                return fetchData(hero.id, comicParam)
            })
        );

        setComicList(()=>{
            let allResults = [];
            for (const search of comicsSearches) {
                allResults.push(...search.data.data.results)
            }
            return allResults
        })
    };

    useEffect(()=> {
        if (secSearchParams.comics.length > 0) {
            getComics(secSearchParams)
        }
    }, [secSearchParams])

    /** CREATING MODAL BODY (CONTENT) **/
    let modalBody;
    if (secSearchParams.comics.length > 0 && comicList.length == 0) {
        // case when no comics were found for the specified criteria
        modalBody = <h5>No comics matches "{secSearchParams.comics.join()}" for this hero</h5>
    } else if (secSearchParams.comics.length > 0) {
        // case when comics were found for the specified criteria
        modalBody = comicList.map((comic) => {
            return (
                <ModalItem>
                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
                    <div>
                        <h4>{comic.title}</h4>
                        <p>{comic.description}</p>
                    </div>
                </ModalItem>
            )
        })
    } else {
        // case when no comics search criteria was given
        // TBD
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
                </ModalHeader> 
                <ModalBody>
                    {modalBody}
                </ModalBody> 
            </StyledOverlay>
        </StyledModal>
     );
}
 
export default HeroModal;