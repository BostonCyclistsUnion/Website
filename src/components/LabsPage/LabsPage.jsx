import './LabsPage.css'
import { Link } from 'react-router-dom';

import wordmark from '/labs_wordmark.png'

import text from './data/LabsPageText'

import TextSection from '../TextSection/TextSection';

function LabsPage() {
    return(
        <div className='wrapper'>
          <img src={wordmark} className='wordmark' />
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

export default LabsPage

