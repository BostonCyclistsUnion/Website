console.log('InfoBluebikes loaded')


const InfoBluebikes = ({selectedFeature}) => {
    console.log('InfoBluebikes/selectedFeature:', selectedFeature)

    const {
        name,
        capacity,
        num_bikes_available,
        num_bikes_disabled,
        num_docks_available,
        num_docks_disabled,
        num_ebikes_available,
    } = selectedFeature.properties


    return (
        <div>
            {/* <h1 className='tableStreetName'>Bluebike Station Details</h1> */}
            <h2 className='tableStreetName'>{name}</h2>
            <div className='tableContainer'>
                <table>
                    <tbody className='tableBox'>
                        <tr>
                            <td className='tableDescription'>Capacity</td>
                            <td className='tableValue'>{capacity}</td>
                        </tr>
                        <tr>
                            <td className='tableDescription'>Available Docks</td>
                            <td className='tableValue'>{num_docks_available}</td>
                        </tr>
                        <tr>
                            <td className='tableDescription'>Available Bikes</td>
                            <td className='tableValue'>{num_bikes_available}</td>
                        </tr>
                        <tr>
                            <td className='tableDescription'>Available E-bikes</td>
                            <td className='tableValue'>{num_ebikes_available}</td>
                        </tr>
                        <tr>
                            <td className='tableDescription'>Disabled Bikes</td>
                            <td className='tableValue'>{num_bikes_disabled}</td>
                        </tr>
                        <tr>
                            <td className='tableDescription'>Disabled Docks</td>
                            <td className='tableValue'>{num_docks_disabled}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
    )
}

export default InfoBluebikes