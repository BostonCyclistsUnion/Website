/*
 * This file configures the text on the landing page.
 *
 * Each object in the PageText array will be built into a section on
 * the landing page that has a title, subheading, and paragraph section.
 *
 * All fields are optional. If a value is not present in the object,
 * it will not be rendered on the page.
 */

import { Link } from 'react-router-dom';
import { LTS_PAGE_ROUTE, MAP_PAGE_ROUTE, OSM_PAGE_ROUTE } from '../../routes/routes.jsx';
import IconsLTSHorizontal from '../graphics/IconsLTSHorizontal.jsx';
import LTS_Viz_Compare from '../graphics/VizLTSCompare.jsx';

const PageText = [
    {
        title: 'What is Level of Traffic Stress?',
        subheading: 'A method for assessing how bike-friendly a street truly is.',
        paragraph: [
            "Level of Traffic Stress is a system developed by ",
            <Link to="https://peterfurth.sites.northeastern.edu/2014/05/21/criteria-for-level-of-traffic-stress/">Northeastern University’s Professor Peter Furth</Link>,
            " to capture how stressful or comfortable a street feels for cyclists. While a painted bike lane might look bike-friendly on a map, factors like fast and heavy traffic can still make it stressful. The Level of Traffic Stress system considers these elements to give cyclists and planners a clearer view of which routes are truly comfortable.",
        ]
    },
    {
        paragraph: "The Level of Traffic Stress system categorizes streets into the folowing four levels:",
        graphic: <IconsLTSHorizontal />
    },
    {
        title: 'How does this map work?',
        subheading: "The map analyzes road and traffic data to rate a street's bike friendliness.",
        paragraph: [
            <Link to={OSM_PAGE_ROUTE}>We use data</Link>,
            ' from ',
            <Link to="https://www.openstreetmap.org">OpenStreetMap (OSM)</Link>,
            ', an open-source online map that people around the world help build and update. Each street segment is tagged with details such as speed limit, traffic, etc.. which we use to calculate a Level of Traffic Stress for each street segment.',
            <LTS_Viz_Compare />
        ]
    },
    {
        title: 'What can you do with this tool?',
        list: [
            'Explore the connnectivity of the streets in your neighborhood',
            'Find new, more comfortable ways to travel around Greater Boston',
            'Learn about the design elements that contribute to stress levels',
            'Identify ways streets you (want to) use could be redesigned to be safer and less stressful',
        ]
    },
    {
        // TODO: make nicer neighborhood-based links to the map
        subheading: <Link to={MAP_PAGE_ROUTE}>See streets in your neighborhood!</Link>
    },
    {
        title: 'A deep dive into Level of Traffic Stress',
        paragraph: [
            "Our Stress Map is based on a heuristic concept called Level of Traffic Stress (LTS). This has been developed in part by Prof. Peter Furth of Northeastern University and BCU Board Member and is commonly used by planning and engineering professionals. Our implementation attempts to calculate the most current version, v2.2. This version uses many factors of the street design to categorize streets. Unfortunately, our primary data source, OSM, does not have all of the necessary data tagged for each street segment. Engineers could manually collect data for individual street improvement projects to accurately rate a street segment, but to achieve a regional map, we make educated assumptions on what the street looks like. If you see something wrong, we wrote up how to fix the data here[link: improve map].",
        ]
    },
    {
        paragraph: [
            "The big idea with LTS is that there is more to a cyclist’s experience on a street than whether or not there is a bike lane on the street. There are numerous streets that have bike lanes that an experienced cyclist in the city may know to avoid and use an alternative route. On the other hand, many quiet residential streets have no bike specific markings and may be exactly the streets that someone uses to avoid the high speed, high volume street with a bike lane. This means if we want to compare streets based on the comfort to ride on them, we need to look at more of the features of the street than just the presence of a bike lane.",
        ]
    },
    {
        paragraph: [
            "The core truth of what makes cycling dangerous is the presence, proximity, volume, and speed of cars and trucks. A bike lane can help position cyclists and drivers into different spaces on the street. But what if the bike lane is adjacent to parked cars and there is a dooring risk? Separating a bike lane with, ideally, concrete or, helpfully, flex-posts further increases the separation and therefore comfort of cycling on a street. For streets with more and higher speed traffic, increasing bike lane separation becomes more critical to building a street that is inviting to cycle on.",
        ]
    },
    {
        paragraph: [
            "On the other hand, on streets where there isn’t enough space to build high quality bike lanes, the city can reduce conflicts with cars by reducing the speed that people drive on a street and/or the volume of traffic on a street. This is called traffic calming and there are numerous tools to make your street safer this way."
        ]
    },
]

export default PageText
