/*
 * This file configures the text on the page describing our use of OSM and how they can contribute.
 *
 * Each object in the OSMPageText array will be built into a section on
 * the landing page that has a title, subheading, and paragraph section.
 *
 * All fields are optional. If a value is not present in the object,
 * it will not be rendered on the page.
 */

import { Link } from 'react-router-dom';
import { 
    LTS_PAGE_ROUTE, 
    MAP_PAGE_ROUTE, 
    LABS_PAGE_ROUTE, 
    // OSM_PAGE_ROUTE 
        } from '../../routes/routes.jsx';

const OSMPageText = [
    {
        title: 'What is OpenStreetMaps?',
        paragraph: [
            <Link to="https://www.openstreetmap.org">OpenStreetMap (OSM)</Link>,
            ' is the data source for the calculations used to rate each street segment on our ',
            <Link to={MAP_PAGE_ROUTE}>Stress Map</Link>,
            '. OSM is an incredible resource, much like Wikipedia, that is volunteer-edited to add details and keep the map current to changes (e.g. new bike lanes being installed). By editing the map directly, you will make the Stress Map more accurate, and you will improve the baseline data used in most of your favorite bike and navigation apps, including ',
            <Link to="https://account.bluebikes.com/map">BlueBikes</Link>,
            ', ',
            <Link to="https://www.strava.com/">Strava</Link>,
            ', ',
            <Link to="https://ridewithgps.com/">RideWithGPS</Link>,
            ', ',
            <Link to="https://geovelo.app/en/route/?bike-type=own&c=-71.057045%2C42.340951&e-bike=false&z=11.07">GeoVelo</Link>,
            ', ',
            <Link to="https://www.bikepointz.com/qr-code">Pointz</Link>,
            ', and many more.'
        ],
    },
    {
        title: 'Want to help improve our map?',
        paragraph: [
            'If you are interested in the type of projects we are working on, ',
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLSefzxEQ-CAbJd_rrt90DHvdglYvP9RLqdDUVsFq28onw9xXJQ/viewform" >join us at BCU Labs!</Link>,
            ' Any and all levels of experience are welcomed. We are always looking for new volunteers that are interested in data-backed analysis and storytelling.'
        ],
    },
    {
        title: 'Recommended Map Editing Tools',
        paragraph: 'These are some of the tools that the BCU Labs team has experience with to edit OpenStreetMap. Each of these tools has different strengths for different types of editing and you may find value using multiple of them.',
        list: [
            <Link to="https://www.openstreetmap.org/">OpenStreetMap.org</Link>,
            <Link to="https://streetcomplete.app/">StreetComplete (Android only, beginner friendly)</Link>,
            <Link to="https://mapcomplete.org/">MapComplete</Link>,
            <Link to="https://overpass-turbo.eu/">OverpassTurbo</Link>,
            <Link to="https://josm.openstreetmap.de/">JOSM</Link>,
            <Link to="https://vespucci.io/">Vespucci (Android only)</Link>,
        ]
    },
    {
        title: 'Tags we use',
        paragraph: [
            'OSM data is organized as ways (street segments) that have attributes attached to them called ',
            <Link to="https://wiki.openstreetmap.org/wiki/Tags">tags</Link>,
            '. These tags contain a key and a value. This is the data that we are able to use to calculate the ',
            <Link to={LTS_PAGE_ROUTE}>Level of Traffic Stress (LTS)</Link>,
            ' of each street segment. ',
            'You can see exactly what tags we use ',
            <Link to="https://github.com/BostonCyclistsUnion/StressMap/tree/main/config">here</Link>,
            ' and a general overview of which tags are most important for our calculations below. '
        ]
    },
    {
        paragraph: [
            'Some of the tags are on nearly every segment while others are more rare. For many segments, a tag is missing that we need to be able to calculate the LTS. In these cases we make assumptions based on the other tags. Adding the proper tags when our assumptions are wrong will result in a more accurate calculation.',
        ],
        list: [
            [<Link to="https://wiki.openstreetmap.org/Key:highway">highway</Link>, ": Describes the type of road"],
            [<Link to="https://wiki.openstreetmap.org/Key:cycleway">cycleway</Link>, ': Describes the type of bike lane. Sub-tags add details about bike lane, including width and separation'],
            [<Link to="https://wiki.openstreetmap.org/Key:footway">footway</Link>, ': Type of pedestrian path. May have complementing tags to allow bikes'],
            [<Link to="https://wiki.openstreetmap.org/Key:parking">parking</Link>, ': Is there street parking?'],
            [<Link to="https://wiki.openstreetmap.org/Key:width">width</Link>, ': Width of the roadway'],
            [<Link to="https://wiki.openstreetmap.org/Key:oneway">oneway</Link>, ': Is the street a oneway?'],
            [<Link to="https://wiki.openstreetmap.org/Key:bicycle">bicycle</Link>, ': Are bicycles allowed on the way?'],
            [<Link to="https://wiki.openstreetmap.org/Key:access">access</Link>, ': Is the public allowed here?'],
            [<Link to="https://wiki.openstreetmap.org/Key:service">service</Link>, ': Alleys and driveways'],
            [<Link to="https://wiki.openstreetmap.org/Key:lane_markings">lane_markings</Link>, ': Are lane lines painted? Used to estimate daily car traffic'],
            [<Link to="https://wiki.openstreetmap.org/Key:lanes">lanes</Link>, ': Number of lanes'],
        ]
    }
]

export default OSMPageText
