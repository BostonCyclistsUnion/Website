// Layout for advanced data view of LTS info
console.log('InfoDetail loaded')

import {CardinalDirection} from './InfoSimple'


const InfoDetail = ({selectedFeature}) => {
    console.log('InfoDetail/selectedFeature:', selectedFeature)
    const {
      name,
      highway,
      LTS_left,
      LTS_right,
      biking_permitted_left,
      biking_permitted_right,
      biking_permitted_rule_left,
      biking_permitted_rule_right,
      osmid,
      oneway,
      street_narrow_wide,
      width_street,
      width_street_rule,
      width_parking_left,
      width_parking_rule_left,
      width_parking_right,
      width_parking_rule_right,
      lane_count,
      lane_count_rule,
      parking_left,
      parking_rule_left,
      parking_right,
      parking_rule_right,
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

    const BikeLaneInfo = ({data}) => {
        const {highway, bike_lane_exist_left, bike_lane_exist_right, 
            bike_lane_exist_rule_left, bike_lane_exist_rule_right,
            bike_lane_separation_left, bike_lane_separation_right,
            bike_lane_separation_rule_left, bike_lane_separation_rule_right,
            width_bikelane_left, width_bikelane_right,
            width_bikelane_rule_left, width_bikelane_rule_right,
            width_bikelanebuffer_left, width_bikelanebuffer_right,
            width_bikelanebuffer_rule_left, width_bikelanebuffer_rule_right,
            bikelane_reach_left, bikelane_reach_right} = data
        console.log('bike_lane_exist_left:', bike_lane_exist_left, 'bike_lane_exist_right:', bike_lane_exist_right)
        // console.log(bike_lane_exist_left == 'no', bike_lane_exist_right == 'no', bike_lane_exist_left == 'no' && bike_lane_exist_right == 'no')

        let bikelane = ''

        if (!(bike_lane_exist_left != 'no' || bike_lane_exist_right != 'no') && (highway == 'footway' || highway == 'cycleway' || highway == 'service')) {
            return (<></>)
        } else {
            bikelane = <>
            <tr><td className='tableDescription' colSpan="2">Bike Lane</td></tr>
            <tr>
                <td className='tableValue'>{bike_lane_exist_left}</td>
                <td className='tableValue'>{bike_lane_exist_right}</td>
            </tr>
            <tr>
                <td className='notes'>{bike_lane_exist_rule_left}</td>
                <td className='notes'>{bike_lane_exist_rule_right}</td>
            </tr>
            </>
        }

        if (bike_lane_exist_left == 'no' && bike_lane_exist_right == 'no' && highway != 'footway') return (bikelane)
        
        return (
            <>
            {bikelane}
            <tr>
                <td className='notes'>{bike_lane_separation_rule_left}</td>
                <td className='notes'>{bike_lane_separation_rule_right}</td>
            </tr>
            <tr><td className='tableDescription' colSpan="2">Bike Lane Width</td></tr>
            <tr>
                <td className='tableValue'>{Number(width_bikelane_left).toFixed(1)}</td>
                <td className='tableValue'>{Number(width_bikelane_right).toFixed(1)}</td>
            </tr>
            <tr>
                <td className='notes'>{width_bikelane_rule_left}</td>
                <td className='notes'>{width_bikelane_rule_right}</td>
            </tr>
            <tr><td className='tableDescription' colSpan="2">Bike Lane Buffer</td></tr>
            <tr>
                <td className='tableValue'>{Number(width_bikelanebuffer_left).toFixed(1)}</td>
                <td className='tableValue'>{Number(width_bikelanebuffer_right).toFixed(1)}</td>
            </tr>
            <tr>
                <td className='notes'>{width_bikelanebuffer_rule_left}</td>
                <td className='notes'>{width_bikelanebuffer_rule_right}</td>
            </tr>
            <tr><td className='tableDescription' colSpan="2">Bike Lane Reach</td></tr>
            <tr>
                <td className='tableValue'>{Number(bikelane_reach_left).toFixed(1)}</td>
                <td className='tableValue'>{Number(bikelane_reach_right).toFixed(1)}</td>
            </tr>
            </>
        )
    }

    const LTSInfo = ({data}) => {
        const {
            LTS_biking_permitted_left, LTS_biking_permitted_right,
            LTS_bike_lane_separation_left, LTS_bike_lane_separation_right,
            LTS_mixed_left, LTS_mixed_right,
            LTS_bikelane_noparking_left, LTS_bikelane_noparking_right, 
            LTS_bikelane_yesparking_left, LTS_bikelane_yesparking_right
        } = data

        const biking_permitted = ['Biking Permitted', LTS_biking_permitted_left, LTS_biking_permitted_right]
        const bike_lane_separation = ['Bike Lane Separation', LTS_bike_lane_separation_left, LTS_bike_lane_separation_right]
        const mixed = ['Mixed Traffic', LTS_mixed_left, LTS_mixed_right]
        const bikelane_noparking = ['Bike lane without street parking', LTS_bikelane_noparking_left, LTS_bikelane_noparking_right]
        const bikelane_yesparking = ['Bike lane with street parking', LTS_bikelane_yesparking_left, LTS_bikelane_yesparking_right]

        let ltsRow = []
        for (const ltsType of [mixed, biking_permitted, bike_lane_separation, bikelane_noparking, bikelane_yesparking]) {
            console.log(ltsType[0], (typeof ltsType[1] !== 'undefined'), (typeof ltsType[2] !== 'undefined'))
            if ((typeof ltsType[1] !== 'undefined') || (typeof ltsType[2] !== 'undefined')) {
                ltsRow.push([<>
                    <tr><td className='tableDescription' colSpan="2">{ltsType[0]}</td></tr>
                    <tr>
                        <td className='tableValue'>{ltsType[1]}</td>
                        <td className='tableValue'>{ltsType[2]}</td>
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
                            <th><CardinalDirection start={start} end={end}/></th>
                            <th><CardinalDirection start={start} end={end} inverse={true}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className='tableDescription' colSpan="2">OSM Side</td></tr>
                        <tr>
                            <th className='tableValue'>Left</th>
                            <th className='tableValue'>Right</th>
                        </tr>
                        <tr><td className='tableDescription' colSpan="2">LTS</td></tr>
                        <tr>
                            <td className='tableValue'><b>{LTS_left}</b></td>
                            <td className='tableValue'><b>{LTS_right}</b></td>
                        </tr>
                        <tr><td className='tableSection' colSpan="2">Bike Infrastructure</td></tr>
                        <tr><td className='tableDescription' colSpan="2">Bike Permitted</td></tr>
                        <tr>
                            <td className='tableValue'>{biking_permitted_left}</td>
                            <td className='tableValue'>{biking_permitted_right}</td>
                        </tr>
                        <tr>
                            <td className='notes'>{biking_permitted_rule_left}</td>
                            <td className='notes'>{biking_permitted_rule_right}</td>
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
                            <td className='tableValue'>{Number(width_parking_left).toFixed(1)}</td>
                            <td className='tableValue'>{Number(width_parking_right).toFixed(1)}</td>
                        </tr>
                        <tr>
                            <td className='notes'>{width_parking_rule_left}</td>
                            <td className='notes'>{width_parking_rule_right}</td>
                        </tr>
                        
                        <tr><td className='tableDescription' colSpan="2">Lane Count</td></tr>
                        <tr><td className='tableValue' colSpan="2">{lane_count}</td></tr>
                        <tr><td className='notes' colSpan="2">{lane_count_rule}</td></tr>

                        <tr><td className='tableDescription' colSpan="2">Parking</td></tr>
                        <tr>
                            <td className='tableValue'>{parking_left}</td>
                            <td className='tableValue'>{parking_right}</td>
                        </tr>
                        <tr>
                            <td className='notes'>{parking_rule_left}</td>
                            <td className='notes'>{parking_rule_right}</td>
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