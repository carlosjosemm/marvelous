'use client'
import Footer from "../components/Footer";
import Header from "../components/Header";

const Page = () => {
    return ( 
        <div style={{display: "flex", flexDirection: 'column', minHeight: '100vh'}}>
            <Header />
                <main style={{flexGrow: '2', minHeight: '70vh'}}>
                    <h1>Fist page from App</h1>
                </main>
            <Footer />
        </div>
     );
}
 
export default Page;