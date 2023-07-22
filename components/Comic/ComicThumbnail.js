import styled from 'styled-components'

const ComicThumbnail = styled.img`
    @media only screen and (min-width: ${props => props.theme.breakpoints.laptop}) {
        max-width: 450px;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.laptop}) {
        max-width: 380px;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        max-width: 280px;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobileLarge}) {
        max-width: 200px;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobileSmall}) {
        max-width: 180px;
    }
`
export default ComicThumbnail