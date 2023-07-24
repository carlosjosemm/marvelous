import styled from "styled-components";
import HeroContainer from "./HeroContainer";
import ContentPreview from "./ContentPreview";

const StyledFavsContainer = styled(HeroContainer)`
    justify-self: stretch;
    align-self: stretch;
    @media only screen and (min-width: ${props => props.theme.breakpoints.laptop}) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.laptop}) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobileLarge}) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobileSmall}) {
        grid-template-columns: repeat(1, 1fr);
    }

`
const StyledTitle = styled.h3`
    color: ${props => props.theme.colors.font};
    @media only screen and (min-width: ${props => props.theme.breakpoints.laptop}) {
        grid-column: span 4;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.laptop}) {
        grid-column: span 3;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        grid-column: span 3;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobileLarge}) {
        grid-column: span 2;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobileSmall}) {
        grid-column: span 1;
    }

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