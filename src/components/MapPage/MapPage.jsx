import './MapPage.css'

import Map from '../../Map';

import LabsHeader from '../ImageLinks/LabsHeader';
import BikeStressMap from '../ImageLinks/BikeStressMap';

import textHeader from './data/MapPageTextHeader'
import LabsFooter from '../Footer/Footer';

import textBody from './data/MapPageTextBody'

import TextSection from '../TextSection/TextSection';

export default function MapPage() {
    return (
        <div id='primary-column'>
            <LabsHeader />
            {/* <BikeStressMap /> */}
            {
                textHeader.map(PageText => (
                <TextSection 
                    key={PageText.title}
                    title={PageText.title}
                    subheading={PageText.subheading}
                    paragraph={PageText.paragraph}
                    list={PageText.list}
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
                    list={PageText.list}
                    graphic={PageText.graphic}
                    />
                ))
            }
            <LabsFooter />
        </div>
    )
}
