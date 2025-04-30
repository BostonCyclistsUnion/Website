/*
 * This file configures the text above the map.
 *
 * Each object in the PageText array will be built into a section on
 * the landing page that has a title, subheading, paragraph, and list section.
 *
 * All fields are optional. If a value is not present in the object,
 * it will not be rendered on the page.
 */

import { Link } from 'react-router-dom';
import { 
    LTS_PAGE_ROUTE,
    MAP_PAGE_ROUTE,
    LABS_PAGE_ROUTE,
    OSM_PAGE_ROUTE,
        } from '../../routes/routes.jsx';
import DonateButton from '../../DonateButton/DonateButton.jsx';


const PageText = [
    {
        title: 'Getting Started with this map',
        paragraph: "If you aren’t exactly sure what is going on with this map or how to use it, don’t worry, this is a new concept to most people that we are introducing. But hopefully this map will rate streets in a way that makes intuitive sense to your opinions of streets and how people experience the street network on bike."
    },
    {
        subheading: 'What is this map?',
        paragraph: [
            "This map attempts to rate every street segment in Boston, Cambridge, Somerville, and Brookline based on how comfortable it is to bike on. This is based on a concept called ",
            <Link to={LTS_PAGE_ROUTE}>Level of Traffic Stress</Link>,
            ", which evaluates streets based on some of the most important features that affect the biking experience. Obviously, this includes things like bike lanes and if they have separation, but also how many and how fast cars are traveling on the street. As most cyclists intuitively understand, it may be more comfortable to bike on a quiet residential street than a high-speed arterial street (e.g. Mass Ave.) with a basic bike lane. This system attempts to quantify that intuition into a clear rating system to be able to see the overall effective comfortable biking network, not just mapping where different bike lanes are."
        ]
    },
    {
        subheading: 'Why is BCU Labs making this map?',
        paragraph: [
            "While it is true that Boston has created a ",
            <Link to="https://boston.maps.arcgis.com/apps/webappviewer/index.html?id=f0be9f03ada74a028cd05e4893a22ca4">Level of Traffic Stress map</Link>,
            ", this is not a particularly useful tool for the cycling community. To start with, if you wanted to bike from Allston to JP, two neighborhoods of Boston, you would likely want to bike through Brookline, an independent city which isn’t included on the City of Boston’s map. Similarly, Cambridge has their own map[link], but if you are cycling from North Cambridge to Kendall you will likely want to bike on Beacon Street in Somerville to Hampshire Street. Within Greater Boston, it is completely normal to bike through two or even three or four cities in a given day or ride. More complicated, MassDOT and DCR property include some of the most popular routes for cyclists and are not always included in city LTS maps due to the lack of control the city has over those streets, roads, and paths. BCU Labs is uniquely able to view cycling comfort at the regional level, the same way cyclists experience riding in the region.",
        ]    
    },
    {
        paragraph: [
            "Additionally, by utilizing OpenStreetMaps (OSM) as the primary data source, we are able to continuously update street ratings as the streets change or the data accuracy improves ",
            <Link to={OSM_PAGE_ROUTE}>(start here to learn how to contribute to OSM)</Link>,
            ". There have been past efforts (including municipal maps) to create an LTS map, but these often use data sources (municipal and state GIS databases) that are not used by people in daily life for navigation, meaning errors are not discovered rapidly and data becomes stagnant. Map developers may identify some of these errors and fix them manually in their maps, but when the source database is updated, the workload to verify what changes were made or not becomes prohibitive.",
        ]    
    },
    {
        paragraph: [
            "Finally, by building an easy to use map, we hope that both the general public find this a valuable tool in bettering their daily route selection and advocating for improvements, and researchers are able to use our data and calculations to jumpstart more interesting analyses that may lead to better insights in the value of the bike network or how to improve the network in the most impactful way. BCU Labs is working towards both of these goals too. If you want to help in any way, please ",
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLSefzxEQ-CAbJd_rrt90DHvdglYvP9RLqdDUVsFq28onw9xXJQ/viewform" >join BCU Labs.</Link>,
        ]    
    },
    {
        subheading: 'How to use this map',
        paragraph: [
            "There are many ways you can use this map. We are building a tool that should reflect the experiences of people biking on these streets. To start with, we recommend exploring your neighborhood and places you are familiar with, e.g. your commute. Hopefully you generally agree with our ratings, if not, ",
            <Link to={LTS_PAGE_ROUTE}>read up on our methodology</Link>,
            " and ",
            <Link to={OSM_PAGE_ROUTE}>how to improve to OSM data</Link>,
            ". While exploring, maybe you find a new route option that is nicer than what you currently use. If you do, let us know, we’d love to hear how this tool is helping you.",
        ]    
    },
    {
        paragraph: [
            "Once you are comfortable with the tool, maybe you start exploring how to get to new destinations or gain the vocabulary to advocate for specific streets to be improved that would make your riding better."
        ]    
    },
    {
        subheading: 'What if you disagree with a street segment rating?',
        paragraph: [
            "If a street you ride on regularly feels more or less comfortable than how we have rated it, you are probably right! We use OSM for our data and it is very incomplete, forcing us to make some assumptions, meaning we are probably wrong in some places. You can learn to ",
            <Link to={OSM_PAGE_ROUTE}>fix the data yourself here</Link>,
            ", or fill out ",
            <Link to="https://forms.gle/ytyKV7ZrnzYZToCi9">this form</Link>,
            " with what you know and the BCU Labs team will bike there ourselves and fix the data."
        ]
    },
    {
        paragraph: <DonateButton />
    },
]   

export default PageText
