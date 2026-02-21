import React, { useState, useEffect, useContext } from "react";
import {  Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "./compoents/HomePage";
import KrossovkiPage from "./compoents/KrossovkiPage";
import OdezhdaPage from "./compoents/OdezhdaPage";
import BlogsPage from "./compoents/BlogsPage";
import Footer from "./compoents/Footer";
import KrossovkiBlogPage from "./compoents/KrossovkiBlogPage";
import OdezhdaBlogPage from "./compoents/OdezhdaBlogPage";
import ProductInfoSection from "./compoents/ProductInfoSection";
import BasketPage from "./compoents/BasketPage";
import PersonalAccount from "./compoents/PersonalAccountPage";
import Account from "./compoents/Account";

import Loader from "./compoents/child/Loader";
import OrderHistory from "./compoents/OrderHistoty";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./compoents/LoginPage";
import RegisterPage from "./compoents/RegisterPage";
import { PrivateRoute } from "./compoents/PrivateRoute";
import Layout from "./compoents/Layout";

function AppContent() {
	const [products, setProducts] = useState([]);
	const [tShorts, setTShorts] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [cardItem, setCardItem] = useState([]);

	// console.log(cardItem)
	const { isLoading: isAuthLoading } = useContext(AuthContext);

	useEffect(() => {
		let aborted = false;

		const BASE = import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, "");
		const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

		const fetchJson = async (pathAndQuery) => {
			const url = `${BASE}${pathAndQuery}`;
			const res = await fetch(url, {
				headers: {
					apikey: KEY,
					Authorization: `Bearer ${KEY}`,
				},
			});
			if (!res.ok) {
				const text = await res.text();
				console.error(`HTTP ${res.status} for ${url}\n${text}`);
				throw new Error(`HTTP ${res.status}`);
			}
			return res.json();
		};

		(async () => {
			try {
				setIsDataLoading(true);

				const [productsData, clothingData] = await Promise.all([
					fetchJson(
						`/rest/v1/products?select=*&order=created_at.desc`
					),
					fetchJson(`/rest/v1/clothingData?select=*`),
				]);

				if (aborted) return;

				setProducts(productsData ?? []);
				setTShorts(clothingData ?? []);
				console.log("Загружено:", {
					products: productsData?.length ?? 0,
					clothing: clothingData?.length ?? 0,
				});
			} catch (e) {
				console.error("Загрузка упала:", e);
			} finally {
				if (!aborted) setIsDataLoading(false);
			}
		})();

		return () => {
			aborted = true;
		};
	}, []);

	console.log(import.meta.env.VITE_SUPABASE_URL);
	console.log(
		import.meta.env.VITE_SUPABASE_ANON_KEY
			? "ключ есть"
			: "ключ отсутствует"
	);

	const handleAddCard = (productAdd) => {
		setCardItem((prevItems) => {
			const existingItem = prevItems.find(
				(item) =>
					item.id === productAdd.id && item.size === productAdd.size
			);
			if (existingItem) {
				return prevItems.map((item) =>
					item.id === productAdd.id && item.size === productAdd.size
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevItems, { ...productAdd, quantity: 1 }];
		});
	};
	const handleUpdateCart = (productId, size, newQuantity) => {
		setCardItem((currentCart) => {
			if (newQuantity <= 0) {
				return currentCart.filter(
					(item) =>
						!(
							item.id === productId &&
							item.size.toString() === size.toString()
						)
				);
			}
			return currentCart.map((item) => {
				if (
					item.id === productId &&
					item.size.toString() === size.toString()
				) {
					return { ...item, quantity: newQuantity };
				}
				return item;
			});
		});
	};

	if (isDataLoading || isAuthLoading) return <Loader />;
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage products={products} />} />
				<Route
					path="/krossovki"
					element={<KrossovkiPage products={products} />}
				/>
				<Route
					path="/odezhda"
					element={<OdezhdaPage products={tShorts} />}
				/>
				<Route
					path="/blog"
					element={
						<BlogsPage products={products} tShorts={tShorts} />
					}
				/>
				<Route
					path="/krossovki/:id"
					element={<KrossovkiBlogPage productsBloge={products} />}
				/>
				<Route
					path="/odezhda/:id"
					element={<OdezhdaBlogPage tShorts={tShorts} />}
				/>
				<Route
					path="/krossovki-info/:id"
					element={
						<ProductInfoSection
							products={products}
							onAddToCard={handleAddCard}
						/>
					}
				/>
				<Route
					path="/odezhda-info/:id"
					element={
						<ProductInfoSection
							products={tShorts}
							onAddToCard={handleAddCard}
						/>
					}
				/>
				<Route
					path="/card"
					element={
						<BasketPage
							products={products}
							cardItem={cardItem}
							setCard={setCardItem}
							onUpdate={handleUpdateCart}
						/>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/account"
					element={
						<PrivateRoute>
							<PersonalAccount />
						</PrivateRoute>
					}
				>
					<Route path="profile" element={<Account />} />
					<Route path="orders" element={<OrderHistory />} />
					<Route
						index
						element={<Navigate to={"profile"} replace />}
					/>
				</Route>
				;
			</Route>,
		),
	);
	return (
		<div className="app-container">
			<div className="promo-banner">
				Только три дня скидка <span>-30%</span> на всё!
			</div>
			<RouterProvider router={router} />
		</div>
	);
	// return (
	// 	<div className="app-container">
	// 		<div className="promo-banner">
	// 			Только три дня скидка <span>-30%</span> на всё!
	// 		</div>
	// 		<Header />
	// 		<Routes>
	// 			<Route path="/" element={<HomePage products={products} />} />
	// 			<Route
	// 				path="/krossovki"
	// 				element={<KrossovkiPage products={products} />}
	// 			/>
	// 			<Route
	// 				path="/odezhda"
	// 				element={<OdezhdaPage products={tShorts} />}
	// 			/>
	// 			<Route
	// 				path="/blog"
	// 				element={
	// 					<BlogsPage products={products} tShorts={tShorts} />
	// 				}
	// 			/>
	// 			<Route
	// 				path="/krossovki/:id"
	// 				element={<KrossovkiBlogPage productsBloge={products} />}
	// 			/>
	// 			<Route
	// 				path="/odezhda/:id"
	// 				element={<OdezhdaBlogPage tShorts={tShorts} />}
	// 			/>
	// 			<Route
	// 				path="/krossovki-info/:id"
	// 				element={
	// 					<ProductInfoSection
	// 						products={products}
	// 						onAddToCard={handleAddCard}
	// 					/>
	// 				}
	// 			/>
	// 			<Route
	// 				path="/odezhda-info/:id"
	// 				element={
	// 					<ProductInfoSection
	// 						products={tShorts}
	// 						onAddToCard={handleAddCard}
	// 					/>
	// 				}
	// 			/>
	// 			<Route
	// 				path="/card"
	// 				element={
	// 					<BasketPage
	// 						products={products}
	// 						cardItem={cardItem}
	// 						setCard={setCardItem}
	// 						onUpdate={handleUpdateCart}
	// 					/>
	// 				}
	// 			/>
	// 			<Route path="/login" element={<LoginPage />} />
	// 			<Route path="/register" element={<RegisterPage />} />
	// 			<Route
	// 				path="/account"
	// 				element={
	// 					<PrivateRoute>
	// 						<PersonalAccount />
	// 					</PrivateRoute>
	// 				}
	// 			>
	// 				<Route path="profile" element={<Account />} />
	// 				<Route path="orders" element={<OrderHistory />} />
	// 				<Route
	// 					index
	// 					element={<Navigate to={"profile"} replace />}
	// 				/>
	// 			</Route>
	// 			;
	// 		</Routes>
	// 		<Footer />
	// 	</div>
	// );
}

export default AppContent;
