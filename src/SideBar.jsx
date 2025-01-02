// SideBar layout

console.log('SideBar entered')

import InfoDetail from './InfoDetail'

const SideBar = ({e}) => {
    return (
    <>
        <div id='sidebar' className='sidebar'>
            <button className='close-button'>
                {/* onClick={handleCloseButton}> */}
                x
            </button>
            <div className='text-2xl text-black font-semibold w-full mb-1.5'>
                Test Sidebar
            </div>
        </div>
    </>
    )
}

export default SideBar