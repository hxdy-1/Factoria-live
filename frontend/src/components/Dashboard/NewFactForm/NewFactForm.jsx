import { useEffect, useRef, useState } from "react";
import styles from "./NewFactForm.module.css";
import { Form, useNavigation } from "react-router-dom";
import CATEGORIES from "../../../utils/categories";

function NewFactForm({ setShowForm }) {
	const [text, setText] = useState("");
	const [source, setSource] = useState("");
	const [category, setCategory] = useState("");

	const navigation = useNavigation();

	const btnText =
		navigation.state === "submitting"
			? "Posting..."
			: navigation.state === "loading"
			? "Posted!"
			: "Post";

	if (navigation.state === "loading") setShowForm(false);

	const ref = useRef();
	const textLength = text.length;

	const maxTextLength = 100;
	const remainingCharacters = maxTextLength - textLength;

	if (remainingCharacters < 0) {
		alert(
			"Oops! It seems like your fact exceeds the maximum length allowed."
		);

		setText("");
		setSource("");
		setCategory("");
	}

	useEffect(() => {
		ref.current.focus();
	}, []);

	return (
		<Form method="post" action="/dashboard" className={styles["fact-form"]}>
			<input
				name="text"
				ref={ref}
				type="text"
				placeholder="Share a fact with the world..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				required
			/>
			<span>{remainingCharacters}</span>
			<input
				name="source"
				value={source}
				type="url"
				placeholder="Trustworthy source..."
				onChange={(e) => setSource(e.target.value)}
				required
			/>
			<select
				name="category"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				required
			>
				<option value="">Choose category:</option>
				{CATEGORIES.map((cat) => (
					<option key={cat.name} value={cat.name}>
						{cat.name.toUpperCase()}
					</option>
				))}
			</select>
			<button className="btn btn-large">{btnText}</button>
		</Form>
	);
}

export default NewFactForm;
