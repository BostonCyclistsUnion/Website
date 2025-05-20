// Layout for basic LTS info

console.log('InfoSimple loaded')

import Bearing from './Bearing';
import TextLTS from './TextLTS';
import StringOut from './StringOut';

const InfoSimple = ({selectedFeature}) => {
    console.log('InfoSimple/selectedFeature:', selectedFeature)
    const {
      name,
    //   highway,
      LTS,
      LTS_fwd,
      LTS_rev,
      bike_allowed_fwd,
      bike_allowed_rev,
      bike_lane_fwd,
      bike_lane_rev,
      separation_fwd,
      separation_rev,
      oneway,
      osmid,
      speed, speed_rule
    } = selectedFeature.properties

    const start = selectedFeature.geometry.coordinates[0]
    const end = selectedFeature.geometry.coordinates.at(-1)
    // console.log('selectedFeature.geometry.coordinates', selectedFeature.geometry.coordinates)

    
    var allowed_fwd
    var allowed_rev
    if (typeof(bike_allowed_fwd) === 'string') {
        allowed_fwd = (bike_allowed_fwd === 'True');
        allowed_rev = (bike_allowed_rev === 'True');
    } else if (typeof(bike_allowed_fwd) === 'boolean') {
        allowed_fwd = bike_allowed_fwd;
        allowed_rev = bike_allowed_rev;
    }

    const dir_fwd = <Bearing start={start} end={end}/>
    const dir_rev = <Bearing start={start} end={end} inverse={true}/>

    let bike_lane_fwd_str = StringOut(bike_lane_fwd);
    let bike_lane_rev_str = StringOut(bike_lane_rev);
    let separation_fwd_str = StringOut(separation_fwd);
    let separation_rev_str = StringOut(separation_rev);

    console.log('name:', name, '| osmid', osmid, typeof(osmid))

    console.log('bike_allowed_fwd:', bike_allowed_fwd, typeof(bike_allowed_fwd), ' | bike_allowed_rev:', bike_allowed_rev, typeof(bike_allowed_rev))
    console.log('allowed_fwd:', allowed_fwd, typeof(allowed_fwd), ' | allowed_rev:', allowed_rev, typeof(allowed_rev))
    console.log('bike_lane_fwd:', bike_lane_fwd, typeof(bike_lane_fwd), ' | bike_lane_rev:', bike_lane_rev, typeof(bike_lane_rev))
    console.log('separation_fwd:', separation_fwd, typeof(separation_fwd), ' | separation_rev:', separation_rev, typeof(separation_rev))
    console.log('LTS:', LTS, typeof(LTS), '| LTS_fwd:', LTS_fwd, typeof(LTS_fwd), ' | LTS_rev:', LTS_rev, typeof(LTS_rev))
    console.log('oneway:', oneway, typeof(oneway))


    return (
        <div>
            <h1 className='tableStreetName'>{name}</h1>
            <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        {allowed_rev && <th>{dir_rev}</th>}
                        {allowed_fwd && <th>{dir_fwd}</th>}
                    </tr>
                </thead>

                <tbody className='tableBox'>
                    <tr><td className='tableDescription' colSpan="2">Biking Stress Level</td></tr>
                    <tr>
                        {allowed_rev && <td className='tableValue'><TextLTS ltsValue={LTS_rev} /></td>}
                        {allowed_fwd && <td className='tableValue'><TextLTS ltsValue={LTS_fwd} /></td>}
                    </tr>

                    <tr><td className='tableDescription' colSpan="2">Bike Lane</td></tr>
                    <tr>
                        {allowed_rev && <td className='tableValue'>{bike_lane_rev_str}</td>}
                        {allowed_fwd && <td className='tableValue'>{bike_lane_fwd_str}</td>}
                    </tr>

                    <tr><td className='tableDescription' colSpan="2">Bike Lane Separation</td></tr>
                    <tr>
                        {allowed_rev && <td className='tableValue'>{separation_rev_str}</td>}
                        {allowed_fwd && <td className='tableValue'>{separation_fwd_str}</td>}
                    </tr>

                    <tr><td className='tableDescription' colSpan="2">Prevailing Automobile Speed</td></tr>
                        <tr><td className='tableValue' colSpan="2">{speed}</td></tr>
                        <tr><td className='notes' colSpan="2">{speed_rule}</td></tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default InfoSimple