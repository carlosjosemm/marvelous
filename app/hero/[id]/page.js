'use client'
import HeroContainer from "../../../components/Hero/HeroContainer";
import HeroInfo from "../../../components/Hero/HeroInfo";
import HeroThumbnail from "../../../components/Hero/HeroThumbnail";
import dummydata from '../../../dummyHero.json'

const HeroPage = ({props, params}) => {
    const thumbnailURL = `${dummydata.data.results[0].thumbnail.path}.${dummydata.data.results[0].thumbnail.extension}`;
    return ( 
        <HeroContainer>
            <HeroThumbnail src={thumbnailURL} />
            <HeroInfo herodata={dummydata.data.results[0]}/>
        </HeroContainer> 
    );
}
 
export default HeroPage;