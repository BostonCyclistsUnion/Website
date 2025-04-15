import logo_stressmap from '/BikeStressMap.svg';
import { Link } from 'react-router-dom';
import { MAP_PAGE_ROUTE } from '../routes/routes.jsx';

export default function BikeStressMapImageHeader() {
    return(
        <div>
            <Link to={MAP_PAGE_ROUTE}><img src={logo_stressmap} className='logo_stressmap' /></Link>
        </div>
    )
}

