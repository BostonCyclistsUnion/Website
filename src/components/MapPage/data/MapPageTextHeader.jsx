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
import { LTS_PAGE_ROUTE, MAP_PAGE_ROUTE, LABS_PAGE_ROUTE, OSM_PAGE_ROUTE } from '../../routes/routes.jsx';

const PageText = [
    {
        title: 'Welcome to the BCU Labs Bike Stress Map',
        subheading: 'Explore how comfortable it is to bike in Greater Boston',
        paragraph: [
            <Link to={LABS_PAGE_ROUTE}>BCU Labs</Link>,
            ' is working to build data-backed tools to help people identify the strengths and weaknesses of the biking network in Greater Boston. We aim to help provide the vocabulary to communicate your experience biking in Boston.',           
        ],
    },
    {
        paragraph: 'The Bike Stress Map is our first project, rating every street in Boston, Cambridge, Somerville, and Brookline based on how comfortable it is to ride a bike on. Start clicking around the map below to see your neighborhood or commute. Maybe you will find a new, more comfortable route. Keep scrolling to read up in more detail how we are rating streets and what you can do to improve the map.',
    },
]

export default PageText
