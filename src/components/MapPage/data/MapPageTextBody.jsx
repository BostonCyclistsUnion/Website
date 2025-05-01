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


const PageText = [
    {
        title: 'Getting Started with this map',
        paragraph: "If you aren’t exactly sure what is going on with this map or how to use it, don’t worry, this is a new concept to a lot of people."
    },
    {
        subheading: 'How to use this map',
        list: [
            'Zoom in and out by scrolling',
            'Click on a street to see its rating, and details on infrastructure that exists there',
            'In the bottom left of the map, click the icons to understand more about each stress rating',
        ],
    },
    {
        paragraph: [
            "There are many ways you can use this map. To start, we recommend exploring your neighborhood and places you are familiar with, like your commute."    
        ]    
    },
    {
        paragraph: [
            "Once you are comfortable with the tool, explore less stressful routes to your favorite destinations, plan trips to new ones,  or identify a need to  advocate for specific streets to be improved that would make your journeys better."
        ]    
    },
    {
        subheading: 'What is this map?',
        paragraph: [
            "This map attempts to rate every street segment in Boston, Cambridge, Somerville, and Brookline based on how comfortable it is to bike on. ",
            "This is based on a concept called ",
            <Link to={LTS_PAGE_ROUTE}>Level of Traffic Stress</Link>,
            ", which evaluates streets based on some of the most important features that affect the biking experience. ",
            "This includes things like bike lanes and if they have separation, but also how many cars are traveling on the street and how fast those cars are going. ",
            "As many cyclists intuitively understand, it may be more comfortable to bike on a quiet residential street than a high-speed arterial street (e.g. Mass Ave.) with a painted bike lane. ",
            "This system attempts to quantify that intuition into a clear rating system to be able to see the overall effective comfortable biking network, rather than just mapping where bike lanes exist."
        ]
    },
    {
        paragraph: <Link to={LTS_PAGE_ROUTE}>Read more about our methodology here.</Link>,
    },
    {
        subheading: 'Why is BCU Labs making this map?',
        paragraph: [
            "While it is true that the City of Boston has created a ",
            <Link to="https://boston.maps.arcgis.com/apps/webappviewer/index.html?id=f0be9f03ada74a028cd05e4893a22ca4">Level of Traffic Stress map</Link>,
            ", this is not a particularly useful tool for the cycling community. ",
            "For example, if you wanted to bike from Allston to Jamaica Plain, two neighborhoods of Boston, you would likely want to bike through Brookline, an independent city which isn’t included on the City of Boston’s map.",
        ]    
    },
    {
        paragraph: [
            "Within Greater Boston, it is completely normal to bike through two or even three or four cities on a given day. ",
            "BCU Labs is uniquely able to view cycling comfort at the regional level to create a tool cyclists in Boston can use for their daily trips instead of being primarily valuable for city planners."
        ]
    },    
    {
        paragraph: [
            "Additionally, by utilizing ",
            <Link to="https://www.openstreetmap.org">OpenStreetMap (OSM)</Link>,
            " as the primary data source, we are able to continuously update street ratings as the streets change or the data accuracy improves. ",
            <Link to={OSM_PAGE_ROUTE}>(Start here to learn how to contribute to OSM)</Link>,
        ]    
    },
    {
        paragraph: [
            "Finally, by building an easy-to-use map, we hope to achieve a few things: ",
        ],
        list: [
            "The general public finds this a valuable tool in bettering their daily route selection",
            "Advocates can better communicate where and why street improvements will improve the safe bike network",
            "Researchers are able to use our data and calculations to jumpstart more interesting analyses that may lead to better insights in the value of the bike network or how to improve the network in the most impactful way",
        ]
    },
    {
        paragraph: [
            'BCU Labs is working towards these goals too. If you want to help in any way, please ',
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLSefzxEQ-CAbJd_rrt90DHvdglYvP9RLqdDUVsFq28onw9xXJQ/viewform" >join us at BCU Labs.</Link>,
        ]
    },
    {
        subheading: 'What if you disagree with a street segment rating?',
        paragraph: [
            "If a street you ride on regularly feels more or less comfortable than how we have rated it, you are probably right! ",
            "We use OpenStreetMap (OSM) for our data and as a data source it is incomplete. ",
            "This forces us to make some assumptions, and we are probably wrong in some places. ",
        ]
    },
    {
        paragraph: [
            "You can learn to ",
            <Link to={OSM_PAGE_ROUTE}>fix the data yourself here</Link>,
            ", or fill out ",
            <Link to="https://forms.gle/ytyKV7ZrnzYZToCi9">this form</Link>,
            " with what you know and the BCU Labs team will bike there ourselves to survey, then fix the data."
        ]
    },
]   

export default PageText
