// Card Layout, used in both Map Popups and in the List view
// import PropTypes from 'prop-types'
// import numeral from 'numeral'
// import classNames from 'classnames'

console.log('SimpleCard entered')

const SimpleCard = ({e}) => {
    console.log('simpleCard entered')
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
      bike_lane_exist_rule_right
    } = e.features[0].properties


    return (
        <div>
            <h1>{name}</h1>
            <p>Road Type: {highway}</p>
            <table>
                <tr>
                    <th>Value</th>
                    <th>Left</th>
                    <th>Right</th>
                </tr>
                <tr>
                    <td><b>LTS</b></td>
                    <td><b>{LTS_left}</b></td>
                    <td><b>{LTS_right}</b></td>
                </tr>
                <tr>
                    <td colspan="3"><b>Bike Infrastructure</b></td>
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
            </table>
        </div>
    )
}

export default SimpleCard



// export default function simpleCard ({ }) {
//     return (
//         <div>
//             console.log('simpleCard entered')
//             <h1>Test Header</h1>
//         </div>
        

//     );
// }