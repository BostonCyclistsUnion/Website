import './LTSPage.css'
import { Link } from 'react-router-dom';

import logo_stressmap from '/BikeStressMap.svg'

import text from './data/LTSPageText'
// import LTSPageTextSection from './LTSPageTextSection';

import TextSection from '../TextSection/TextSection';

function LTSPage() {
    return(
        <div className='wrapper'>
          <img src={logo_stressmap} className='logo_stressmap' />
            {
                text.map(LTSPageText => (
                // <LTSPageTextSection
                <TextSection 
                    key={LTSPageText.title}
                    title={LTSPageText.title}
                    subheading={LTSPageText.subheading}
                    paragraph={LTSPageText.paragraph}
                    graphic={LTSPageText.graphic}
                    />
                ))
            }
      </div>
    )
}

export default LTSPage

