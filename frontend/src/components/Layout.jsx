import {Navbar} from './Navbar';
import {Footer} from './Footer';

export const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
