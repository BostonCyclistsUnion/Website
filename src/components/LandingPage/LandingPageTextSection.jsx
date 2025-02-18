/*
 * A component for creating sections of text on the landing page.
 *
 * Each text section has a title, subheading, and body.
 * All fields are optional. If a field is not passed, it will not be rendered.
 */

// TODO: add an optional image to the props that can be passed to include an image below each section per the Figma mock shared by Adam.

import './LandingPageTextSection.css';

export default function LandingPageTextSection(props) {
    const { title, subheading, paragraph } = props;

    return(
        <div>
            <h3 className='title'>{title}</h3>
            <p className='subheading'>{subheading}</p>
            <p className='paragraph'>{paragraph}</p>
        </div>
    )
}

