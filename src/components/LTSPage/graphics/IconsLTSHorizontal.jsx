import './IconsLTSHorizontal.css'

import icon_lts1 from '/Icon_LTS1.svg'
import icon_lts2 from '/Icon_LTS2.svg'
import icon_lts3 from '/Icon_LTS3.svg'
import icon_lts4 from '/Icon_LTS4.svg'
import text_lts1 from '/Text_LTS1.svg'
import text_lts2 from '/Text_LTS2.svg'
import text_lts3 from '/Text_LTS3.svg'
import text_lts4 from '/Text_LTS4.svg'

const lts_names = ["LTS_1", "LTS_2", "LTS_3", "LTS_4"]
const lts_to_icon_mapping = {
    [lts_names[0]]: {
        "icon": icon_lts1,
        "text": text_lts1
    },
    [lts_names[1]]: {
        "icon": icon_lts2,
        "text": text_lts2
    },
    [lts_names[2]]: {
        "icon": icon_lts3,
        "text": text_lts3
    },
    [lts_names[3]]: {
        "icon": icon_lts4,
        "text": text_lts4
    },
}

function LTSPageLtsImageWithCaption(props) {
    const { lts_name } = props;

    return(
        <div className="lts-icon-item">
            <img src={lts_to_icon_mapping[lts_name].icon} alt={`${lts_name} icon`} />
            <img src={lts_to_icon_mapping[lts_name].text} alt={`${lts_name} text`} />
        </div>
    )
}

export default function LTSPageLtsHorizontalImage(props) {
    return(
        <div className="lts-icon-container">
            {
                lts_names.map(lts_name => (
                    <LTSPageLtsImageWithCaption 
                        key={lts_name}
                        lts_name={lts_name}
                    />
                )) 
            }
        </div>
    )
}

