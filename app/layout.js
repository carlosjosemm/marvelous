'use client'
import Theme from "./Theme";
import '../styles/globals.css'
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import StyledComponentsRegistry from "../lib/registry";

const layout = ({children}) => {
    return ( 
        <html lang="en">
            <body>
                <StyledComponentsRegistry>
                    <Theme>
                        <div style={{display: "flex", flexDirection: 'column', minHeight: '100vh'}}>
                        <Header />
                            <main style={{flexGrow: '2', minHeight: '70vh'}}>
                                {children}
                            </main>
                        <Footer />
                        </div>
                    </Theme>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
 
export default layout;