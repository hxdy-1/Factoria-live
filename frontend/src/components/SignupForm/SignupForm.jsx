import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "../../utils/Card/Card";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const inputClasses =
	"w-full py-1.5 px-2 rounded outline-none focus:outline-stone-500 -outline-offset-2";

const buttonClasses =
	"mt-4 bg-white font-bold w-full text-black rounded-md py-2 transition-all transform hover:bg-emerald-500 active:translate-y-0.5 shadow-none";

const SignupForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const usernameRef = useRef();
	useEffect(() => {
		usernameRef.current.focus();
	}, []);

	const actionData = useActionData();
	const navigation = useNavigation();

	const signingIn = navigation.state === "submitting";
	// console.log(actionData);
	// if (actionData) console.log("actionData is truthy");

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}, []);

	return (
		<Card>
			<h1 className="font-sans text-4xl font-bold">Signup 🖋️</h1>
			{!actionData ? (
				// <p>Enter your information to create an account</p>
				// <p>Create account: Enter your information</p>
				<p>Enter your information to signup</p>
			) : (
				<p className="disputed">{actionData}</p>
			)}
			<Form method="post" action="/signup" className="auth-form">
				<label htmlFor="username" className="w-full">
					Username
				</label>
				<input
					ref={usernameRef}
					type="text"
					id="username"
					name="username"
					onChange={handleChange}
					value={formData.username}
					// className={}
					placeholder="Pick a unique username"
					required
				/>
				<label htmlFor="password" className="w-full">
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={handleChange}
					value={formData.password}
					// className={}
					placeholder="Create a strong password"
					required
				/>
				<button className="btn btn-large btn-all-categories">
					{!signingIn ? "Signup" : "Signing Up..."}
				</button>
			</Form>
			<p>
				Already have an account?{" "}
				<Link className="underline underline-offset-2" to="/">
					Login
				</Link>
			</p>
		</Card>
	);
};

export default SignupForm;
