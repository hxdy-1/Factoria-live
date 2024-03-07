import React from "react";
import styles from "./Card.module.css";

const Card = ({ children, customStyles }) => {
	return <div className={styles.card}>{children}</div>;
};

export default Card;
