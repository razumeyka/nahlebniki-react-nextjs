import React, { FC, useState } from 'react';
import Image from 'next/image';
import classes from './RecipesHeader.module.scss';

import Wrapper from '../layout/Wrapper';

const RecipesHeader: FC = () => {
    const [serchValue, setSearchValue] = useState('');

    return (
        <div className={classes.container}>
            <Wrapper>
                <h1 className={classes.heading}>Recipes</h1>
                <div className={classes.description}>The right margin receives a share of the unused horizontal space, as determined mainly by the layout mode that is used. If the values of margin-left and margin-right are both auto, the calculated space is evenly distributed. This table summarizes the different</div>
                <div className={classes['search-container']}>
                    <input 
                        className={classes['search-input']}
                        name="search"
                        type="search"
                        placeholder="Enter recipe title"
                        value={serchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                </div>
            </Wrapper>
        </div>
    );
};

export default RecipesHeader;