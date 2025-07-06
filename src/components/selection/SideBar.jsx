// SideBar layout

console.log('SideBar loaded')

import InfoSimple from './InfoSimple'
import InfoDetail from './InfoDetail'
import InfoBikeParking from './InfoBikeParking'
import InfoBluebikes from './InfoBluebikes'
import InfoIntersections from './InfoIntersections'

export const ModeToggle = ({advancedMode}) => {
    // console.log('ModeToggle/advancedMode', advancedMode)
    if (advancedMode) return ('Show Fewer Details')
    return ('Show Advanced Details')
}


const ShowSidebar = ({selectedFeature, selectedFeatureType, advancedMode}) => {
    // console.log('ShowSidebar/advancedMode', advancedMode)
    if (selectedFeatureType == 'lts') {
        if (advancedMode) {
            console.log('return advanced sidebar')
            return (
            <div className='advancedMode'>
                <InfoDetail selectedFeature={selectedFeature} />
            </div>
            )
        }
        console.log('return simple sidebar')
        return (
            <div className='basicMode'>
                <InfoSimple selectedFeature={selectedFeature} />
            </div>
            )
    } else if (selectedFeatureType == 'bikeParking') {
        console.log('return bike parking sidebar')
        return (
            <div className='basicMode'>
                <InfoBikeParking selectedFeature={selectedFeature} />
            </div>
        )
    } else if (selectedFeatureType == 'bluebikeStation') {
        console.log('return bluebike Station sidebar')
        return (
            <div className='basicMode'>
                <InfoBluebikes selectedFeature={selectedFeature} />
            </div>
        )
    } else if (selectedFeatureType == 'intersections') {
        console.log('return intersections sidebar')
        return (
            <div className='basicMode'>
                <InfoIntersections selectedFeature={selectedFeature} />
            </div>
        )
    }
}

const SideBar = ({selectedFeature, selectedFeatureType, zoom, zoomLimit, advancedMode=false}) => {
    if (selectedFeature) {console.log('SideBar/selectedFeature', selectedFeature)}
    if (selectedFeatureType) {console.log('SideBar/selectedFeatureType', selectedFeatureType)}
    if(zoom < zoomLimit) {
        return (
        <div id='sidebar' className='sidebar'>
            <p>Zoom in to select a street segment and learn more about it</p>
        </div>
        )
    }
    if(selectedFeature == undefined) {
        return (
        <div id='sidebar' className='sidebar'>
            <p>Click a street segment to learn more about it</p>
        </div>
        )
    }
    return (
        <div id='sidebar' className='sidebar'>
            <ShowSidebar 
                selectedFeature={selectedFeature}
                selectedFeatureType={selectedFeatureType}
                advancedMode={advancedMode}/>
        </div>
    )
}

export default SideBar