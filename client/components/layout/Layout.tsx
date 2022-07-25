import React, { FC } from 'react';
import classes from "./Layout.module.scss";

const Layout: FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  )
}

export default Layout;
