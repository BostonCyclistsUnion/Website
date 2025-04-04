// Layout for advanced data view of LTS info
console.log('InfoDetail loaded')

import Bearing from './Bearing';

const InfoDetail = ({selectedFeature}) => {
    console.log('InfoDetail/selectedFeature:', selectedFeature)
    const {
      name,
      highway,
      LTS_fwd, LTS_rev,
      bike_allowed_fwd, bike_allowed_rev,
      osmid,
      oneway,
      street_narrow_wide,
      width_street,
      width_street_rule,
      width_parking_rev,
      width_parking_fwd,
      lane_count,
      lane_count_rule,
      parking_fwd, parking_rev,
      speed,
      speed_rule,
      centerline,
      centerline_rule,
      ADT,
      ADT_rule,
    } = selectedFeature.properties

    const start = selectedFeature.geometry.coordinates[0]
    const end = selectedFeature.geometry.coordinates[1]

    const osmidurl = "https://www.openstreetmap.org/way/" + osmid.toString()

    const allowed_fwd = (bike_allowed_fwd === 'True');
    const allowed_rev = (bike_allowed_rev === 'True');

    const BikeLaneInfo = ({data}) => {
        const {highway, bike_lane_fwd, bike_lane_rev, 
            separation_fwd, separation_rev,
            bike_width_fwd, bike_width_rev,
            bike_width_rule_fwd, bike_width_rule_rev,
            buffer_fwd, buffer_rev,
            buffer_rule_fwd, buffer_rule_rev,
            bike_reach_fwd, bike_reach_rev} = data
        console.log('bike_lane_fwd:', bike_lane_fwd, 'bike_lane_rev:', bike_lane_rev)

        let bikelane = ''

        if (!(bike_lane_fwd != 'no' || bike_lane_rev != 'no') && (highway == 'footway' || highway == 'cycleway' || highway == 'service')) {
            return (<></>)
        } else {
            bikelane = <>
            <tr><td className='tableDescription' colSpan="2">Bike Lane</td></tr>
            <tr>
                {allowed_rev && <td className='tableValue'>{bike_lane_rev}</td>}
                {allowed_fwd && <td className='tableValue'>{bike_lane_fwd}</td>}
            </tr>
            </>
        }

        if (bike_lane_fwd == 'no' && bike_lane_rev == 'no' && highway != 'footway') return (bikelane)
        
        return (
            <>
            {bikelane}
            <tr>
                {allowed_rev && <td className='notes'>{separation_rev}</td>}
                {allowed_fwd && <td className='notes'>{separation_fwd}</td>}
            </tr>
            <tr><td className='tableDescription' colSpan="2">Bike Lane Width</td></tr>
            <tr>
                {allowed_rev && <td className='tableValue'>{Number(bike_width_rev).toFixed(1)}</td>}
                {allowed_fwd && <td className='tableValue'>{Number(bike_width_fwd).toFixed(1)}</td>}
            </tr>
            <tr>
                {allowed_rev && <td className='notes'>{bike_width_rule_rev}</td>}
                {allowed_fwd && <td className='notes'>{bike_width_rule_fwd}</td>}
            </tr>
            <tr><td className='tableDescription' colSpan="2">Bike Lane Buffer</td></tr>
            <tr>
                {allowed_rev && <td className='tableValue'>{Number(buffer_rev).toFixed(1)}</td>}
                {allowed_fwd && <td className='tableValue'>{Number(buffer_fwd).toFixed(1)}</td>}
            </tr>
            <tr>
                {allowed_rev && <td className='notes'>{buffer_rule_rev}</td>}
                {allowed_fwd && <td className='notes'>{buffer_rule_fwd}</td>}
            </tr>
            <tr><td className='tableDescription' colSpan="2">Bike Lane Reach</td></tr>
            <tr>
                {allowed_rev && <td className='tableValue'>{Number(bike_reach_rev).toFixed(1)}</td>}
                {allowed_fwd && <td className='tableValue'>{Number(bike_reach_fwd).toFixed(1)}</td>}
            </tr>
            </>
        )
    }

    const LTSInfo = ({data}) => {
        const {
            LTS_bike_access_fwd, LTS_bike_access_rev,
            LTS_mixed_fwd, LTS_mixed_rev,
            LTS_bikelane_noparking_rev, LTS_bikelane_noparking_fwd, 
            LTS_bikelane_yesparking_rev, LTS_bikelane_yesparking_fwd
        } = data

        const bike_access = ['Biking Access', LTS_bike_access_rev, LTS_bike_access_fwd]
        const mixed = ['Mixed Traffic', LTS_mixed_rev, LTS_mixed_fwd]
        const bikelane_noparking = ['Bike lane without street parking', LTS_bikelane_noparking_rev, LTS_bikelane_noparking_fwd]
        const bikelane_yesparking = ['Bike lane with street parking', LTS_bikelane_yesparking_rev, LTS_bikelane_yesparking_fwd]

        let ltsRow = []
        for (const ltsType of [mixed, bike_access, bikelane_noparking, bikelane_yesparking]) {
            console.log(ltsType[0], (typeof ltsType[1] !== 'undefined'), (typeof ltsType[2] !== 'undefined'))
            if ((typeof ltsType[1] !== 'undefined') || (typeof ltsType[2] !== 'undefined')) {
                ltsRow.push([<>
                    <tr><td className='tableDescription' colSpan="2">{ltsType[0]}</td></tr>
                    <tr>
                        {allowed_rev && <td className='tableValue'>{ltsType[1]}</td>}
                        {allowed_fwd && <td className='tableValue'>{ltsType[2]}</td>}
                    </tr>
                    </>])
            }
        }
        console.log('lts row', ltsRow)
        return ltsRow
    }
    return (
        <div>
            <h1 className='tableStreetName'>{name}</h1>
            <div className='tableContainer'>
                <table className='tableAdvancedMode'>
                    <thead>
                        <tr>
                            {allowed_rev && <th><Bearing start={start} end={end} inverse={true}/></th>}
                            {allowed_fwd && <th><Bearing start={start} end={end}/></th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className='tableDescription' colSpan="2">LTS</td></tr>
                        <tr>
                            {allowed_rev && <td className='tableValue'><b>{LTS_rev}</b></td>}
                            {allowed_fwd && <td className='tableValue'><b>{LTS_fwd}</b></td>}
                        </tr>
                        <tr><td className='tableSection' colSpan="2">Bike Infrastructure</td></tr>
                        <tr><td className='tableDescription' colSpan="2">Bike Permitted</td></tr>
                        <tr>
                            {allowed_rev && <td className='tableValue'>{bike_allowed_rev}</td>}
                            {allowed_fwd && <td className='tableValue'>{bike_allowed_fwd}</td>}
                        </tr>
                        <BikeLaneInfo data = {selectedFeature.properties}/>

                        <tr><td className='tableSection' colSpan="2">Street Design for Cars</td></tr>
                        <tr><td className='tableDescription' colSpan="2">Road Designation</td></tr>
                        <tr>
                            <td className='tableValue' colSpan="2">{highway}</td>
                        </tr>
                        <tr><td className='tableDescription' colSpan="2">Oneway</td></tr>
                        <tr>
                            <td className='tableValue' colSpan="2">{oneway} {street_narrow_wide}</td>
                        </tr>
                        <tr><td className='tableDescription' colSpan="2">Street Width</td></tr>
                        <tr><td className='tableValue' colSpan="2">{Number(width_street).toFixed(1)}</td></tr>
                        <tr><td className='notes' colSpan="2">{width_street_rule}</td></tr>

                        <tr><td className='tableDescription' colSpan="2">Parking Width</td></tr>
                        <tr>
                            {allowed_rev && <td className='tableValue'>{Number(width_parking_rev).toFixed(1)}</td>}
                            {allowed_fwd && <td className='tableValue'>{Number(width_parking_fwd).toFixed(1)}</td>}
                        </tr>
                        
                        <tr><td className='tableDescription' colSpan="2">Lane Count</td></tr>
                        <tr><td className='tableValue' colSpan="2">{lane_count}</td></tr>
                        <tr><td className='notes' colSpan="2">{lane_count_rule}</td></tr>

                        <tr><td className='tableDescription' colSpan="2">Parking</td></tr>
                        <tr>
                            {allowed_rev && <td className='tableValue'>{parking_rev}</td>}
                            {allowed_fwd && <td className='tableValue'>{parking_fwd}</td>}
                        </tr>

                        <tr><td className='tableDescription' colSpan="2">Prevailing Speed</td></tr>
                        <tr><td className='tableValue' colSpan="2">{speed}</td></tr>
                        <tr><td className='notes' colSpan="2">{speed_rule}</td></tr>

                        <tr><td className='tableDescription' colSpan="2">Centerline</td></tr>
                        <tr><td className='tableValue' colSpan="2">{centerline}</td></tr>
                        <tr><td className='notes' colSpan="2">{centerline_rule}</td></tr>
                        
                        <tr><td className='tableDescription' colSpan="2">Average Daily Traffic (ADT)</td></tr>
                        <tr><td className='tableValue' colSpan="2">{ADT}</td></tr>
                        <tr><td className='notes' colSpan="2">{ADT_rule}</td></tr>

                        <tr><td className='tableSection' colSpan="2">LTS Calculations</td></tr>
                        <LTSInfo data = {selectedFeature.properties}/>
                        
                        <tr><td className='tableSection' colSpan="2">Technical Info</td></tr>
                        <tr><td className='tableDescription' colSpan="2">OSMid</td></tr>
                        <tr>
                            <td className='tableValue' colSpan="2"><a href={osmidurl} target="_blank">{osmid}</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default InfoDetail