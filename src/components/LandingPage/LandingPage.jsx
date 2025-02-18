import './LandingPage.css'
import { Link } from 'react-router-dom';

import logo_stressmap from '/BikeStressMap.svg'

import text from './data/LandingPageText'
import LandingPageTextSection from './LandingPageTextSection';


function LandingPage() {
    return(
        <div className='wrapper'>
          <img src={logo_stressmap} className='logo_stressmap' />
            {
                text.map(landingPageText => (
                <LandingPageTextSection 
                    key={landingPageText.title}
                    title={landingPageText.title}
                    subheading={landingPageText.subheading}
                    paragraph={landingPageText.paragraph}
                    />
                ))
            }
      </div>
    )
}

export default LandingPage

