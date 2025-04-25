import './MapPage.css'

import Map from '../../Map';

import LabsHeader from '../ImageLinks/LabsHeader';
import BikeStressMap from '../ImageLinks/BikeStressMap';

import textHeader from './data/MapPageTextHeader'
import textBody from './data/MapPageTextBody'

import TextSection from '../TextSection/TextSection';

export default function MapPage() {
    return (
        <div className='wrapper'>
            <LabsHeader />
            <BikeStressMap />
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
