import logo_stressmap from '/BikeStressMap.svg';
import { Link } from 'react-router-dom';
import { MAP_PAGE_ROUTE } from '../routes/routes.jsx';
import './image.css'

export default function BikeStressMap() {
    return(
        <div>
            <Link to={MAP_PAGE_ROUTE}><img src={logo_stressmap} className='stressmap' /></Link>
        </div>
    )
}

