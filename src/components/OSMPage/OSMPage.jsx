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
      </div>
    )
}

export default OSMPage

