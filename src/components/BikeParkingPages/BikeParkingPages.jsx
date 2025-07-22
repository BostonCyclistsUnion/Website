import BikeParking from "./BikeParking.mdx";
import BikeParkingMapping from "./BikeParkingMapping.mdx";
import '../mdx.css'

const Paragraph = ({ children }) => <p className="mdxParagraph">{children}</p> 

export function BikeParkingPage() {
    return(<BikeParking components={{
        p: Paragraph
    }}/>)
}

export function BikeParkingMappingPage() {
    return(<BikeParkingMapping components={{
        p: Paragraph
    }}/>)
}
