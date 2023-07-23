import styled from "styled-components";
import HeroContainer from "./HeroContainer";
import ContentPreview from "./ContentPreview";

const StyledFavsContainer = styled(HeroContainer)`
    grid-template-columns: repeat(4, 1fr);
    justify-self: stretch;
    align-self: stretch;
`
const StyledTitle = styled.h3`
    grid-column: span 4;
`
/** 
 * @typedef {object} props
 * @property {Array<{contentData: {thumbnail: {path: string, extension: string}, name: string}, secSearchParam: Array}>} content
 */
const FavsContainer = (/** @type {props}*/ {content}) => {
    return ( 
        <StyledFavsContainer>
            <StyledTitle>Favorites</StyledTitle>
            {content.map((fav, index) => {
                return (
                    <ContentPreview contentData={fav.contentData} secSearchParam={fav.secSearchParam} key={index*1000*Math.random()}/>
                )
            })}
        </StyledFavsContainer> 
    );
}
 
export default FavsContainer;