import { SiteFooter, SiteHeader } from "../../../App"

export const AppLayout = ({ children, isLoading }) => {
    return (
        <>
            <SiteHeader isLoading={isLoading} />
                {children}
            <SiteFooter />
        </>
    )
}