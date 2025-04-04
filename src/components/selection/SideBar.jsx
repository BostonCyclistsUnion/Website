// SideBar layout

console.log('SideBar loaded')

import InfoSimple from './InfoSimple'
import InfoDetail from './InfoDetail'

export const ModeToggle = ({advancedMode}) => {
    console.log('ModeToggle/advancedMode', advancedMode)
    if (advancedMode) return ('Show Fewer Details')
    return ('Show Advanced Details')
}


const ShowSidebar = ({selectedFeature, advancedMode}) => {
    console.log('ShowSidebar/advancedMode', advancedMode)
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
        <div className='advancedMode'>
                <InfoSimple selectedFeature={selectedFeature} />
        </div>
        )
}

const SideBar = ({selectedFeature, zoom, zoomLimit, advancedMode=false}) => {
    console.log('SideBar/selectedFeature', selectedFeature)
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
            <ShowSidebar selectedFeature={selectedFeature} advancedMode={advancedMode}/>
        </div>
    )
}

export default SideBar