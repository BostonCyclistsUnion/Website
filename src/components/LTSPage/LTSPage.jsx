import './LTSPage.css'
import { Link } from 'react-router-dom';

import LabsHeader from '../ImageLinks/LabsHeader';
import LabsFooter from '../Footer/Footer';

import BikeStressMap from '../ImageLinks/BikeStressMap';

import text from './data/LTSPageText'
// import LTSPageTextSection from './LTSPageTextSection';

import TextSection from '../TextSection/TextSection';

function LTSPage() {
    return(
        <div id='primary-column'>
            <LabsHeader />
            <BikeStressMap />
            {
                text.map(LTSPageText => (
                // <LTSPageTextSection
                <TextSection 
                    key={LTSPageText.title}
                    title={LTSPageText.title}
                    subheading={LTSPageText.subheading}
                    paragraph={LTSPageText.paragraph}
                    list={LTSPageText.list}
                    graphic={LTSPageText.graphic}
                    />
                ))
            }
            <LabsFooter />
      </div>
    )
}

export default LTSPage

