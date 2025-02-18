/*
 * This file configures the text on the landing page.
 *
 * Each object in the LandingPageText array will be built into a section on
 * the landing page that has a title, subheading, and paragraph section.
 *
 * All fields are optional. If a value is not present in the object,
 * it will not be rendered on the page.
 */

import { Link } from 'react-router-dom';
import { STRESS_MAP_PAGE_ROUTE } from '../../routes/routes';

const LandingPageText = [
    {
        title: 'What is Level of Traffic Stress?',
        subheading: 'A method for assessing how bike-friendly a street truly is.',
        paragraph: "Level of Traffic Stress is a system developed by Northeastern University's Professor Peter Furth to capture..."
    },
    {
        title: 'How does this map work?',
        subheading: "The map analyzes road and traffic data to rate a street's bike friendliness.",
        paragraph: 'we use data from OpenStreetMap (OSM)...'
    },
    {
        title: 'What can you do with this tool?',
        subheading: 'Expore the connnectivity of the streets in your neighborhood and the design elements that contribute to stress levels.',
        paragraph: 'Explore the interconnectedness of your bike network by...'
    },
    {
        // TODO: make nicer neighborhood-based links to the map
        title: <Link to={STRESS_MAP_PAGE_ROUTE}>See streets in your neighborhood!</Link>
    }
]

export default LandingPageText
