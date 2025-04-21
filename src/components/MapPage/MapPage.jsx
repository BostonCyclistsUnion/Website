import './MapPage.css'

import Map from '../../Map';

import BikeStressMapImageHeader from '../BikeStressMapImageHeader/BikeStressMapImageHeader';

import textHeader from './data/MapPageTextHeader'
import textBody from './data/MapPageTextBody'

import TextSection from '../TextSection/TextSection';

export default function MapPage() {
    return (
        <div className='wrapper'>
            <BikeStressMapImageHeader />
            {
                textHeader.map(PageText => (
                <TextSection 
                    key={PageText.title}
                    title={PageText.title}
                    subheading={PageText.subheading}
                    paragraph={PageText.paragraph}
                    graphic={PageText.graphic}
                    />
                ))
            }
            <Map />
            {
                textBody.map(PageText => (
                <TextSection 
                    key={PageText.title}
                    title={PageText.title}
                    subheading={PageText.subheading}
                    paragraph={PageText.paragraph}
                    graphic={PageText.graphic}
                    />
                ))
            }
        </div>
    )
}
