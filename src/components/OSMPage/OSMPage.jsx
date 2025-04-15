import './OSMPage.css'
import { Link } from 'react-router-dom';

import BikeStressMapImageHeader from '../BikeStressMapImageHeader/BikeStressMapImageHeader';

import text from './data/OSMPageText'

import TextSection from '../TextSection/TextSection';

function OSMPage() {
    return(
        <div className='wrapper'>
          <BikeStressMapImageHeader />
            {
                text.map(LTSPageText => (
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

export default OSMPage

