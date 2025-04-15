/*
 * A component for creating sections of text for each page.
 *
 * Each text section has a title, subheading, body, and graphic.
 * All fields are optional. If a field is not passed, it will not be rendered.
 */

import './TextSection.css';

export default function TextSection(props) {
    const { title, subheading, paragraph, graphic } = props;

    return(
        <div className='text-section'>
            {title && <h3 className='title'>{title}</h3>}
            {subheading && <p className='subheading'>{subheading}</p>}
            {paragraph && <p className='paragraph'>{paragraph}</p>}
            {graphic}
        </div>
    )
}

