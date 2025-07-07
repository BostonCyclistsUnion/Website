import { Link } from 'react-router-dom';
import { MAP_PAGE_ROUTE } from '../routes/routes.jsx';
import './Button.css'

export default function ProjectButton( props) {
  const { link, title, subtitle } = props;
    return (
      <div className='Pad'>
        <Link to={link} >
          <button className='Button Project'>
            <h1 className='ButtonProjectTitle'>{title} </h1>
            <h2 className='ButtonProjectSubtitle'>{subtitle} </h2>
          </button>
        </Link>
      </div>
    );
  }
  
  