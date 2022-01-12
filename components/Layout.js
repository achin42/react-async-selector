import Sidebar from './Sidebar';
import Header from './Header';
import styles from '../styles/Layout.module.css'

const Layout = ({children}) => {
    return (
        <>
            <div className={styles.main_container}>
                <Sidebar/>
                <div className={styles.container}>
                    <main className={styles.main}>
                        <Header/>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;