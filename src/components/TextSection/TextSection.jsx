/*
 * A component for creating sections of text for each page.
 *
 * Each text section has a title, subheading, body, and graphic.
 * All fields are optional. If a field is not passed, it will not be rendered.
 */

import './TextSection.css';

import { Parser } from "html-to-react"
import React, { Component } from "react";
import ReactDOMServer from "react-dom/server"
// const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new Parser(React);

function Para(input) {
    let paragraph = input.paragraph
    // console.log('paragraph (', typeof(paragraph), ') |', paragraph)
    if (typeof(paragraph) === 'string') {
        // console.log('string')
        return <p className='paragraph'>{paragraph}</p>
    } else if (Array.isArray(paragraph)) {
        // console.log('array')
        // return <div>{paragraph.map(item => <p className='paragraph'>{item}</p>)}</div>
        return <p className='paragraph'>{paragraph}</p>
    } else {
        // console.log('object')
        return <p className='paragraph'>{paragraph}</p>
    }
    }

export default function TextSection(props) {
    const { title, subheading, paragraph, list, graphic } = props;

    // console.log('paragraph (', typeof(paragraph), ') |', paragraph)
    return(
        <div className='text-section'>
            {title && <h1 className='title'>{title}</h1>}
            {/* {title && <h1 className='title'>{htmlToReactParser.parse(title)}</h1>} */}
            {subheading && <h2 className='subheading'>{subheading}</h2>}
            {<Para paragraph={paragraph} />}
            {/* {list && <ul className='paragraph'>{list.map(item => <li>{item}</li>)}</ul>} */}
            {list && <> 
                {list.map((item, index) => 
                    <ul className='paragraph' key={index}>
                        <li>{item}</li>
                    </ul> )
                }
                </>
            }
            {graphic && <div className='graphic'>{graphic}</div>}
        </div>
    )
}

