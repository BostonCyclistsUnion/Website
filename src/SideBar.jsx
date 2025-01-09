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

const SideBar = ({selectedFeature, advancedMode=false}) => {
    console.log('SideBar/selectedFeature', selectedFeature)
    if(selectedFeature == undefined) {
        return (
        <>
            <p>Click a street segment to learn more about it</p>
        </>
        )
    }
    return (
        <ShowSidebar selectedFeature={selectedFeature} advancedMode={advancedMode}/>
    )
}

export default SideBar