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
                text.map(LTSPageText => (
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
      </div>
    )
}

export default LabsPage

