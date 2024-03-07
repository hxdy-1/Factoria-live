import React from "react";
import Fact from "../Fact/Fact";
import styles from "./FactList.module.css";

function FactList({ facts, setAllFacts }) {
	if (facts.length === 0)
		return (
			<p className="message">
				No facts for this category yet! Create the first one ✌️
			</p>
		);

	return (
		<section>
			<ul className={styles["facts-list"]}>
				{facts.map((fact) => (
					<Fact
						key={fact._id}
						fact={fact}
						setAllFacts={setAllFacts}
						editable={false}
					/>
				))}
			</ul>
			<p>
				There {facts.length > 1 ? "are" : "is"} {facts.length}{" "}
				{facts.length > 1 ? "facts" : "fact"} in the database. Add your
				own!
			</p>
		</section>
	);
}

export default FactList;
