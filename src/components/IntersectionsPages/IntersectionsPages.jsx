import ForgottenIntersections from "./ForgottenIntersectionsPage.mdx";
import ProtectedIntersections from "./ProtectedIntersectionsPage.mdx";
import IntersectionAudits from "./IntersectionAudit.mdx";
import '../mdx.css'

const Paragraph = ({ children }) => <p className="mdxParagraph">{children}</p> 

export function ForgottenIntersectionsPage() {
    return(<ForgottenIntersections components={{
        p: Paragraph
    }}/>)
}

export function ProtectedIntersectionsPage() {
    return(<ProtectedIntersections components={{
        p: Paragraph
    }}/>)
}

export function IntersectionAuditPage() {
    return(<IntersectionAudits components={{
        p: Paragraph
    }}/>)
}