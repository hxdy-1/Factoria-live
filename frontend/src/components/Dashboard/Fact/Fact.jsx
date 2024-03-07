import React, { useEffect, useState, useCallback } from "react";
import CATEGORIES from "../../../utils/categories";
import styles from "./Fact.module.css";
import axios from "axios";
import LoadingSpinner from "../../../utils/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Fact({ fact, setAllFacts, editable }) {
	const [isUpdating, setIsUpdating] = useState(false);
	const [voteType, setVoteType] = useState("");
	const [hasVoted, setHasVoted] = useState({
		interesting: false,
		mindBlowing: false,
		false: false,
	});

	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");

	const handleVote = useCallback(
		async (type, factId) => {
			setIsUpdating(true);
			setVoteType(type);
			const API = import.meta.env.VITE_BACKEND_API;
			try {
				const { data } = await axios.post(
					`${API}facts/${factId}/vote`,
					{ type },
					{
						headers: {
							Authorization:
								"Bearer " + localStorage.getItem("token"),
						},
					}
				);
				// console.log(data);ś

				setVoteType("");
				setAllFacts((prevFacts) =>
					prevFacts.map((f) =>
						f._id === fact._id ? data.updatedFact : f
					)
				);
				const userVotes = data.updatedFact.votesInteresting.includes(
					userId
				)
					? { interesting: true, mindBlowing: false, false: false }
					: data.updatedFact.votesMindblowing.includes(userId)
					? { interesting: false, mindBlowing: true, false: false }
					: data.updatedFact.votesFalse.includes(userId)
					? { interesting: false, mindBlowing: false, false: true }
					: { interesting: false, mindBlowing: false, false: false };
				setHasVoted(userVotes);
			} catch (error) {
				alert("failed to record vote");
			} finally {
				setIsUpdating(false);
			}
		},
		[fact._id, setAllFacts, userId]
	);

	useEffect(() => {
		if (fact.votesInteresting.includes(userId)) {
			setHasVoted((prevState) => ({ ...prevState, interesting: true }));
		} else if (fact.votesMindblowing.includes(userId)) {
			setHasVoted((prevState) => ({ ...prevState, mindBlowing: true }));
		} else if (fact.votesFalse.includes(userId)) {
			setHasVoted((prevState) => ({ ...prevState, false: true }));
		}
	}, [fact.votesFalse, fact.votesInteresting, fact.votesMindblowing, userId]);

	const isDisputed =
		fact.votesInteresting?.length + fact.votesMindblowing?.length <
		fact.votesFalse?.length;

	return (
		<li className={styles.fact}>
			<p>
				{isDisputed ? (
					<span className="disputed">[⛔️DISPUTED]</span>
				) : null}
				{fact.text}
				<a
					className="source"
					href={fact.source}
					target="_blank"
					rel="noreferrer"
				>
					(Source)
				</a>
			</p>
			<span
				className={styles.tag}
				style={{
					backgroundColor: CATEGORIES.find(
						(cat) => cat.name === fact.category
					)?.color,
				}}
			>
				{fact.category}
			</span>
			<div className={styles["vote-buttons"]}>
				<button
					className={hasVoted.interesting ? "interesting" : ""}
					onClick={() => handleVote("interesting", fact._id)}
					disabled={isUpdating}
				>
					👍{" "}
					{isUpdating && voteType === "interesting" ? (
						<LoadingSpinner />
					) : (
						fact?.votesInteresting?.length
					)}
				</button>
				<button
					className={hasVoted.mindBlowing ? "mind-blowing" : ""}
					onClick={() => handleVote("mindblowing", fact._id)}
					disabled={isUpdating}
				>
					🤯{" "}
					{isUpdating && voteType === "mindblowing" ? (
						<LoadingSpinner />
					) : (
						fact?.votesMindblowing?.length
					)}
				</button>
				<button
					className={hasVoted.false ? "false" : ""}
					onClick={() => handleVote("false", fact._id)}
					disabled={isUpdating}
				>
					⛔️{" "}
					{isUpdating && voteType === "false" ? (
						<LoadingSpinner />
					) : (
						fact?.votesFalse?.length
					)}
				</button>
				{editable && (
					<button
						className="btn btn-large btn-open btn-primary"
						onClick={() => navigate(`/profile/${fact._id}/edit`)}
					>
						Edit
					</button>
				)}
			</div>
		</li>
	);
}

export default Fact;
