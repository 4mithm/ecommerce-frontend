"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Products() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch("/api/products").then((response) => {
			response.json().then((data) => {
				// console.log(data, "this is the product data ");
				setProducts(data);
			});
		});
	}, []);
	// -----------------------------------------------------------------------------------------------------------------
	const [species, setSpecies] = useState([]);
	const [uses, setUses] = useState([]);
	const [speciesChecked, setspeciesChecked] = useState([]);
	const [usesChecked, setUsesChecked] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	useEffect(() => {
		fetch("/api/options").then((response) => {
			response.json().then((data) => {
				let x = [],
					y = [];
				for (let i = 0; i < data.species.length; i++) {
					x.push(data.species[i].name);
				}

				for (let i = 0; i < data.uses.length; i++) {
					y.push(data.uses[i].name);
				}
				setSpecies([...x]);
				setUses([...y]);
			});
		});
	}, []);

	useEffect(() => {
		console.log(speciesChecked, usesChecked);
		fetch("/api/options", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ species: speciesChecked, uses: usesChecked }),
		}).then((response) => {
			response.json().then((data) => {
				setProducts(data);
			});
		});
	}, [speciesChecked, usesChecked]);

	const speciesCheckboxChange = (option) => {
		if (speciesChecked.includes(option)) {
			setspeciesChecked(speciesChecked.filter((item) => item !== option));
		} else {
			setspeciesChecked([...speciesChecked, option]);
		}
	};

	const usesCheckboxChange = (option) => {
		if (usesChecked.includes(option)) {
			setUsesChecked(usesChecked.filter((item) => item !== option));
		} else {
			setUsesChecked([...usesChecked, option]);
		}
	};

	const handleFilterClick = () => {
		setShowDropdown(!showDropdown);
	};

	// --------------------------------------------------------------------------------------------------------------------------------
	return (
		<section className="mt-8 relative">
			<div className="">

					<div className=" z-10 sticky bottom-0">
						<button onClick={handleFilterClick} className="w-fit bg-primary text-white">
							Filter
						</button>
						{showDropdown && (
							<div className=" fixed bg-slate-100 p-5 ">
								<div>
									<h3>Species</h3>
									{species.map((option, index) => (
										<div key={index}>
											<input
												type="checkbox"
												id={option}
												checked={speciesChecked.includes(option)}
												onChange={() => speciesCheckboxChange(option)}
											/>
											<label htmlFor={option}>{option}</label>
										</div>
									))}
								</div>
								<div>
									<h3>Uses</h3>
									{uses.map((option, index) => (
										<div key={index}>
											<input
												type="checkbox"
												id={option}
												checked={usesChecked.includes(option)}
												onChange={() => usesCheckboxChange(option)}
											/>
											<label htmlFor={option}>{option}</label>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
			</div>
			<div className="grid sm:grid-cols-3 gap-4 mt-10 mb-12  ">
				{products.map((product) => (
					<Link
						href={`products/${product._id}`}
						className="bg-gray-200 rounded-lg p-4 hover:bg-gray-400"
					>
						<div className=" relative flex justify-center">
							<Image
								className="rounded-md object-contain "
								src={product.images[0]}
								alt={""}
								width={150}
								height={150}
							/>
						</div>
						<div className="text-center">{product.species}</div>
						<div className="text-center"> {product.cut}</div>
					</Link>
				))}
			</div>
		</section>
	);
}
