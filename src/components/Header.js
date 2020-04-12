import React from "react";
import { Link } from "gatsby";
import config from "../../data/SiteConfig";
import Categories from "./Categories";
import styles from "./Header.module.scss";

const Header = () => (
  <header className={styles.siteHeader}>
    <h1 className={styles.siteLogo}>
      <Link to="/">
        <img src={config.siteLogoSvg} alt={config.siteTitle} />
      </Link>
    </h1>
    <nav>
      <ul className={styles.mainNav}>
        <li>
          <Link to="/about" activeClassName={styles.activeNav}>
            About
          </Link>
        </li>
        <Categories activeClassName={styles.activeNav} />
      </ul>
    </nav>
  </header>
);

export default Header;
