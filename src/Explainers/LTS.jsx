// Explainer for LTS
import Collapsible from "../Collapsible";
import "../assets/icons.css";

console.log('Explainer/LTS loaded')

const LTS = ({}) => {
    return(<div className="content">
    <Collapsible open header='Getting Started with this map' titleClassName='head1'>
        <Collapsible open header='What is this map?' titleClassName='head2'>
        </Collapsible>
        <Collapsible  header='How to use this map' titleClassName='head2'>
        </Collapsible>
        <Collapsible  header='What if you disagree with a street segment rating?' titleClassName='head2'>
            <p>
            If a street you ride on regularly feels more or less comfortable than how we have rated it, you are probably right! 
            We use OSM for our data and it is very incomplete, forcing us to make some assumptions, meaning we are probably wrong 
            in some places.You can learn to fix the data yourself here [link: improve map], or fill out this form with what you 
            know and the BCU Labs team will bike there ourselves and fix the data.
            </p>
        </Collapsible>            
    </Collapsible>
    <Collapsible header='A deep dive into Level of Traffic Stress' titleClassName='head1'>
        <p>
        Our Stress Map is based on a heuristic concept called Level of Traffic Stress (LTS). This has been developed in part by 
        Prof. Peter Furth of Northeastern University and is commonly used by planning and engineering professionals. Our 
        implementation attempts to calculate the most current version, v2.2. This version uses many factors of the street design 
        to categorize streets. Unfortunately, our primary data source, OSM, does not have all of the necessary data tagged for 
        each street segment. Engineers could manually collect data for individual street improvement projects to accurately rate 
        a street segment, but to achieve a regional map, we make educated assumptions on what the street looks like. If you see 
        something wrong, we wrote up how to fix the data here[link: improve map].
        </p>
    </Collapsible>
    <Collapsible header='Want to help improve this map?' titleClassName='head1'>
        <p>
        If you are interested in the type of projects we are working on, join us at BCU Labs! [link] Any and all levels of 
        experience are welcomed. We are always looking for new volunteers that are interested in data-backed analysis and storytelling. 
        <br />
        Check out what we are working on in GitHub. [link]
        </p>
        <Collapsible open header='Improve OpenStreetMap' titleClassName='head2'>
            <p>
            OpenStreetMap (OSM) is the data source for the calculations used to rate each segment. This is an incredible resource, much 
            like Wikipedia, that is volunteer edited to add details and keep the map current to changes (e.g. new bike lanes being 
            installed). By editing the map directly, you will make the Stress Map more accurate, and you will improve the baseline 
            data used in most of your favorite navigation apps, including the BlueBikes app, Strava, RideWithGPS, GeoVelo, Pointz, 
            and many more.
            </p>
            <h3>Recommended Map Editing Tools</h3>
                <p>
                These are some of the tools that the BCU Labs team has experience with to make improvements to OpenStreetMap. 
                There are numerous other tools if you find improving the map a fun hobby, with different strengths for different 
                types of editing.
                </p>
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
                    
                    </p>
                </Collapsible>
                <Collapsible header='OverpassTurbo' titleClassName='head4'>
                    <p>
                    https://overpass-turbo.eu/ 
                    </p>
                </Collapsible>
                <Collapsible header='StreetComplete (Android only, beginner friendly)' titleClassName='head4'>
                <h4>JOSM</h4>
                    <p>
                    
                    </p>
                </Collapsible>
                <Collapsible header='Vespucci' titleClassName='head4'></Collapsible>
                    <p>
                    
                    </p>
                </Collapsible>
        </Collapsible>
    </div>
    )
}

export default LTS