import styled from 'styled-components'
import Image from 'next/image';
import logo from '../../public/media/img/marvel-logo.png'
import 'material-icons/iconfont/outlined.css';
import 'material-icons/iconfont/filled.css';
import 'material-icons/iconfont/outlined.css';

const StyledHeader = styled.header`
    margin: 0;
    position: relative;
    top: 0;
    left: 0;
    min-width: 100vw;
    max-height: 4rem;
    min-height: 4rem;
    background-color: tomato; 
    display: grid;
    grid-template-columns: auto auto auto 1fr auto auto;
    align-items: center;
`
const VertDivider = styled.div`
    border-left: 1px solid #38546d; 
    border-right: 1px solid #16222c; 
    height: 80%;
    position: relative;
`
const Header = () => {
    return ( 
        <StyledHeader>
            <Image 
                src={logo} 
                alt='Marvel logo' 
                height={57}
                placeholder='blur' 
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
             />
            <VertDivider />
            <span className="material-icons-outlined">search</span>
            <input />
            <span className="material-icons-outlined">star_border</span>
            <VertDivider />
        </StyledHeader>
     );
}

export default Header;