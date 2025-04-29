import './VizLTSCompare.css'

import viz_LTS1 from '/Viz_LTS1.svg'
import viz_LTS4 from '/Viz_LTS4.svg'

const lts_names = ["LTS_1", "LTS_4"]
const lts_to_icon_mapping = {
    [lts_names[0]]: {
        "icon": viz_LTS1,
        // "text": text_lts1
    },
    [lts_names[1]]: {
        "icon": viz_LTS4,
        // "text": text_lts4
    },
}

function LTSVizWithCaption(props) {
    const { lts_name } = props;

    return(
        <div className="lts-viz-item">
            <img src={lts_to_icon_mapping[lts_name].icon} alt={`${lts_name} icon`} />
        </div>
    )
}

export default function LTS_Viz_Compare(props) {
    return(
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
    )
}

