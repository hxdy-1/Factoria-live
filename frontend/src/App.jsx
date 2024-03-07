import "./App.css";
import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoadingTxt } from "./utils/Loading";

import { action as loginAction } from "./pages/LoginPage";
import { action as signupAction } from "./pages/SignupPage";
import { action as dashboardAction } from "./pages/DashboardPage";
import { action as editFactAction } from "./pages/EditFactPage";

import { loader as dashboardLoader } from "./pages/DashboardPage";
import { loader as profileLoader } from "./pages/ProfilePage";
import { loader as editFactLoader } from "./pages/EditFactPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const EditFactPage = lazy(() => import("./pages/EditFactPage"));

const router = createBrowserRouter([
	{
		// path: "/",
		index: true,
		element: (
			<Suspense fallback={LoadingTxt}>
				<LoginPage />
			</Suspense>
		),
		action: loginAction,
	},
	{
		path: "/signup",
		element: (
			<Suspense fallback={LoadingTxt}>
				<SignupPage />
			</Suspense>
		),
		action: signupAction,
	},
	{
		path: "/dashboard",
		element: (
			<Suspense fallback={LoadingTxt}>
				<DashboardPage />
			</Suspense>
		),
		loader: dashboardLoader,
		action: dashboardAction,
	},
	{
		path: "/profile",
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={LoadingTxt}>
						<ProfilePage />
					</Suspense>
				),
				loader: profileLoader,
			},
			{
				path: ":factId/edit",
				element: (
					<Suspense fallback={LoadingTxt}>
						<EditFactPage />
					</Suspense>
				),
				loader: editFactLoader,
				action: editFactAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
