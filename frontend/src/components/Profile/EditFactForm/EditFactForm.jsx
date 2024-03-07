import React, { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import Card from "../../../utils/Card/Card";
import styles from "./EditFactForm.module.css";

const EditFactForm = ({ fact }) => {
	// const [disableBtn, setDisableBtn] = useState(false);
	// console.log(fact);
	const navigation = useNavigation();

	// console.log(disableBtn);
	// if (navigation.state === "submitting" || navigation.state === "loading")
	// 	setDisableBtn(true);
	// console.log(disableBtn);

	// if (navigation.state === "idle") setDisableBtn(false);
	// console.log(disableBtn);

	const updatedBtnText =
		navigation.state === "submitting"
			? "Updating... "
			: navigation.state === "loading"
			? "Updated!"
			: "Update";

	return (
		<Card>
			<Form method="post" className="auth-form">
				<label htmlFor="text">text</label>
				<input
					type="text"
					id="text"
					name="text"
					defaultValue={fact?.text}
					required
				/>
				<label htmlFor="source">source url</label>
				<input
					type="url"
					id="source"
					name="source"
					defaultValue={fact?.source}
					required
				/>
				<div className={styles.actions}>
					<button
						className={`btn btn-large btn-all-categories ${styles.delete}`}
						name="intent"
						value="delete"
					>
						delete
					</button>
					<button
						className={`btn btn-large btn-all-categories ${styles.cancel}`}
						name="intent"
						value="cancel"
					>
						cancel
					</button>
					<button
						className="btn btn-large btn-all-categories btn-primary"
						name="intent"
						value="update"
						// disabled={disableBtn}
					>
						{updatedBtnText}
					</button>
				</div>
			</Form>
		</Card>
	);
};

export default EditFactForm;
