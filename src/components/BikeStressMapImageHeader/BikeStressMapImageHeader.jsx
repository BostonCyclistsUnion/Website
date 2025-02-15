import logo_stressmap from '/BikeStressMap.svg';
import { LANDING_PAGE_ROUTE } from '../routes/routes';

export default function BikeStressMapImageHeader() {
    return(
        <div>
            <a href={LANDING_PAGE_ROUTE}><img src={logo_stressmap} className='logo_stressmap' /> </a>
        </div>
    )
}

