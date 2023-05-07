import React from "react";
import styles from "./Header.module.css"
import mainImage from "../../assets/main-img.jpg"
import HeaderCartButton from "./HeaderCartButton";

const Header =  props => {
    return (
      <div>
        <header className={styles.header}>
          <h1>Food Order App</h1>
          <HeaderCartButton/>
        </header>
        <img
          src={mainImage}
          alt="A meal!"
          className={styles["main-image"]}
        />
      </div>
    );
}

export default Header;