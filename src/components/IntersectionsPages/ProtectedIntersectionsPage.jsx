import ProtectedIntersections from "./ProtectedIntersectionsPage.mdx";
import './mdx.css'
const Paragraph = ({ children }) => <p className="mdxParagraph">{children}</p> 

export default function IntersectionsPage() {
    return(<ProtectedIntersections components={{
        p: Paragraph
    }}/>)
}