



// import React, { useEffect, useState } from "react";

// const CheckboxList = () => {
// 	const [species, setSpecies] = useState([]);
// 	const [uses, setUses] = useState([]);
// 	const [speciesChecked, setspeciesChecked] = useState([]);
// 	const [usesChecked, setUsesChecked] = useState([]);
// 	const [showDropdown, setShowDropdown] = useState(false);
// 	useEffect(() => {
// 		fetch("/api/options").then((response) => {
// 			response.json().then((data) => {
// 				let x = [],
// 					y = [];
// 				for (let i = 0; i < data.species.length; i++) {
// 					x.push(data.species[i].name);
// 				}

// 				for (let i = 0; i < data.uses.length; i++) {
// 					y.push(data.uses[i].name);
// 				}
// 				setSpecies([...x]);
// 				setUses([...y]);
// 			});
// 		});
// 	}, []);

// 	useEffect(() => {
// 		console.log(speciesChecked, usesChecked);
// 		fetch("/api/options", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ species: speciesChecked, uses: usesChecked }),
// 		}).then((response) => {
// 			response.json().then((data) => {
// 				console.log(data);
// 			});
// 		});
// 	}, [speciesChecked, usesChecked]);

// 	const speciesCheckboxChange = (option) => {
// 		if (speciesChecked.includes(option)) {
// 			setspeciesChecked(speciesChecked.filter((item) => item !== option));
// 		} else {
// 			setspeciesChecked([...speciesChecked, option]);
// 		}
// 	};

// 	const usesCheckboxChange = (option) => {
// 		if (usesChecked.includes(option)) {
// 			setUsesChecked(usesChecked.filter((item) => item !== option));
// 		} else {
// 			setUsesChecked([...usesChecked, option]);
// 		}
// 	};

// 	const handleFilterClick = () => {
// 		setShowDropdown(!showDropdown);
// 	};

// 	return (
// 		<div className="relative">
// 			<div className="	fixed sm:top-20 lg:top-30 z-50">
// 				<button onClick={handleFilterClick} className="w-fit">
// 					Filter
// 				</button>
// 				{showDropdown && (
// 					<div>
// 						<div>
// 							<h3>Species</h3>
// 							{species.map((option, index) => (
// 								<div key={index}>
// 									<input
// 										type="checkbox"
// 										id={option}
// 										checked={speciesChecked.includes(option)}
// 										onChange={() => speciesCheckboxChange(option)}
// 									/>
// 									<label htmlFor={option}>{option}</label>
// 								</div>
// 							))}
// 						</div>
// 						<div>
// 							<h3>Uses</h3>
// 							{uses.map((option, index) => (
// 								<div key={index}>
// 									<input
// 										type="checkbox"
// 										id={option}
// 										checked={usesChecked.includes(option)}
// 										onChange={() => usesCheckboxChange(option)}
// 									/>
// 									<label htmlFor={option}>{option}</label>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default CheckboxList;
