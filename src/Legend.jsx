// Create the map's legend

console.log('Legend loaded')

import icon_lts1 from '/Icon_LTS1.svg'
import icon_lts2 from '/Icon_LTS2.svg'
import icon_lts3 from '/Icon_LTS3.svg'
import icon_lts4 from '/Icon_LTS4.svg'
import text_lts1 from '/Text_LTS1.svg'
import text_lts2 from '/Text_LTS2.svg'
import text_lts3 from '/Text_LTS3.svg'
import text_lts4 from '/Text_LTS4.svg'
import logo_stressmap from '/BikeStressMap.svg'

const Legend = ({LEGEND_HEIGHT_DEFAULT, LEGEND_HEIGHT_HOVER}) => {
    console.log('Legend')

    return(
        <div className="legend grid-container">
            <div className="legend-header-hover">
              <img src={logo_stressmap} alt='Legend' className='hover-image'/>
            </div>
            
            <div className="legend-icon">
              <img src={icon_lts1} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 1' className='default-image'/>
              <img src={icon_lts1} height={LEGEND_HEIGHT_HOVER} alt='LTS 1' className='hover-image'/>
            </div>
            <div className="legend-text">
              <img src={text_lts1} height={LEGEND_HEIGHT_HOVER} alt='Carefree riding' className='hover-image'/>
            </div>

            <div className="legend-icon">
              <img src={icon_lts2} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 2' className='default-image'/>
              <img src={icon_lts2} height={LEGEND_HEIGHT_HOVER} alt='LTS 2' className='hover-image'/>
            </div>
            <div className="legend-text">
              <img src={text_lts2} height={LEGEND_HEIGHT_HOVER} alt='Easy going riding' className='hover-image'/>
            </div>

            <div className="legend-icon">
              <img src={icon_lts3} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 3' className='default-image'/>
              <img src={icon_lts3} height={LEGEND_HEIGHT_HOVER} alt='LTS 3' className='hover-image'/>
            </div>
            <div className="legend-text">
              <img src={text_lts3} height={LEGEND_HEIGHT_HOVER} alt='Stressful riding' className='hover-image'/>
            </div>

            <div className="legend-icon">
              <img src={icon_lts4} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 4' className='default-image'/>
              <img src={icon_lts4} height={LEGEND_HEIGHT_HOVER} alt='LTS 4' className='hover-image'/>
            </div>
            <div className="legend-text">
              <img src={text_lts4} height={LEGEND_HEIGHT_HOVER} alt='White knuckle riding' className='hover-image'/>
            </div>
        </div>
    )
}

export default Legend

