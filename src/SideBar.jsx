// SideBar layout

console.log('SideBar loaded')

import InfoSimple from './InfoSimple'
import InfoDetail from './InfoDetail'

const ShowSidebar = ({selectedFeature, advancedMode}) => {
    console.log('ShowSidebar/advancedMode', advancedMode)
    if (advancedMode) {
        console.log('return advanced sidebar')
        return (
        <div className='sidebar advancedMode'>
                <InfoDetail selectedFeature={selectedFeature} />
        </div>
        )
    }
    console.log('return simple sidebar')
    return (
        <div className='sidebar advancedMode'>
                <InfoSimple selectedFeature={selectedFeature} />
        </div>
        )
}

const SideBar = ({selectedFeature, advancedMode=false}) => {
    console.log('SideBar/selectedFeature', selectedFeature)
    if(selectedFeature == undefined) {
        return <></>
    }
    return (
        <ShowSidebar selectedFeature={selectedFeature} advancedMode={advancedMode}/>
    )
}

export default SideBar