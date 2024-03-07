import React from "react";
import styles from "./ProfileFactList.module.css";
import { Link } from "react-router-dom";
import Fact from "../../Dashboard/Fact/Fact";

const ProfileFactList = ({ myFacts, setMyFacts }) => {
	// console.log("facts from pfl: ", myFacts);

	if (myFacts.length === 0)
		return (
			<p className="message">
				You haven't shared any fact yet! Share your first one from
				<Link to="/dashboard"> Dashboard</Link> ✌️
			</p>
		);

	return (
		<ul className={styles["facts-list"]}>
			{myFacts?.map((fact) => (
				<Fact
					key={fact._id}
					fact={fact}
					setAllFacts={setMyFacts}
					editable={true}
				/>
			))}
		</ul>
	);
};

export default ProfileFactList;
