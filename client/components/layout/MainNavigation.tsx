import React, { FC } from 'react';
import Link from "next/link";
import classes from "./MainNavigation.module.scss";

interface MenuLinkProps {
    onClick: () => void;
    title: string;
};

const MenuLink = React.forwardRef<HTMLAnchorElement, MenuLinkProps>((
    { onClick, title }, ref
) => {
    return (
      <a onClick={onClick} ref={ref}>
        {title}
      </a>
    )
})

const MainNavigation: FC<{ onCloseMenu: () => void }> = ({ onCloseMenu }) => {
    return (
        <nav className={classes['menu-list']}>
            <ul>
                <li>
                    <Link href="/" passHref>
                        <MenuLink
                            onClick={onCloseMenu}
                            title='Home'
                        />
                    </Link>
                </li>
                <li>
                    <Link href="/recipes" passHref>
                        <MenuLink
                            onClick={onCloseMenu}
                            title='Recipes'
                        />
                    </Link>
                </li>
                <li>
                    <Link href="/about" passHref>
                        <MenuLink
                            onClick={onCloseMenu}
                            title='About'
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavigation;
