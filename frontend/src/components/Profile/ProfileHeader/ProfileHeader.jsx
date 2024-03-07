import React from "react";
import styles from "./ProfileHeader.module.css";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
	const appTitle = "Factoria";
	let logoutBtnTxt = "Logout";
	const navigate = useNavigate();

	const logoutHandler = (e) => {
		const loggingOut = confirm("Do you want to logout?");
		if (!loggingOut) return;

		localStorage.clear();
		navigate("/");
	};

	return (
		<header className={styles.header}>
			<button
				className="btn btn-large btn-open btn-primary"
				onClick={() => navigate("/dashboard")}
			>
				{"< Dashboard"}
			</button>

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
				className="btn btn-large btn-open btn-secondary"
				onClick={logoutHandler}
			>
				{logoutBtnTxt}
			</button>
		</header>
	);
};

export default ProfileHeader;
