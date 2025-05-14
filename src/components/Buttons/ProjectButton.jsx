import { Link } from 'react-router-dom';
import { MAP_PAGE_ROUTE } from '../routes/routes.jsx';
import './Button.css'

export default function ProjectButton( props) {
  const { link, title, subtitle } = props;
    return (
      <div className='Pad'>
        <Link to={link} >
          <button className='Button Project'>
            <div className='Title'>{title} </div>
            <div className='Subitle'>{subtitle} </div>
          </button>
        </Link>
      </div>
    );
  }
  
  