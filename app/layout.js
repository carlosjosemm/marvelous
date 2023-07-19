'use client'
import Theme from "./Theme";
import '../styles/globals.css'
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import StyledComponentsRegistry from "../lib/registry";
import AtomProvider from "./AtomProvider";

const layout = ({children}) => {
    return ( 
        <html lang="en">
            <body>
                <AtomProvider>
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
                </AtomProvider>
            </body>
        </html>
    );
}
 
export default layout;