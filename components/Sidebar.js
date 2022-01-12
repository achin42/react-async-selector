import Link from 'next/link';
import sidebarStyles from '../styles/Sidebar.module.css'

// const{sidebarValue, setSidebarValue} = useGlobalContext();

const Sidebar = () => {
    return (
        <nav className={sidebarStyles.nav}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
            </ul>
        </nav>
    );  
};

export default Sidebar;