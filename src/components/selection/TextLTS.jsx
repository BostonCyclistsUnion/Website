// Convert numeric value of LTS to descriptive text

const TextLTS = ({ltsValue}) => {
    let textValue = 'Unknown LTS Value: ' + ltsValue

    switch (Number(ltsValue)) {
        case 1:
            textValue = '1 - Carefree'
            break
        case 2:
            textValue = '2 - Easygoing'
            break
        case 3:
            textValue = '3 - Tense'
            break
        case 4:
            textValue = '4 - White Knuckles'
            break
        case 0:
            textValue = 'Biking not permitted'
            break
    }
    return textValue
}

export default TextLTS