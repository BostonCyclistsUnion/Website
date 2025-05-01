import { Link } from 'react-router-dom';
import './Button.css'

export default function DonateButton() {
    return (
      <div className='Pad'>
        <Link to="https://secure.everyaction.com/mfRgF-hjuEueYqUtvn9Jeg2">
          <button className='Button Donate'>Donate</button>
        </Link>
      </div>
    );
  }
  