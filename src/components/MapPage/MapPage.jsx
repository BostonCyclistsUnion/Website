import Map from '../../Map';
import LTS from '../../Explainers/LTS';
import Labs from '../../Explainers/Labs';
import BikeStressMapImageHeader from '../BikeStressMapImageHeader/BikeStressMapImageHeader';


export default function MapPage() {
    return (
        <div>
            <BikeStressMapImageHeader />
            <Labs />
            <Map />
            <LTS />
        </div>
    )
}
