"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
	const [h, w, t] = cartProduct.dimensions;
	const totalPrice = parseFloat(cartProduct.price) * h * w * t * cartProduct.quantity;
	const roundedTotalPrice = totalPrice.toFixed(2);

	return parseFloat(roundedTotalPrice);
}

export function AppProvider({ children }) {
	const [cartProducts, setCartProducts] = useState([]);

	const ls = typeof window !== "undefined" ? window.localStorage : null;

	useEffect(() => {
		if (ls && ls.getItem("cart")) {
			setCartProducts(JSON.parse(ls.getItem("cart")));
		}
	}, []);

	function clearCart() {
		setCartProducts([]);
		saveCartProductsToLocalStorage([]);
	}

	// --------------------------------------------------------------------------------------------------
	function addQuantity(index) {
		console.log(index);
		const cart = [...cartProducts];
		const indexedProduct = cart[index];
		if (indexedProduct) {
			// Decrease quantity by 1, ensuring it doesn't go below zero
			indexedProduct.quantity += 1;

			// Update the state with the modified cart
			saveCartProductsToLocalStorage(cart);
		}
		setCartProducts(cart);
	}
	function removeQuantity(index) {
		console.log(index);

		const cart = [...cartProducts];
		const indexedProduct = cart[index];
		if (indexedProduct && indexedProduct.quantity > 1) {
			// Decrease quantity by 1, ensuring it doesn't go below zero
			indexedProduct.quantity -= 1;

			// Update the state with the modified cart
			saveCartProductsToLocalStorage(cart);
		}
		setCartProducts(cart);
	}

	// --------------------------------------------------------------------------------------------------------
	function removeCartProduct(indexToRemove) {
		setCartProducts((prevCartProducts) => {
			const newCartProducts = prevCartProducts.filter(
				(v, index) => index !== indexToRemove
			);

			saveCartProductsToLocalStorage(newCartProducts);
			return newCartProducts;
		});
		toast.success("Product removed");
	}

	function saveCartProductsToLocalStorage(cartProducts) {
		if (ls) {
			ls.setItem("cart", JSON.stringify(cartProducts));
		}
	}

	function addToCart(product) {
		setCartProducts((prevProducts) => {
			const newProducts = [...prevProducts, product];
			saveCartProductsToLocalStorage(newProducts);
			return newProducts;
		});
	}

	return (
		<SessionProvider>
			<CartContext.Provider
				value={{
					cartProducts,
					setCartProducts,
					addToCart,
					removeCartProduct,
					clearCart,
					addQuantity,
					removeQuantity,
				}}
			>
				{children}
			</CartContext.Provider>
		</SessionProvider>
	);
}
