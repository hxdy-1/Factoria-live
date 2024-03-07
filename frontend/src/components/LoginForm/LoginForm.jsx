import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "../../utils/Card/Card";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const LoginForm = () => {
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

	const loggingIn = navigation.state === "submitting";
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
			<h1>Login 🔒</h1>
			{!actionData ? (
				<p>Enter your credentials to login</p>
			) : (
				<p className="disputed">{actionData}</p>
			)}
			<Form
				method="post"
				// action="/"
				className="auth-form"
			>
				<label htmlFor="username">Username</label>
				<input
					ref={usernameRef}
					type="text"
					id="username"
					name="username"
					onChange={handleChange}
					value={formData.username}
					// className={}
					placeholder="Enter your username"
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={handleChange}
					value={formData.password}
					// className={}
					placeholder="Enter your password"
					required
				/>
				<button className="btn btn-large btn-all-categories">
					{!loggingIn ? "Login" : "Logging In..."}
				</button>
			</Form>
			<p>
				Don't have an account?{" "}
				<Link className="underline underline-offset-2" to="/signup">
					Signup
				</Link>
			</p>
		</Card>
	);
};

export default LoginForm;
