import { useState } from "react";
import { styled } from "styled-components";
import HeroModal from "./HeroModal";
import { useCallback } from "react";
import 'material-icons/iconfont/outlined.css';
import storageAvailable from "../../util/checkStorageAvailability";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const StyledHeroPreview = styled.div`
    margin: 1ch;
    position: relative;
    -webkit-bx-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    height: 380px;
    word-wrap: break-word;
    background-color: transparent;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0, 0.125);
    border-radius: 0.5rem;
    text-align: center;
    user-select: none;
    cursor: pointer;
    > .favicon {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: white;
        font-size: 2rem;
        text-shadow: 0 0 4px black, 0 0 4px grey;
        user-select: none;
    }
    > .favicon:hover {
        text-shadow: 0 0 6px black, 0 0 6px black;
    } 
    img {
        height: 380px;
        width: 100%;
        display: block;
    }
    div {
        text-align: left;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1.25rem;
        color: white;
        font-weight: 700;
        text-shadow: 0 0 5px black, 0 0 5px black;
        background: linear-gradient(transparent, black 90%);
    }
    overflow: hidden; 
`
/** 
 * @typedef {Object} props
 * @property {string[]} secSearchParam
 * @property {{thumbnail: {path: string, extension: string}, name: string}} contentData
 */

const ContentPreview = (/** @type {props}*/ {contentData, secSearchParam}) => {
    const [showModal, setShowModal] = useState(false);
    const [isFav, setIsFav] = useState(false)
    const path = usePathname()
    const isFavs = path.startsWith('/favs');

    const handleFav = (contentData, /** @type {Array.<string>} */ params, ev) => {
        // preventing bubbling (misfiring modal)
        ev.stopPropagation();
        if (isFav) {
            // already faved, proceed to remove fav from storage
            const favs = JSON.parse(localStorage.getItem('fav'))
            let favIndex;
            // checking each fav stored to find the one to be removed
            favs.map((fav, i) => {
                // checking if hero name matches
                if (fav.contentData.name == contentData.name) {
                    // checking if comic search params matches
                    if (fav.secSearchParam.length == params.length && params.length > 0) {
                        // checking if all params matches (same exact search)
                        const matches = params.reduce(
                            (match, param) => {
                                if (match) {
                                    match = fav.secSearchParam.includes(param);
                                }
                                return match
                            }
                            , true);
                        // finding the index of the fav to be removed
                        matches ? favIndex = i : null;
                    }
                }
            })
            // remove the fav element from the array
            const newFavs = favs.filter((fav, index) => {
                return index != favIndex;
            })
            // refresh favs on storage
            const favString = JSON.stringify(newFavs);
            localStorage.setItem('fav', favString);
            setIsFav(false)
        } else {
            // item not faved, adding fav to storage
            if (storageAvailable("localStorage")) {
                // local storage available
                if (localStorage.getItem('fav')) {
                    // some fav data already present in storage
                    const fav = JSON.parse(localStorage.getItem('fav'))
                    fav.push({
                        contentData: contentData,
                        secSearchParam: params,
                    });
                    const favString = JSON.stringify(fav);
                    localStorage.setItem('fav', favString);
                } else {
                    // no fav data present in storage yet
                    const fav = [{
                        contentData: contentData,
                        secSearchParam: params,
                    }];
                    const favString = JSON.stringify(fav);
                    localStorage.setItem('fav', favString);
                }
            } else if (storageAvailable("sessionStorage")) {
                // only session storage available.
                if (sessionStorage.getItem('fav')) {
                    // some fav data already present in storage
                    const fav = JSON.parse(sessionStorage.getItem('fav'))
                    fav.push({
                        contentData: contentData,
                        secSearchParam: params,
                    });
                    const favString = JSON.stringify(fav);
                    sessionStorage.setItem('fav', favString);
                } else {
                    // no fav data present in storage yet
                    const fav = [].push({
                        contentData: contentData,
                        secSearchParam: params,
                    });
                    const favString = JSON.stringify(fav);
                    sessionStorage.setItem('fav', favString);
                }
            } else {
                // no storage available. 
                //To improve: toast to warn user of lack of functionality due to browser limitation.
                return
            }
            setIsFav(true)
            return
        }
    }

    const handleClick = useCallback(() => {
        setShowModal(true)
    }, [])

    const handleClose = useCallback((ev) => {
        ev.stopPropagation()
        setShowModal(false)
    }, [])

    useEffect(() => {
        // checking favs stored to find whether this search is faved or not:
        const favs = JSON.parse(localStorage.getItem('fav'))
        if (favs && favs.length > 0) {
            favs.map((fav, i) => {
                // checking if hero names matches
                if (fav.contentData.name == contentData.name) {
                    // checking if comic search params matches
                    if (fav.secSearchParam.length == secSearchParam?.length && secSearchParam?.length > 0) {
                        // checking if all params in both arrays matches (same exact search)
                        const matches = secSearchParam.reduce(
                            (match, param) => {
                                if (match) {
                                    match = fav.secSearchParam.includes(param);
                                }
                                return match
                            }
                            , true);
                        // setting the corresponding state
                        matches ? setIsFav(true) : null;
                    };
                };
            })
        }
    }, [contentData, secSearchParam, isFav])

    return ( 
        <a onClick={handleClick} >
            <HeroModal 
                show={showModal} 
                    onClose={handleClose} 
                    hero={contentData} 
                    explicitSearchParam={isFavs ? {comics: secSearchParam} : undefined}
            />
            <StyledHeroPreview>
                <span 
                    className="material-icons-outlined favicon" 
                    onClick={(ev) => handleFav(contentData, secSearchParam, ev)}
                >
                    {isFav? 'star' : 'star_border'}
                </span>
                <img src={`${contentData.thumbnail.path}.${contentData.thumbnail.extension}`} style={{objectFit: 'cover'}}/>
                <div>
                    <p>{contentData.name}</p>
                </div>
            </StyledHeroPreview>
        </a>
    );
}
 
export default ContentPreview;