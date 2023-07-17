'use client'
import HeroContainer from "../../../components/Hero/HeroContainer";
import HeroContent from "../../../components/Hero/HeroContent";
import HeroInfo from "../../../components/Hero/HeroInfo";
import HeroThumbnail from "../../../components/Hero/HeroThumbnail";
import dummydata from '../../../dummyHero.json'
import dummyComicList from '../../../dummyComicList.json'


const HeroPage = ({props, params}) => {
    const thumbnailURL = `${dummydata.data.results[0].thumbnail.path}.${dummydata.data.results[0].thumbnail.extension}`;
    return ( 
        <HeroContainer>
            <HeroThumbnail src={thumbnailURL} />
            <HeroInfo herodata={dummydata.data.results[0]}/>
            <HeroContent comicsData={dummyComicList} heroName={dummydata.data.results[0].name} />
        </HeroContainer>
        
    );
}
 
export default HeroPage;