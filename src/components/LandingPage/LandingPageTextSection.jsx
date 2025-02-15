/*
 * A component for creating sections of text on the landing page.
 *
 * Each text section has a title, subheading, and body.
 * All fields are optional. If a field is not passed, it will not be rendered.
 */

// TODO: write CSS file to style these TextSections nicely
// TODO: add an optional image to the props that can be passed to include an image below each section per the Figma mock shared by Adam.

export default function LandingPageTextSection(props) {
    const { title, subheading, paragraph } = props;

    return(
        <div className='LandingPageTextSection'>
            <h3>{title}</h3>
            <p><b>{subheading}</b></p>
            <p>{paragraph}</p>
        </div>
    )
}

