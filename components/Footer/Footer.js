import styled from 'styled-components'

const StyledFooter = styled.footer`
    margin: 0;
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4rem;
    background-color: white; /* theme */
    box-shadow: 0px -1px 1px 1px lightgray; /* theme */
    > p {
        margin: 0.5rem auto;
        text-align: center;
    }
`
const Footer = () => {
    return ( 
        <StyledFooter>
            <p>© 2023 Marvelous. All rights reserved.</p>
        </StyledFooter>
     );
}

export default Footer