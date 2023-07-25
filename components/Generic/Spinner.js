'use client'
import { styled } from "styled-components";

const StyledSpinner = styled.span`
    width: 48px;
    height: 48px;
    border: 5px solid ${props => props.theme.colors.font};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: block;
    margin: 2rem auto 1rem auto;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
`
const Spinner = ({children}) => {
    return ( 
        <div style={{width: '100%', height: '100%'}}>
            {children}
            <StyledSpinner />
        </div>
     );
}
 
export default Spinner;