"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import FlyingButton from "react-flying-item";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast"
import Image from "next/image";

export default function MenuPage() {
    const [product, setProduct] = useState({});
    const [selectedDimension, setSelectedDimension] = useState('');
    const { id } = useParams();
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [thickness, setThickness] = useState("");
    const [measurement, setMeasurement] = useState("");
    let dimensions = []


    const { addToCart } = useContext(CartContext);
    function handleAddToCart() {
        if (product.cut == "Cut to Size") {
            if (!length) {
                toast.error("Please enter length")
                return
            }
            if (!width) {
                toast.error("Please enter width")
                return
            }
            if (!thickness) {
                toast.error("Please enter thickness")
                return
            }
            dimensions.push(parseFloat(length))
            dimensions.push(parseFloat(width))
            dimensions.push(parseFloat(thickness))

        }
        else {
            if (selectedDimension.length == 0) {
                toast.error("Please select a cut")
                return
            }
            let temp = selectedDimension.split('/')
            dimensions = temp.map(parseFloat)

        }
        addToCart({

            _id: product._id,
            species: product.species,
            images: product.images,
            type: product.type,
            cut: product.cut,
            measurement,
            dimensions,
            price: product.price
        });
        toast.success("Added to cart!")


    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/products`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id }),
            });
            const p = await res.json();
            console.log("this is the product ", p)
            setMeasurement(p[0].measurement)
            setProduct(p[0]);
        };
        fetchData();
    }, []);

    if (!product)
        return <>Loading    </>

    return (
        <div    >

            <div className="">
                <div className="flex justify-center" >
                    {product.images && product.images.length > 0 ? (
                        <Image
                            className="rounded-md lg:w-1/3"
                            src={product.images[0]}
                            alt={''}
                            width={400}
                            height={400}
                        />
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="flex flex-col">

                    <span className="font-bold text-2xl mb-5"> {product.species}</span>
                    <span className="font-bold text-xl mb-5">{product.type}</span>
                    <span className="font-bold text-xl mb-5">{product.use}</span>
                    <span >{product.description}</span>
                    
                    <span className="font-bold text-lg"> {'\u20B9'}{product.price} /{product.measurement} </span>

                </div>
            </div>
            <div className="flex flex-col justify-between ">
                <div>
                    {product && product.cut == "Preplanned" ?

                        <select value={selectedDimension} onChange={(e) => setSelectedDimension(e.target.value)} className="text-l">
                            <option value="" disabled selected hidden></option>
                            {product.dimensions.map((dim, index) => (
                                <option key={index} value={`${dim[0]}/${dim[1]}/${dim[2]}`}>
                                    {dim[0]}/{dim[1]}/{dim[2]}
                                </option>
                            ))}
                        </select>

                        :
                        <div className=" lg:w-1/3 float-right">

                            <input type="text" placeholder="length" value={length}
                                onChange={ev => setLength(ev.target.value)} />


                            <input type="text" placeholder="width  " value={width}
                                onChange={ev => setWidth(ev.target.value)} />

                            <input type="text" placeholder="thickness" value={thickness}
                                onChange={ev => setThickness(ev.target.value)} />
                        </div>
                    }
                </div>
                <button onClick={handleAddToCart} className="bg-primary rounded-full text-white px-8 py-2 w-fit">ADD TO CART</button>

            </div>









        </div>
    );
}

