import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileFactList from "./ProfileFactList/ProfileFactList";
import axios from "axios";

const ProfileMain = ({ facts }) => {
	const [myFacts, setMyFacts] = useState(facts);
	const [username, setUsername] = useState("username");

	useEffect(() => {
		document.getElementById("root").style.justifyContent = "flex-start";

		async function fetchUsername() {
			const token = localStorage.getItem("token");
			// console.log(token);
			const API = import.meta.env.VITE_BACKEND_API;
			// console.log(API);

			try {
				const { data } = await axios.get(API + "user/me", {
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
				});

				// console.log(data);
				setUsername(data.username);
				return data.username;
			} catch (error) {
				setUsername("username");
				return "username";
			}
		}

		fetchUsername();
	}, [username]);

	return (
		<>
			<ProfileHeader />
			<p style={{ marginBottom: "0.7rem" }}>
				facts shared by {username} (you):
			</p>
			<div
				style={{
					overflow: "auto",
					paddingBottom: "40px",
					width: "100%",
				}}
			>
				<ProfileFactList myFacts={myFacts} setMyFacts={setMyFacts} />
				{facts.length !== 0 && (
					<p>
						You have shared {facts.length}{" "}
						{facts.length > 1 ? "facts!" : "fact!"}
					</p>
				)}
			</div>
		</>
	);
};

export default ProfileMain;
