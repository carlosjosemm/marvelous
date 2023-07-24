'use client'
import Theme from "./Theme";
import '../styles/globals.css'
import StyledFooter from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import StyledComponentsRegistry from "../lib/registry";
import AtomProvider from "./AtomProvider";
import { styled } from "styled-components";

const StyledMain = styled.main`
    flex-grow: 2; 
    min-height: 70vh;
    background-color: ${props => props.theme.colors.background};
`

const layout = ({children}) => {
    return ( 
        <html lang="en">
            <body>
                <AtomProvider>
                    <StyledComponentsRegistry>
                        <Theme>
                            <div style={{display: "flex", flexDirection: 'column', minHeight: '100vh'}}>
                            <Header />
                                <StyledMain>
                                    {children}
                                </StyledMain>
                            <StyledFooter />
                            </div>
                        </Theme>
                    </StyledComponentsRegistry>
                </AtomProvider>
            </body>
        </html>
    );
}
 
export default layout;