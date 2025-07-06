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
    OSM_PAGE_ROUTE 
        } from '../../routes/routes.jsx';


import BikeStressMap from '../../ImageLinks/BikeStressMap';

const PageText = [
    {
        title: ['Welcome to the BCU Labs', <BikeStressMap key='stress map logo'/>],
        subheading: 'Explore how comfortable it is to bike in Greater Boston',
        paragraph: [
            <Link to={LABS_PAGE_ROUTE} key='bcu labs link'>BCU Labs</Link>,
            ' is working to build data-backed tools to help people identify the strengths and weaknesses of the biking network in Greater Boston.',
        ],
    },
    {
        paragraph: 'With this stress map, we aim to:',
        list: [
            'Help provide the vocabulary to communicate your experience biking in Boston',
            'Show people alternative routes that may be lower-stress',
            'Highlight gaps in the network that could be candidates for improvements',
        ]
    },
    {
        paragraph: [
            'The Bike Stress Map is our first project, rating every street in Boston, Cambridge, ',
            'Somerville, and Brookline based on how comfortable it is to ride a bike on. ',
            'It is a work in progress and a community effort – read below for ways to contribute or ',
            <Link to={OSM_PAGE_ROUTE}>update the map</Link>,
            '.'
        ]
    },
]

export default PageText
