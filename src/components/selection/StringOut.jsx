// Convert whatever the value/type is into a string for display

const StringOut = (value) => {
    // console.log('stringOut:', value, typeof(value))
    var out_string
    if (typeof(value) === 'string') {
        out_string = value;
    } else if (typeof(value) === 'boolean') {
        out_string = value.toString();
    } else if (typeof(value) === 'number') {
        out_string = value.toString();
    } else if (typeof(value) === 'undefined') {
        out_string = 'n/a';
    } else {
        out_string = typeof(value);
    }
    // console.log('out_string:', out_string, typeof(out_string))
    return out_string
}

export default StringOut