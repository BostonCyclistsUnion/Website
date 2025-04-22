/*
 * This file configures the text on the landing page for BCU Labs.
 *
 * Each object in the LabsPageText array will be built into a section on
 * the landing page that has a title, subheading, and paragraph section.
 *
 * All fields are optional. If a value is not present in the object,
 * it will not be rendered on the page.
 */

import { Link } from 'react-router-dom';
import { LTS_PAGE_ROUTE, MAP_PAGE_ROUTE, LABS_PAGE_ROUTE } from '../../routes/routes.jsx';
import BikeStressMapImageHeader from '../../BikeStressMapImageHeader/BikeStressMapImageHeader';
import DonateButton from '../../DonateButton/DonateButton.jsx';

const LabsPageText = [
    {
        title: 'Welcome to BCU Labs!',
        subheading: 'Experiments in data-backed advocacy',
        paragraph: [
            'We are a volunteer-driven group within ', 
            <Link to="https://bostoncyclistsunion.org/" >Boston Cyclists Union</Link>,
            '. You can ',
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLSefzxEQ-CAbJd_rrt90DHvdglYvP9RLqdDUVsFq28onw9xXJQ/viewform" >join BCU Labs here.</Link>,            
        ],
    },
    {
        paragraph: <DonateButton />
    },
    {
        title: 'Our Mission',
        paragraph: [
            'BCU Labs seeks to draw insight and tell stories from the wealth of biking data in Boston. ',
            'Our mission is to leverage the power of data through creative experimentation, learn ',
            'where Boston can improve its infrastructure, whether physical or digital, and continue ',
            "to empower BCU’s advocacy one pedal at a time. Through our framework of mobility ",
            'justice and equity, we strive to push for positive change in our bike networks, ',
            'neighborhoods, and mindsets for everybody, no matter who you are or where you ride.'
        ]
    },
    {
        title: 'Our Projects',
        // subheading: 'Check out what we have been working on!',
        // paragraph: <Link to={MAP_PAGE_ROUTE}>See how comfortable biking is in Greater Boston</Link>,
        paragraph: <BikeStressMapImageHeader />
    },
    {
        title: 'Blog Posts',
        subheading: <Link to="https://bostoncyclistsunion.org/author/bcu-labs" >See what we have been writing about</Link>,
        list: ['<add links here>','<more things>']
    },
    {
        paragraph: <DonateButton />
    },
]

export default LabsPageText
