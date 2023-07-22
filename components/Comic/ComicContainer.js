import styled from 'styled-components'
import Theme from '../../app/Theme'

const ComicContainer = styled.section`
    width: 100%;
    background-color: lightcoral;
    max-width: ${props => props.theme.breakpoints.laptopLarge};
    margin: 0 auto;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: auto 1fr;
`
export default ComicContainer