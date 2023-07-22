import { useState } from "react";
import { styled } from "styled-components";
import HeroModal from "./HeroModal";
import { useCallback } from "react";
import 'material-icons/iconfont/outlined.css';
import storageAvailable from "../../util/checkStorageAvailability";

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
const ContentPreview = ({contentData, secSearchParam}) => {
    const [showModal, setShowModal] = useState(false);
    const [isFav, setIsFav] = useState(false)

    const handleFav = (contentData, secSearchParam, ev) => {
        ev.stopPropagation();
        if (storageAvailable("localStorage")) {
            // local storage available
            if (localStorage.getItem('fav')) {
                // some fav data already present in storage
                const fav = JSON.parse(localStorage.getItem('fav'))
                fav.push({
                    contentData: contentData,
                    secSearchParam: secSearchParam,
                });
                const favString = JSON.stringify(fav);
                localStorage.setItem('fav', favString);
            } else {
                // no fav data present in storage yet
                const fav = [{
                    contentData: contentData,
                    secSearchParam: secSearchParam,
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
                    secSearchParam: secSearchParam,
                });
                const favString = JSON.stringify(fav);
                sessionStorage.setItem('fav', favString);
            } else {
                // no fav data present in storage yet
                const fav = [].push({
                    contentData: contentData,
                    secSearchParam: secSearchParam,
                });
                const favString = JSON.stringify(fav);
                sessionStorage.setItem('fav', favString);
            }
        } else {
            // no storage available
            return
        }
        return
    }

    const handleClick = useCallback(() => {
        setShowModal(true)
    }, [])

    const handleClose = useCallback((ev) => {
        ev.stopPropagation()
        setShowModal(false)
    }, [])
    // if (!secSearchParam) {
    //     return ( 
    //         <a onClick={handleClick} >
    //         <HeroModal show={showModal} onClose={handleClose} hero={contentData} />
    //         <StyledHeroPreview>
    //             <img src={`${contentData.thumbnail.path}.${contentData.thumbnail.extension}`} style={{objectFit: 'cover'}}/>
    //             <div>
    //                 <p>{contentData.name}</p>
    //             </div>
    //         </StyledHeroPreview>
    //         </a>
    //     );
    // }

    // if (secSearchParam.length > 0) {
    //     return ( 
    //         <a onClick={handleClick} >
    //         <HeroModal show={showModal} onClose={handleClose} hero={contentData} />
    //         <StyledHeroPreview>
    //             <img src={`${contentData.thumbnail.path}.${contentData.thumbnail.extension}`} style={{objectFit: 'cover'}}/>
    //             <div>
    //                 <p>{contentData.name}</p>
    //             </div>
    //         </StyledHeroPreview>
    //         </a>
    
    //     ); 
    // }
    return ( 
        <a onClick={handleClick} >
            <HeroModal show={showModal} onClose={handleClose} hero={contentData} />
            <StyledHeroPreview>
                <span className="material-icons-outlined favicon" onClick={(ev) => handleFav(contentData, secSearchParam, ev)} >star_border</span>
                <img src={`${contentData.thumbnail.path}.${contentData.thumbnail.extension}`} style={{objectFit: 'cover'}}/>
                <div>
                    <p>{contentData.name}</p>
                </div>
            </StyledHeroPreview>
        </a>
    );
}
 
export default ContentPreview;