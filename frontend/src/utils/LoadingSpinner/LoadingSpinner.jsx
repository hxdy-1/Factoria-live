import styles from "./LoadingSpinner.module.css";

export default function LoadingIndicator() {
	return (
		// <svg
		// 	className={styles.spinner}
		// 	width="16px"
		// 	height="16px"
		// 	viewBox="0 0 66 66"
		// 	xmlns="http://www.w3.org/2000/svg"
		// >
		// 	<circle
		// 		className={styles.path}
		// 		fill="none"
		// 		stroke-width="10"
		// 		stroke-linecap="round"
		// 		cx="33"
		// 		cy="33"
		// 		r="30"
		// 	></circle>
		// </svg>
		// <div className={styles["loading-spinner"]}></div>
		<div className={styles["donut-ring"]}>
			<div className={`${styles.ring} ${styles.red}`}></div>
			<div className={`${styles.ring} ${styles.blue}`}></div>
			<div className={`${styles.ring} ${styles.orange}`}></div>
			<div className={`${styles.ring} ${styles.green}`}></div>
			<div className={styles.cutout}></div>
		</div>
	);
}
