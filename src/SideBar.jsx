// SideBar layout

console.log('SideBar loaded')

// import InfoDetail from './InfoDetail'

const ShowSidebar = ({advancedMode}) => {
    console.log('ShowSidebar/advancedMode', advancedMode)
    if (advancedMode) {
        console.log('return sidebar')
        // return(<></>)
        return (
        <div className='sidebar advancedMode'>
                Advanced mode
        </div>
        )
    }
    console.log('dont return sidebar')
    // return (<div className='sidebar basicMode'>standard mode</div>)
    return(<></>)
}

const SideBar = ({advancedMode=true}) => {
    console.log('In sidebar')
    return (<ShowSidebar advancedMode={advancedMode}/>)
}

export default SideBar