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
      bike_lane_exist_left,
      bike_lane_exist_right,
      bike_lane_exist_rule_left,
      bike_lane_exist_rule_right,
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
      LTS_biking_permitted_left,
      LTS_biking_permitted_right,
      LTS_bike_lane_separation_left,
      LTS_bike_lane_separation_right,
      LTS_mixed_left,
      LTS_mixed_right,
      LTS_bikelane_noparking_left,
      LTS_bikelane_noparking_right,
      LTS_bikelane_yesparking_left,
      LTS_bikelane_yesparking_right
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
            <tr>
                <td>Bike Lane</td>
                <td>{bike_lane_exist_left}<br /><font color="gray">{bike_lane_exist_rule_left}</font></td>
                <td>{bike_lane_exist_right}<br /><font color="gray">{bike_lane_exist_rule_right}</font></td>
            </tr>
            </>
        }

        if (bike_lane_exist_left == 'no' && bike_lane_exist_right == 'no' && highway != 'footway') return (bikelane)
        
        return (
            <>
            {bikelane}
            <tr>
                <td><font color="gray">{bike_lane_separation_rule_left}</font></td>
                <td><font color="gray">{bike_lane_separation_rule_right}</font></td>
            </tr>
            <tr>
                <td rowSpan="2">Bike Lane Width</td>
                <td>{Number(width_bikelane_left).toFixed(1)}</td>
                <td>{Number(width_bikelane_right).toFixed(1)}</td>
            </tr>
            <tr>
                <td><font color="gray">{width_bikelane_rule_left}</font></td>
                <td><font color="gray">{width_bikelane_rule_right}</font></td>
            </tr>
            <tr>
                <td rowSpan="2">Bike Lane Buffer</td>
                <td>{Number(width_bikelanebuffer_left).toFixed(1)}</td>
                <td>{Number(width_bikelanebuffer_right).toFixed(1)}</td>
            </tr>
            <tr>
                <td><font color="gray">{width_bikelanebuffer_rule_left}</font></td>
                <td><font color="gray">{width_bikelanebuffer_rule_right}</font></td>
            </tr>
            <tr>
                <td>Bike Lane Reach</td>
                <td>{Number(bikelane_reach_left).toFixed(1)}</td>
                <td>{Number(bikelane_reach_right).toFixed(1)}</td>
            </tr>
            </>
        )
    }

    return (
        <div>
            <h1>{name}</h1>
            <p>Road Type: {highway}</p>
            <div className='tableContainer'>
                <table className='tableAdvancedMode'>
                    <thead>
                    <tr>
                        <th>Direction</th>
                        <th><CardinalDirection start={start} end={end}/></th>
                        <th><CardinalDirection start={start} end={end} inverse={true}/></th>
                    </tr>
                    <tr>
                        <th className='notes'>OSM Side</th>
                        <th className='notes'>Left</th>
                        <th className='notes'>Right</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>LTS</b></td>
                        <td><b>{LTS_left}</b></td>
                        <td><b>{LTS_right}</b></td>
                    </tr>
                    <tr>
                        <td colSpan="3"><b>Bike Infrastructure</b></td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Bike Permitted</td>
                        <td>{biking_permitted_left}</td>
                        <td>{biking_permitted_right}</td>
                    </tr>
                    <tr>
                        <td><font color="gray">{biking_permitted_rule_left}</font></td>
                        <td><font color="gray">{biking_permitted_rule_right}</font></td>
                    </tr>
                    <BikeLaneInfo data = {selectedFeature.properties}/>
                    <tr>
                        <td colSpan="3"><b>Street Design for Cars</b></td>
                    </tr>
                    <tr>
                        <td>Oneway</td>
                        <td colSpan="2">{oneway} <font color="gray">{street_narrow_wide}</font></td>
                    </tr>
                    <tr>
                        <td>Street Width</td>
                        <td colSpan="2">{Number(width_street).toFixed(1)} <font color="gray">{width_street_rule}</font></td>
                    </tr>
                    <tr>
                        <td>Parking Width</td>
                        <td>{Number(width_parking_left).toFixed(1)} <font color="gray">{width_parking_rule_left}</font></td>
                        <td>{Number(width_parking_right).toFixed(1)} <font color="gray">{width_parking_rule_right}</font></td>
                    </tr>
                    <tr>
                        <td>Lane Count</td>
                        <td colSpan="2">{lane_count}<br /><font color="gray">{lane_count_rule}</font></td>
                    </tr>
                    <tr>
                        <td>Parking</td>
                        <td>{parking_left}<br /><font color="gray">{parking_rule_left}</font></td>
                        <td>{parking_right}<br /><font color="gray">{parking_rule_right}</font></td>
                    </tr>
                    <tr>
                        <td>Prevailing Speed</td>
                        <td colSpan="2">{speed}<br /><font color="gray">{speed_rule}</font></td>
                    </tr>
                    <tr>
                        <td>Centerline</td>
                        <td colSpan="2">{centerline}<br /><font color="gray">{centerline_rule}</font></td>
                    </tr>
                    <tr>
                        <td>Average Daily Traffic (ADT)</td>
                        <td colSpan="2">{ADT}<br /><font color="gray">{ADT_rule}</font></td>
                    </tr>
                    <tr>
                        <td colSpan="3"><b>Technical Info</b></td>
                    </tr>
                    <tr>
                        <td>OSMid</td>
                        <td colSpan="2"><a href={osmidurl} target="_blank">{osmid}</a></td>
                    </tr><tr>
                        <td>LTS_biking_permitted</td>
                        <td>{LTS_biking_permitted_left}</td>
                        <td>{LTS_biking_permitted_right}</td>
                    </tr>
                    <tr>
                        <td>LTS_bike_lane_separation</td>
                        <td>{LTS_bike_lane_separation_left}</td>
                        <td>{LTS_bike_lane_separation_right}</td>
                    </tr>
                    <tr>
                        <td>LTS_mixed</td>
                        <td>{LTS_mixed_left}</td>
                        <td>{LTS_mixed_right}</td>
                    </tr>
                    <tr>
                        <td>LTS_bikelane_noparking</td>
                        <td>{LTS_bikelane_noparking_left}</td>
                        <td>{LTS_bikelane_noparking_right}</td>
                    </tr>
                    <tr>
                        <td>LTS_bikelane_yesparking</td>
                        <td>{LTS_bikelane_yesparking_left}</td>
                        <td>{LTS_bikelane_yesparking_right}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default InfoDetail