import './OSMPage.css'
import { Link } from 'react-router-dom';

import LabsHeader from '../ImageLinks/LabsHeader';
import LabsFooter from '../Footer/Footer';

import BikeStressMap from '../ImageLinks/BikeStressMap';

import text from './data/OSMPageText'

import TextSection from '../TextSection/TextSection';

function OSMPage() {
    return(
        <div id='primary-column'>
            <LabsHeader />
            <BikeStressMap />
            {
                text.map(PageText => (
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

export default OSMPage

