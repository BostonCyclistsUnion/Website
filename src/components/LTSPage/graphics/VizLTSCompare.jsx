import './VizLTSCompare.css'

import { useState } from 'react'

import viz_LTS1 from '/Viz_LTS1.svg'
import viz_LTS4 from '/Viz_LTS4.svg'

const lts_names = ["LTS_1", "LTS_4"]
const lts_to_icon_mapping = {
    [lts_names[0]]: {
        "icon": viz_LTS1,
        // "text": text_lts1,
        "alt": "Low stress street",
    },
    [lts_names[1]]: {
        "icon": viz_LTS4,
        // "text": text_lts4
        "alt": "High stress street",
    },
}

export default function LTS_Viz_Compare(props) {
    // image popup https://www.geeksforgeeks.org/how-to-center-a-view-component-on-screen/
    const [dialog, setDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState();

    const toggleDialog = () => {
        setDialog(!dialog);
      };

    const clickImg = ( src ) => (event) =>{
        setDialog(!dialog);
        setImageSrc(src);
        console.log("Image clicked:", src, dialog)
    }

    function LTSVizWithCaption(props) {
        const { lts_name } = props;
    
        return(
            <button className="lts-viz-item" onClick={clickImg(lts_to_icon_mapping[lts_name].icon)}>
                <img src={lts_to_icon_mapping[lts_name].icon} alt={`${lts_name} icon`} />
            </button>
        )
    }

    return(
        <div>
            <div className="lts-viz-container">
                {
                    lts_names.map(lts_name => (
                        <LTSVizWithCaption 
                            key={lts_name}
                            lts_name={lts_name}
                        />
                    )) 
                }
            </div>
            {dialog && (
                    <div className="dialog">
                    <div className="dialog-content">
                        <button className="close-icon" onClick={toggleDialog}>&#10005;</button>
                        <img className="popup-image" src={imageSrc} alt="Popup Image" />
                    </div>
                    </div>
                )}
        </div>
    )
}

