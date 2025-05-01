import { Link } from 'react-router-dom';
import { LABS_PAGE_ROUTE } from '../routes/routes.jsx';
import './footer.css'
import DonateButton from '../Buttons/DonateButton.jsx';

export default function LabsFooter() {
    return(
        <div className='foot'>
            <div className='text'>
                <Link to={LABS_PAGE_ROUTE} >BCU Labs</Link> is a volunteer-led project of <Link to="https://bostoncyclistsunion.org/" >Boston Cyclists Union</Link>
            </div>
            <div className='text'>
                <Link to="https://docs.google.com/forms/d/e/1FAIpQLSefzxEQ-CAbJd_rrt90DHvdglYvP9RLqdDUVsFq28onw9xXJQ/viewform" >Join BCU Labs here</Link>
            </div>
            <DonateButton />
        </div>

    )
}
