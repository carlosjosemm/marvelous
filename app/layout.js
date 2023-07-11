import styles from '../styles/globals.css'

const layout = ({children}) => {
    return ( 
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
 
export default layout;