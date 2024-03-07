import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header({ showForm, setShowForm }) {
	const appTitle = "Factoria";
	const navigate = useNavigate();

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img
					src="../../../../logo.png"
					height="68"
					width="68"
					alt="Factoria-Logo"
				/>
				<h1>{appTitle}</h1>
			</div>

			<button
				className="btn btn-large btn-open btn-primary"
				onClick={() => setShowForm((show) => !show)}
			>
				{showForm ? "Close" : "Share a fact"}
			</button>

			<button
				className="btn btn-large btn-open btn-secondary"
				onClick={() => navigate("/profile")}
			>
				My facts
			</button>
		</header>
	);
}

export default Header;
