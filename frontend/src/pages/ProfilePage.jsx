import React, { Suspense } from "react";
import ProfileMain from "../components/Profile/ProfileMain";
import axios from "axios";
import { Await, defer, useLoaderData } from "react-router-dom";
import { LoadingTxt } from "../utils/Loading";

const ProfilePage = () => {
	const { data } = useLoaderData();
	// console.log(data);

	return (
		<Suspense fallback={LoadingTxt}>
			<Await resolve={data}>
				{(data) => {
					// console.log(data);
					return <ProfileMain facts={data} />;
				}}
			</Await>
		</Suspense>
	);
};

export default ProfilePage;

export const loadData = async () => {
	const token = localStorage.getItem("token");
	// console.log(token);
	const API = import.meta.env.VITE_BACKEND_API;
	// console.log(API);

	try {
		const { data } = await axios.get(
			// "http://localhost:3000/api/v1/facts/my-facts",
			API + "facts/my-facts",
			{
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			}
		);

		// console.log("data: ", data);
		return data;
	} catch (error) {
		return token;
	}
};

export const loader = () => {
	return defer({
		data: loadData(),
	});
};
