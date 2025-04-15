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
import { LTS_PAGE_ROUTE, MAP_PAGE_ROUTE, LABS_PAGE_ROUTE, OSM_PAGE_ROUTE } from '../../routes/routes.jsx';

const OSMPageText = [
    {
        title: 'What is OpenStreetMaps?',
        paragraph: 'OpenStreetMap (OSM) is the data source for the calculations used to rate each segment. This is an incredible resource, much like Wikipedia, that is volunteer edited to add details and keep the map current to changes (e.g. new bike lanes being installed). By editing the map directly, you will make the Stress Map more accurate, and you will improve the baseline data used in most of your favorite navigation apps, including the BlueBikes app, Strava, RideWithGPS, GeoVelo, Pointz, and many more.',
    },
    {
        title: 'Want to help improve our map?',
        paragraph: 'If you are interested in the type of projects we are working on, join us at BCU Labs! [link] Any and all levels of experience are welcomed. We are always looking for new volunteers that are interested in data-backed analysis and storytelling. Check out what we are working on in GitHub. [link]',
    },
    {
        title: 'Recommended Map Editing Tools',
        paragraph: 'These are some of the tools that the BCU Labs team has experience with to make improvements to OpenStreetMap. There are numerous other tools if you find improving the map a fun hobby, with different strengths for different types of editing.'
    }
{/* <Collapsible header= titleClassName='head1'>
        
                <Collapsible header='StreetComplete (Android only, beginner friendly)' titleClassName='head4'>
                    <p>
                    https://streetcomplete.app/
                    </p>
                </Collapsible>
                <Collapsible header='OpenStreetMap.org' titleClassName='head4'>
                    <p>
                    https://www.openstreetmap.org/
                    </p>
                </Collapsible>
                <Collapsible header='MapComplete' titleClassName='head4'>
                    <p>
                    https://mapcomplete.org/
                    </p>
                </Collapsible>
                <Collapsible header='OverpassTurbo' titleClassName='head4'>
                    <p>
                    https://overpass-turbo.eu/ 
                    </p>
                </Collapsible>
                <Collapsible header='JOSM' titleClassName='head4'>
                <h4>JOSM</h4>
                    <p>
                    
                    </p>
                </Collapsible>
                <Collapsible header='Vespucci' titleClassName='head4'></Collapsible>
                    <p>
                    
                    </p>
                </Collapsible>
            <h3>Tags we use</h3>
                <p>
                OSM data is organized as ways (street segments) that have attributes attached to 
                them called tags. These tags contain a key and a value. This is the data that we are 
                able to use to calculate the LTS of each street segment. You can see exactly what 
                tags we use here[link] and a general overview of which tags are most important for 
                our calculations below. Some of the tags are on nearly every segment while others 
                are more rare. For many segments, a tag is missing that we need to be able to 
                calculate the LTS, in these cases we make assumptions based on the other tags about 
                what the most common situation is. In these cases, adding the proper tags when our 
                assumptions are wrong will result in a more accurate calculation.
                </p>
                <ul>
                <li>highway: Describes the type of road</li>
                <li>cycleway: Describes the type of bike lane. Sub-tags add details about bike lane, 
                    including width and separation</li>
                <li>footway: Type of pedestrian path. May have complementing tags to allow bikes</li>
                <li>parking: Is there street parking?</li>
                <li>width: Width of the roadway</li>
                <li>oneway: Is the street a oneway?</li>
                <li>bicycle: Are bicycles allowed on the way?</li>
                <li>access: Is the public allowed here?</li>
                <li>service: Alleys and driveways</li>
                <li>lane_markings: Are lane lines painted? Used to estimate daily car traffic</li>
                <li>lanes: Number of lanes</li>
                </ul>
                
        </Collapsible> */}
]

export default OSMPageText
