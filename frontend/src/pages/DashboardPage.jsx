import React, { Suspense } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { Await, useLoaderData, defer, redirect } from "react-router-dom";
import { LoadingTxt } from "../utils/Loading";
import axios from "axios";

const DashboardPage = () => {
	const { data } = useLoaderData();
	// console.log(data);

	return (
		<Suspense fallback={LoadingTxt}>
			<Await resolve={data}>
				{(data) => {
					// console.log(data);
					return <Dashboard facts={data} />;
				}}
			</Await>
		</Suspense>
	);
};

export default DashboardPage;

export const loadData = async () => {
	const token = localStorage.getItem("token");
	// console.log(token);
	const API = import.meta.env.VITE_BACKEND_API;
	// console.log(API);

	try {
		const { data } = await axios.get(
			// "http://localhost:3000/api/v1/facts",
			API + "facts",
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

export const action = async ({ request }) => {
	const data = await request.formData();
	const authData = {
		text: data.get("text"),
		source: data.get("source"),
		category: data.get("category"),
	};
	// console.log(authData);

	const API = import.meta.env.VITE_BACKEND_API;
	// console.log(API);

	try {
		const { data } = await axios.post(
			// "http://localhost:3000/api/v1/facts",
			API + "facts",
			authData,
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		);

		// console.log(data);
		// alert("Your fact is live! Thanks for sharing");

		return redirect("/dashboard");
	} catch (error) {
		console.log(error.response?.data?.message);
		return false;
	}
};
