import { useState } from "react";
import Link from "next/link";
import classes from "./MainHeader.module.scss";

import Wrapper from "./Wrapper";
import MainNavigation from "./MainNavigation";

const MainHeader = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const toggleMenuHandler = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <header className={classes.header}>
            <Wrapper>
                <div className={classes['header-top']}>
                    <Link href="/">
                        <div className={classes.heading}>Nahlebniki</div>
                    </Link>
                    <button 
                        onClick={toggleMenuHandler}
                        className={classes['menu-button']}
                    >
                        Menu
                    </button>
                </div>
            </Wrapper>
            { isOpen &&
                <div className={classes['menu-container']}>
                    <button 
                        onClick={toggleMenuHandler}
                        className={classes['menu-button']}
                    >
                        Close
                    </button>
                    <MainNavigation onCloseMenu={toggleMenuHandler} />
                </div>
            }
        </header>
    );
}

export default MainHeader;
