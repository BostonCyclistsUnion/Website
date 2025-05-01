import './LabsPage.css'
import { Link } from 'react-router-dom';
import { MAP_PAGE_ROUTE } from '../routes/routes.jsx';

import LabsHeader from '../ImageLinks/LabsHeader';
import LabsFooter from '../Footer/Footer';

import text from './data/LabsPageText'

import TextSection from '../TextSection/TextSection';
import ProjectButton from '../Buttons/ProjectButton';

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
            <ProjectButton 
                link={MAP_PAGE_ROUTE}
                title='Bike Stress Map'
                subtitle="See how stressful Boston's streets are"
                />
            <ProjectButton 
                link="https://bostoncyclistsunion.org/author/bcu-labs"
                title='Articles'
                subtitle="Data analysis, stories, infrastructure projects, and more"
                />
            <LabsFooter />
      </div>
    )
}

export default LabsPage

