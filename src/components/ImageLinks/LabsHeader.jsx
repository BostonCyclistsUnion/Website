import labs_wordmark from '/labs_wordmark.png';
import { Link } from 'react-router-dom';
import { LABS_PAGE_ROUTE } from '../routes/routes.jsx';
import './image.css'

export default function LabsHeader() {
    return(
        <div>
            <Link to={LABS_PAGE_ROUTE}><img src={labs_wordmark} className='labs_wordmark' /></Link>
        </div>
    )
}
