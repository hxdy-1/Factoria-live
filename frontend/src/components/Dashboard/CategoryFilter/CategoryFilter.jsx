import React from "react";
import CATEGORIES from "../../../utils/categories";
import styles from "./CategoryFilter.module.css";

function CategoryFilter({ setCurrentCategory }) {
	return (
		<aside>
			<ul className={styles["cat-list"]}>
				<li className={styles.category}>
					<button
						className="btn btn-all-categories btn-primary"
						onClick={() => setCurrentCategory("all")}
						style={{ marginTop: "0", marginBottom: "16px" }}
					>
						All Categories
					</button>
				</li>

				{CATEGORIES.map((cat) => (
					<li key={cat.name} className={styles.category}>
						<button
							className="btn btn-category"
							style={{ backgroundColor: cat.color }}
							onClick={() => setCurrentCategory(cat.name)}
						>
							{cat.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

export default CategoryFilter;
