console.log('InfoIntersections loaded')

function format (name, value) {
    let icon
    if (value == 'yes') {
        icon = "&#x1f602"
    }
}

const InfoIntersections = ({selectedFeature}) => {
    console.log('InfoIntersections/selectedFeature:', selectedFeature)

    const {
        name,
        description,
    } = selectedFeature.properties


    return (
        <div>
            <h1 className='tableStreetName'>{name}</h1>
            <h2>Intersection Details</h2>
            <p>{description}</p>
            </div>
    )
}

export default InfoIntersections