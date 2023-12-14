"use client"
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";


export default  function Products() {
  const [products, setProducts]=useState([])
  useEffect(() => {
    fetch('/api/products').then(response => {
      response.json().then(data => {
        // console.log(data, "this is the product data ");
        setProducts(data)
      })
    })})


  return (
    <section className="mt-8">

      <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12  ">
        {
          products.map(product =>
            <Link href={`products/${product._id}`}
              className="bg-gray-200 rounded-lg p-4 hover:bg-gray-400"

            >
              <div className=" relative flex justify-center">
                <Image
                  className="rounded-md"
                  src={product.images[0]} alt={''} width={150} height={150} />
              </div>
              <div className="text-center">
                {product.species}
              </div>
              <div className="text-center"> {product.type}</div>
            </Link>



          )
        }
      </div>



    </section >
  );
}
