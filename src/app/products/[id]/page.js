"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import FlyingButton from "react-flying-item";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";
import Image from "next/image";
const FEET = 30.08;

export default function MenuPage() {
	const [product, setProduct] = useState({});
	const [selectedDimension, setSelectedDimension] = useState("");
	const { id } = useParams();
	const [length, setLength] = useState("");
	const [width, setWidth] = useState("");
	const [thickness, setThickness] = useState("");
	const [measurement, setMeasurement] = useState("ft");
	const price = 0;
	const [image, setImage] = useState("");

	let dimensions = [];

	const { addToCart } = useContext(CartContext);
	function handleAddToCart() {
		if (product.cut == "Cut to Size") {
			if (!length) {
				toast.error("Please enter length");
				return;
			}
			if (!width) {
				toast.error("Please enter width");
				return;
			}
			if (!thickness) {
				toast.error("Please enter thickness");
				return;
			}
			if (measurement == "cm") {
				dimensions.push(parseFloat(length / FEET));
				dimensions.push(parseFloat(width / FEET));
				dimensions.push(parseFloat(thickness / FEET));
			} else {
				dimensions.push(parseFloat(length));
				dimensions.push(parseFloat(width));
				dimensions.push(parseFloat(thickness));
			}
		} else {
			if (selectedDimension.length == 0) {
				toast.error("Please select a cut");
				return;
			}
			let temp = selectedDimension.split("/");
			dimensions = temp.map(parseFloat);
			if (measurement == "cm") {
				dimensions = temp.map((a) => (a / FEET).toFixed(2));
			}
		}
		addToCart({
			_id: product._id,
			species: product.species,
			images: product.images,
			type: product.type,
			cut: product.cut,
			measurement,
			dimensions,
			quantity:1,
			price: product.price,
		});
		toast.success("Added to cart!");
	}
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`/api/products`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: id }),
			});
			const p = await res.json();
			console.log("this is the product ", p);
			setMeasurement(p[0].measurement);
			setProduct(p[0]);
			setImage(p[0]?.images[0]);
		};
		fetchData();
	}, []);
	function changeMeasurement(e) {
		e.preventDefault();

		if (product.cut === "Preplanned") {
			if (e.target.value === "cm") {
				product.dimensions = product.dimensions.map((d) =>
					d.map((a) => (a * FEET).toFixed(2))
				);
			}
			if (e.target.value === "ft") {
				product.dimensions = product.dimensions.map((d) =>
					d.map((a) => (a / FEET).toFixed(2))
				);
			}
			setMeasurement(e.target.value);

		}
	}

	if (!product) return <>Loading </>;

	return (
		<div>
			<div className="">
				<div className="flex justify-center">
					{product.images && product.images.length > 0 ? (
						<Image
							className="rounded-md lg:w-1/2"
							src={image}
							alt={""}
							width={450}
							height={450}
						/>
					) : (
						<p>No images available</p>
					)}
				</div>
				<div className="flex justify-center "> 
					{product.images && product.images.length > 0 ? (
						product.images.map((i) => (
							<Image
								className="rounded-md lg:w-1/10  m-2"
								src={i}
								alt={""}
								width={100}
								height={100}

								onClick={(e)=>setImage(i)}
							/>
						))
					) : (
						<p>No images available</p>
					)}
				</div>
				<div className="flex flex-col">
					<span className="font-bold text-2xl mb-5"> Species : {product.species}</span>
					<span className="font-bold text-xl mb-5">Type : {product.type}</span>
					<span className="font-bold text-xl mb-5">Use : {product.use}</span>
					<span><b>Description : </b>{product.description}</span>
					<div className="flex gap-24 m-10 lg:w-1/3 sm:w-1 justify-between">
						<div>
							<label htmlFor=" ft" className="font-bold text-xl mr-5">
								ft
							</label>
							<input
								type="radio"
								id="ft"
								name="ft"
								value="ft"
								checked={measurement == "ft"}
								onChange={(e) => changeMeasurement(e)}
								className="transform scale-150"
							/>
						</div>
						<div>
							<label htmlFor="cm" className="font-bold text-xl mr-5">
								cm
							</label>
							<input
								type="radio"
								id="cm"
								name="cm"
								value="cm"
								checked={measurement == "cm"}
								onChange={(e) => changeMeasurement(e)}
								className="transform scale-150"
							/>
						</div>
					</div>
					<span className="font-bold text-lg">
						{" "}
						{"\u20B9"}
						{product.price} /{product.measurement}{" "}
					</span>
				</div>
			</div>
			<div className="flex flex-col justify-between mt-5">
				<div>
					{product && product.cut == "Preplanned" ? (
						<select
							value={selectedDimension}
							onChange={(e) => setSelectedDimension(e.target.value)}
							className="text-l"
						>
							<option value="" disabled selected hidden></option>
							{product.dimensions.map((dim, index) => (
								<option key={index} value={`${dim[0]}/${dim[1]}/${dim[2]}`}>
									{dim[0]}/{dim[1]}/{dim[2]}
								</option>
							))}
						</select>
					) : (
						<div className=" lg:w-1/3 float-right">
							<input
								type="text"
								placeholder="length"
								value={length}
								onChange={(ev) => setLength(ev.target.value)}
							/>

							<input
								type="text"
								placeholder="width  "
								value={width}
								onChange={(ev) => setWidth(ev.target.value)}
							/>

							<input
								type="text"
								placeholder="thickness"
								value={thickness}
								onChange={(ev) => setThickness(ev.target.value)}
							/>
						</div>
					)}
				</div>
				<button
					onClick={handleAddToCart}
					className="bg-primary rounded-full text-white px-8 py-2 w-fit mt-6"
				>
					ADD TO CART
				</button>
			</div>
		</div>
	);
}
