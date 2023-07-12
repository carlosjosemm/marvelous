'use client'
import styles from '../styles/globals.css'
import Footer from "../components/Footer";
import Header from "../components/Header";

const layout = ({children}) => {
    return ( 
        <html lang="en">
            <body>
                <div style={{display: "flex", flexDirection: 'column', minHeight: '100vh'}}>
                <Header />
                    <main style={{flexGrow: '2', minHeight: '70vh'}}>
                        {children}
                    </main>
                <Footer />
                </div>
            </body>
        </html>
    );
}
 
export default layout;