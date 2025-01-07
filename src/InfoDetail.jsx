// Layout for advanced data view of LTS info
console.log('InfoDetail loaded')

// import CardinalDirection from './InfoSimple'


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
      osmid
    } = selectedFeature.properties

    const start = selectedFeature.geometry.coordinates[0]
    const end = selectedFeature.geometry.coordinates[1]

    const osmidurl = "https://www.openstreetmap.org/way/" + osmid.toString()

    return (
        <div>
            <h1>{name}</h1>
            <h2>More Detailed Info Here!</h2>
            <p>Road Type: {highway}</p>
            <table>
                <tbody>
                <tr>
                    <th>OSM Side</th>
                    <th>Left</th>
                    <th>Right</th>
                </tr>
                {/* <tr>
                    <th>Direction</th>
                    <th><CardinalDirection start={start} end={end}/></th>
                    <th><CardinalDirection start={start} end={end} inverse={true}/></th>
                </tr> */}
                <tr>
                    <td><b>LTS</b></td>
                    <td><b>{LTS_left}</b></td>
                    <td><b>{LTS_right}</b></td>
                </tr>
                <tr>
                    <td colSpan="3"><b>Bike Infrastructure</b></td>
                </tr>
                <tr>
                    <td>Bike Permitted</td>
                    <td>{biking_permitted_left} <font color="gray">{biking_permitted_rule_left}</font></td>
                    <td>{biking_permitted_right} <font color="gray">{biking_permitted_rule_right}</font></td>
                </tr>
                <tr>
                    <td>Bike Lane</td>
                    <td>{bike_lane_exist_left} <font color="gray">{bike_lane_exist_rule_left}</font></td>
                    <td>{bike_lane_exist_right} <font color="gray">{bike_lane_exist_rule_right}</font></td>
                </tr>
                <tr>
                    <td>OSMid</td>
                    <td><a href={osmidurl} target="_blank">{osmid}</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}


export default InfoDetail