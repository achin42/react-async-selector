import headerStyles from '../styles/Header.module.css'

const Header = () => {
    return (
        <div>
            <h1 className={headerStyles.title}>
                <span>ULesson</span> Scheduled Testing
            </h1>
            {/* <p className={headerStyles.description}>Scheduled Testing</p> */}
        </div>
    );
};

export default Header;