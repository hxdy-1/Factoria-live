import React, { Suspense } from "react";
import EditFactForm from "../components/Profile/EditFactForm/EditFactForm";
import { Await, useLoaderData, defer, redirect } from "react-router-dom";
import { LoadingTxt } from "../utils/Loading";
import axios from "axios";

const EditFactPage = () => {
	const data = useLoaderData();
	// console.log("loader data", data);

	return (
		<Suspense fallback={LoadingTxt}>
			<EditFactForm fact={data} />
		</Suspense>
	);
};

export default EditFactPage;

export const loader = async ({ request, params }) => {
	const factId = params.factId;
	// console.log(factId);

	const API = import.meta.env.VITE_BACKEND_API;
	// console.log(API);

	try {
		const { data } = await axios.get(
			// "http://localhost:3000/api/v1/facts/:factId",
			API + "facts/" + factId
		);
		// console.log("data: ", data);
		return data;
	} catch (error) {
		console.log(error?.response?.data?.message);
		return error?.response?.data?.message;
	}
};

export const action = async ({ request, params }) => {
	const data = await request.formData();
	const authData = {
		text: data.get("text"),
		source: data.get("source"),
	};
	// console.log(authData);

	let intent = data.get("intent");
	// console.log(intent);

	const factId = params.factId;
	// console.log(factId);

	const API = import.meta.env.VITE_BACKEND_API;
	// console.log(API);

	if (intent === "cancel") {
		return redirect("..");
	}

	if (intent === "update") {
		try {
			// console.log(authData);
			const { data } = await axios.put(
				// "http://localhost:3000/api/v1/facts/:factId",
				API + "facts/" + factId,
				authData,
				{
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("token"),
					},
				}
			);

			console.log("updated fact: ", data);
			// alert("Your fact has been updated! Thanks for sharing");

			return redirect("..");
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	if (intent === "delete") {
		try {
			// console.log(authData);
			const isDelete = confirm("Do you want to delete this fact?");
			if (!isDelete) {
				return null;
			}

			// console.log("proceeding");
			const { data } = await axios.delete(
				// "http://localhost:3000/api/v1/facts/:factId",
				API + "facts/" + factId,
				{
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("token"),
					},
				}
			);

			console.log(data);
			// alert("Your fact has been deleted.");

			return redirect("..");
		} catch (error) {
			console.log(error);
			return error;
		}
	}
};
