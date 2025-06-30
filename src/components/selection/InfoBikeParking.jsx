console.log('InfoBikeParking loaded')


const InfoBikeParking = ({selectedFeature}) => {
    console.log('InfoBikeParking/selectedFeature:', selectedFeature)

    const {
      bicycle_parking,
      capacity,
      covered,
      id,
      indoor,
      access
    } = selectedFeature.properties

    const osmidurl = "https://www.openstreetmap.org/" + id.toString()

    return (
        <div>
            <h1 className='tableStreetName'>Bike Parking Details</h1>
            <div className='tableContainer'>
                <table>
                    <tbody className='tableBox'>
                        {bicycle_parking && <tr>
                            <td className='tableDescription'>Parking Style</td>
                            <td className='tableValue'>{bicycle_parking}</td>
                        </tr>}
                        {capacity && <tr>
                            <td className='tableDescription'>Capacity</td>
                            <td className='tableValue'>{capacity}</td>
                        </tr>}
                        {/* <tr>
                            <td className='tableDescription'>Cargo Bike Capacity</td>
                            <td className='tableValue'>{capacity}</td>
                        </tr> */}
                        {covered && <tr>
                            <td className='tableDescription'>Covered?</td>
                            <td className='tableValue'>{covered}</td>
                        </tr>}
                        {indoor && <tr>
                            <td className='tableDescription'>Indoor?</td>
                            <td className='tableValue'>{indoor}</td>
                        </tr>}
                        {access && <tr>
                            <td className='tableDescription'>Access</td>
                            <td className='tableValue'>{access}</td>
                        </tr>}
                        <tr>
                            <td className='tableDescription'>OSM id</td>
                            <td className='tableValue'><a href={osmidurl} target="_blank">{id.substring(id.search('/')+1)}</a></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
    )
}

export default InfoBikeParking