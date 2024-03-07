import React from "react";
import SignupForm from "../components/SignupForm/SignupForm";
import axios from "axios";
import { redirect } from "react-router-dom";

const SignupPage = () => {
	return <SignupForm />;
};

export default SignupPage;

export const action = async ({ request }) => {
	const data = await request.formData();
	const authData = {
		username: data.get("username"),
		password: data.get("password"),
	};
	// console.log(authData);
	const API = import.meta.env.VITE_BACKEND_API;
	// console.log(API);

	try {
		const { data } = await axios.post(
			// "http://localhost:3000/api/v1/user/signup",
			API + "user/signup",
			{
				username: authData.username,
				password: authData.password,
			}
		);

		// console.log(data.token);
		localStorage.clear();
		localStorage.setItem("token", data.token);
		localStorage.setItem("userId", data.userId);

		return redirect("/dashboard");
	} catch (error) {
		console.log(error.response.data.message);
		return error.response.data.message;
	}
};
