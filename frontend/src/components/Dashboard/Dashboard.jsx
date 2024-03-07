import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import NewFactForm from "./NewFactForm/NewFactForm";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import FactList from "./FactList/FactList";

const Dashboard = ({ facts }) => {
	const [showForm, setShowForm] = useState(false);
	const [allFacts, setAllFacts] = useState(facts);
	const [currentCategory, setCurrentCategory] = useState("all");
	// console.log(facts);
	// console.log(showForm);
	// console.log(currentCategory);
	// console.log("allFacts: ", allFacts);

	useEffect(() => {
		document.getElementById("root").style.justifyContent = "flex-start";
	}, []);

	useEffect(() => {
		if (currentCategory === "all") {
			// Reset to original list if "all" category is selected
			setAllFacts(facts);
		} else {
			// Filtering the facts based on the current category
			const filteredFacts = facts.filter(
				(fact) =>
					fact.category.toLowerCase() ===
					currentCategory.toLowerCase()
			);
			setAllFacts(filteredFacts);
		}
	}, [currentCategory, facts]);

	return (
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />
			{showForm && <NewFactForm setShowForm={setShowForm} />}
			<main>
				<CategoryFilter setCurrentCategory={setCurrentCategory} />
				<FactList facts={allFacts} setAllFacts={setAllFacts} />
			</main>
		</>
	);
};

export default Dashboard;
