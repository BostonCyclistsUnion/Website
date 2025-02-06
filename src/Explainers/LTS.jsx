// Explainer for LTS
import Collapsible from "../Collapsible";
import "../assets/icons.css";

console.log('Explainer/LTS loaded')

const LTS = ({}) => {
    return(<div className="content">
    <Collapsible open header='Getting Started with this map' titleClassName='head1'>
        <p>
        If you aren’t exactly sure what is going on with this map or how to use it, don’t worry, 
        this is a new concept to most people that we are introducing. But hopefully this map will 
        rate streets in a way that makes intuitive sense to your opinions of streets and how people 
        experience the street network on bike.
        </p>
        <Collapsible open header='What is this map?' titleClassName='head2'>
            <p>
            This map attempts to rate every street segment in Boston, Cambridge, Somerville, and 
            Brookline based on how comfortable it is to bike on. This is based on a concept called 
            Level of Traffic Stress, which evaluates streets based on some of the most important 
            features that affect the biking experience. Obviously, this includes things like bike 
            lanes and if they have separation, but also how many and how fast cars are traveling on 
            the street. As most cyclists intuitively understand, it may be more comfortable to bike 
            on a quiet residential street than a high-speed arterial street (e.g. Mass Ave.) with a 
            basic bike lane. This system attempts to quantify that intuition into a clear rating 
            system to be able to see the overall effective comfortable biking network, not just 
            mapping where different bike lanes are.
            </p>
        </Collapsible>
        <Collapsible  header='Why is BCU Labs making this map?' titleClassName='head2'>
            <p>
            While it is true that Boston has created a Level of Traffic Stress map[link], this is 
            not a particularly useful tool for the cycling community. To start with, if you wanted 
            to bike from Allston to JP, two neighborhoods of Boston, you would likely want to bike 
            through Brookline, an independent city which isn’t included on the City of Boston’s map. 
            Similarly, Cambridge has their own map[link], but if you are cycling from North 
            Cambridge to Kendall you will likely want to bike on Beacon Street in Somerville to 
            Hampshire Street. Within Greater Boston, it is completely normal to bike through two or 
            even three or four cities in a given day or ride. More complicated, MassDOT and DCR 
            property include some of the most popular routes for cyclists and are not always 
            included in city LTS maps due to the lack of control the city has over those streets, 
            roads, and paths. BCU Labs is uniquely able to view cycling comfort at the regional 
            level, the same way cyclists experience riding in the region.
            <br /><br />
            Additionally, by utilizing OpenStreetMaps as the primary data source, we are able to 
            continuously update street ratings as the streets change or the data accuracy 
            improves[link: how to fix OSM]. There have been past efforts (including municipal maps) 
            to create an LTS map, but these often use data sources (municipal and state GIS 
            databases) that are not used by people in daily life for navigation, meaning errors are 
            not discovered rapidly and data becomes stagnant. Map developers may identify some of 
            these errors and fix them manually in their maps, but when the source database is 
            updated, the workload to verify what changes were made or not becomes prohibitive.
            <br /><br />
            Finally, by building an easy to use map, we hope that both the general public find this 
            a valuable tool in bettering their daily route selection and advocating for 
            improvements, and researchers are able to use our data and calculations to jumpstart 
            more interesting analyses that may lead to better insights in the value of the bike 
            network or how to improve the network in the most impactful way. BCU Labs is working 
            towards both of these goals too. If you want to help in any way, please join us[link].
            </p>
        </Collapsible>
        <Collapsible  header='How to use this map' titleClassName='head2'>
            <p>
            There are many ways you can use this map. We are building a tool that should reflect the 
            experiences of people biking on these streets. To start with, we recommend exploring 
            your neighborhood and places you are familiar with, e.g. your commute. Hopefully you 
            generally agree with our ratings, if not, check out [link: disagree]. While exploring, 
            maybe you find a new route option that is nicer than what you currently use. If you do, 
            let us know, we’d love to hear how this tool is helping you.
            <br /><br />
            Once you are comfortable with the tool, maybe you start exploring how to get to new 
            destinations or gain the vocabulary to advocate for specific streets to be improved that 
            would make your riding better.
            </p>
        </Collapsible>
        <Collapsible  header='What if you disagree with a street segment rating?' titleClassName='head2'>
            <p>
            If a street you ride on regularly feels more or less comfortable than how we have rated 
            it, you are probably right! We use OSM for our data and it is very incomplete, forcing 
            us to make some assumptions, meaning we are probably wrong in some places.You can learn 
            to fix the data yourself here [link: improve map], or fill out this form with what you 
            know and the BCU Labs team will bike there ourselves and fix the data.
            </p>
        </Collapsible>            
    </Collapsible>
    <Collapsible header='A deep dive into Level of Traffic Stress' titleClassName='head1'>
        <p>
        Our Stress Map is based on a heuristic concept called Level of Traffic Stress (LTS). This 
        has been developed in part by Prof. Peter Furth of Northeastern University and BCU Board 
        Member and is commonly used by planning and engineering professionals. Our implementation 
        attempts to calculate the most current version, v2.2. This version uses many factors of the 
        street design to categorize streets. Unfortunately, our primary data source, OSM, does not 
        have all of the necessary data tagged for each street segment. Engineers could manually 
        collect data for individual street improvement projects to accurately rate a street segment, 
        but to achieve a regional map, we make educated assumptions on what the street looks like. 
        If you see something wrong, we wrote up how to fix the data here[link: improve map].
        <br /><br />
        The big idea with LTS is that there is more to a cyclist’s experience on a street than 
        whether or not there is a bike lane on the street. There are numerous streets that have bike 
        lanes that an experienced cyclist in the city may know to avoid and use an alternative route. 
        On the other hand, many quiet residential streets have no bike specific markings and may be 
        exactly the streets that someone uses to avoid the high speed, high volume street with a 
        bike lane. This means if we want to compare streets based on the comfort to ride on them, we 
        need to look at more of the features of the street than just the presence of a bike lane.
        <br /><br />
        The core truth of what makes cycling dangerous is the presence, proximity, volume, and speed 
        of cars and trucks. A bike lane can help position cyclists and drivers into different spaces 
        on the street. But what if the bike lane is adjacent to parked cars and there is a dooring 
        risk? Separating a bike lane with, ideally, concrete or, helpfully, flex-posts further 
        increases the separation and therefore comfort of cycling on a street. For streets with more 
        and higher speed traffic, increasing bike lane separation becomes more critical to building 
        a street that is inviting to cycle on. 
        <br /><br />
        On the other hand, on streets where there isn’t enough space to build high quality bike 
        lanes, the city can reduce conflicts with cars by reducing the speed that people drive on a 
        street and/or the volume of traffic on a street. This is called traffic calming and there 
        are numerous tools to make your street safer this way.
        </p>
    </Collapsible>
    <Collapsible header='Want to help improve this map?' titleClassName='head1'>
        <p>
        If you are interested in the type of projects we are working on, join us at BCU Labs! [link] 
        Any and all levels of experience are welcomed. We are always looking for new volunteers that 
        are interested in data-backed analysis and storytelling. 
        <br />
        Check out what we are working on in GitHub. [link]
        </p>
        <Collapsible open header='Improve OpenStreetMap' titleClassName='head2'>
            <p>
            OpenStreetMap (OSM) is the data source for the calculations used to rate each segment. 
            This is an incredible resource, much like Wikipedia, that is volunteer edited to add 
            details and keep the map current to changes (e.g. new bike lanes being installed). By 
            editing the map directly, you will make the Stress Map more accurate, and you will 
            improve the baseline data used in most of your favorite navigation apps, including the 
            BlueBikes app, Strava, RideWithGPS, GeoVelo, Pointz, and many more.
            </p>
            <h3>Recommended Map Editing Tools</h3>
                <p>
                These are some of the tools that the BCU Labs team has experience with to make 
                improvements to OpenStreetMap. There are numerous other tools if you find improving 
                the map a fun hobby, with different strengths for different types of editing.
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
                </p>
        </Collapsible>
    </div>
    )
}

export default LTS