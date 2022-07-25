import React, { FC } from 'react';
import classes from "./FullScreenLayout.module.scss";

const FullScreenLayout: FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  )
}

export default FullScreenLayout;
