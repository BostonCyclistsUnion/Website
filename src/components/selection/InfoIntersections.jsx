import { Link } from 'react-router-dom';

console.log('InfoIntersections loaded')

function formatDetails (name, value) {
    console.log(name, value)
    let icon // https://dreamyguy.github.io/react-emojis/
    let text
    if (value == 'Yes') {
        icon = '✔️'
        text = icon + ' All ' + name
    } else if (value == 'Partial') {
        icon = '⚠️'
        text = icon + ' Some ' + name
    } else if (value == 'No') {
        icon = '❌'
        text = icon + ' No ' + name
    } else {
        console.log('return nothing')
        return ''
    }

    // console.log(text)
    return text

}

const InfoIntersections = ({selectedFeature}) => {
    console.log('InfoIntersections/selectedFeature:', selectedFeature)

    const {
        name,
        ProtectedBikeLanes,
        ProtectedCorners,
        DaylitCrosswalks,
        projectName,
        projectLink,
        notes,
    } = selectedFeature.properties


    return (
        <div>
            <h1 className='tableStreetName'>{name}</h1>
            <h2>Intersection Details</h2>
            {ProtectedBikeLanes && <p>{formatDetails('Bike Lanes Separated', ProtectedBikeLanes)}</p>}
            {ProtectedCorners && <p>{formatDetails('Corners Protected', ProtectedCorners)}</p>}
            {DaylitCrosswalks && <p>{formatDetails('Crosswalks Daylit', DaylitCrosswalks)}</p>}
            {projectName && <p>Project: <Link to={projectLink}>{projectName}</Link></p>}
            {notes && <p>{notes}</p>}
        </div>
    )
}

export default InfoIntersections