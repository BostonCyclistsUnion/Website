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



const Legend = ({
  colorScale,
  lts_display,
  lts1_display,
  lts2_display,
  lts3_display,
  lts4_display,
  handleLTS1,
  handleLTS2,
  handleLTS3,
  handleLTS4,
}) => {
    // console.log('Legend')

    // console.log(colorScale)
    const style_lts1 = {borderColor: colorScale[0]}
    const style_lts2 = {borderColor: colorScale[1]}
    const style_lts3 = {borderColor: colorScale[2]}
    const style_lts4 = {borderColor: colorScale[3]}
    const style_off = {borderColor: 'white'}
    

    const borderStyle = ({}) => {
      return ({borderColor: '#63B281'})
    }

    return(
    <div className="legend grid-container">
      {/* LTS Legend, display only when LTS is shown */}
      {lts_display && <div>
        <div className="legend-header-hover">
          <img src={logo_stressmap} alt='Legend' className='hover-image'/>
        </div>
        
        <button className='legend-row' style={lts1_display ? style_lts1 : style_off} onClick={handleLTS1}>
          <div className="legend-icon">
            <img src={icon_lts1} alt='LTS 1' className='default-image'/>
            <img src={icon_lts1} alt='LTS 1' className='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts1} alt='Carefree riding' className='hover-image'/>
          </div>
        </button>

        <button className='legend-row' style={lts2_display ? style_lts2 : style_off} onClick={handleLTS2}>
          <div className="legend-icon">
            <img src={icon_lts2} alt='LTS 2' className='default-image'/>
            <img src={icon_lts2} alt='LTS 2' className='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts2} alt='Easy going riding' className='hover-image'/>
          </div>
        </button>

        <button className='legend-row' style={lts3_display ? style_lts3 : style_off} onClick={handleLTS3}>
          <div className="legend-icon">
            <img src={icon_lts3} alt='LTS 3' className='default-image'/>
            <img src={icon_lts3} alt='LTS 3' className='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts3} alt='Stressful riding' className='hover-image'/>
          </div>
        </button>

        <button className='legend-row' style={lts4_display ? style_lts4 : style_off} onClick={handleLTS4}>
          <div className="legend-icon">
            <img src={icon_lts4} alt='LTS 4' className='default-image'/>
            <img src={icon_lts4} alt='LTS 4' className='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts4} alt='White knuckle riding' className='hover-image'/>
          </div>
        </button>
    </div>}
    </div>
    )
}

export default Legend

