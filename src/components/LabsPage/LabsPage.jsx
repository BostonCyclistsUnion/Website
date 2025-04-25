import './LabsPage.css'
import { Link } from 'react-router-dom';

import LabsHeader from '../ImageLinks/LabsHeader';

import text from './data/LabsPageText'

import TextSection from '../TextSection/TextSection';

function LabsPage() {
    return(
        <div className='wrapper'>
          <LabsHeader />
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

