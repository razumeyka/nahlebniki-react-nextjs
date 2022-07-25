import classes from "./Footer.module.scss";

import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <footer className={classes.container}>
        <Wrapper>
            <div>Footer text</div>
        </Wrapper>
    </footer>
  )
}

export default Footer;
