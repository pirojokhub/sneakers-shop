import img1 from "../img/deliver-icons/pochta.png";
import img2 from "../img/deliver-icons/CDEK.png";

import vk from "../img/modals-icons/vk.png";
import whatSapp from "../img/modals-icons/whatsapp.png";
import telegram from "../img/modals-icons/telegram.png";
import viber from "../img/modals-icons/viber.png";
import instagram from "../img/modals-icons/instagram.png";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router";
// import { useParams } from "react-router";

function BasketPage({ cardItem, onUpdate, setCard }) {
	const [selectedDelivery, setSelectedDelivery] = useState("cdek-courier");
	// const [close, setClose] = useState(true);
	const finalPrice = cardItem.reduce((sum, item) => {
		const itemQuantity = item.quantity || 1;
		return sum + item.price * itemQuantity;
	}, 0);

	const deliverOption = [
		{
			id: "pochta-courier",
			title: "Почта России",
			subtitle: "(Без примерки)",
			price: 620,
			logo: img1,
		},
		{
			id: "cdek-courier",
			title: "СДЭК курьер до двери",
			subtitle: "(Есть примерка)",
			price: 440,
			logo: img2,
		},
		{
			id: "cdek-pick-up",
			title: "СДЭК Пункт выдачи заказов",
			subtitle: "(Есть примерка)",
			price: 300,
			logo: img2,
		},
	];

	const socialIcons = [
		{
			id: 1,
			title: "vk",
			img: vk,
		},
		{
			id: 2,
			title: "whatSapp",
			img: whatSapp,
		},
		{
			id: 3,
			title: "telegram",
			img: telegram,
		},
		{
			id: 4,
			title: "viber",
			img: viber,
		},
		{
			id: 5,
			title: "instagram",
			img: instagram,
		},
	];

	console.log(cardItem);

	async function handlePlaceOrder() {
		if (!cardItem || cardItem.length === 0) {
			return (
				<section className="card-page">
					<div
						className="container"
						style={{ textAlign: "center", padding: "50px 0" }}
					>
						<h2>Ваша корзина пуста</h2>
					</div>
				</section>
			);
		}

		const { data: userData, error: userErr } =
			await supabase.auth.getUser();
		if (userErr || !userData?.user) {
			return (
				<section className="card-page">
					<div
						className="container"
						style={{ textAlign: "center", padding: "50px 0" }}
					>
						<Link to="/login">Сначала войдите в аккаунт</Link>
					</div>
				</section>
			);
		}
		const userId = userData.user.id;

		// 2) Готовим состав заказа (только то, что реально нужно сохранить)
		const orderItems = cardItem.map((item) => ({
			id: item.id,
			title: item.title,
			price: item.price,
			quantity: item.quantity ?? 1,
			size: item.size,
		}));

		const newOrder = {
			user_id: userId, 
			items: orderItems, 
			total_sum: finalPrice, 
			is_delivery: false, 
			is_paid: true,
			
		};

		const { error } = await supabase
			.from("orders")
			.insert([newOrder])
			.select(); 

		if (error) {
			console.error("Order insert error:", error);
			alert("Не удалось оформить заказ. Попробуйте ещё раз.");
			return;
		}

		alert("Заказ успешно создан!");
		setCard([]);
	}

	return (
		<section className="card-page">
			<div className="container">
				<div className="card-page__wrapper">
					{cardItem.map((sneakers) => (
						<div className="card-page__card" key={sneakers.id}>
							<button
								className="card-page__close-floating"
								onClick={() =>
									onUpdate(sneakers.id, sneakers.size, 0)
								}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z"
										fill="white"
									/>
								</svg>
							</button>
							<div className="card-page__img">
								<img src={sneakers.img} alt={sneakers.title} />
							</div>
							<div className="card-page__info">
								<h2 className="card-page__title">
									{sneakers.title}
								</h2>
								<span className="card-page__sku">
									{sneakers.sku}
								</span>
								<div className="card-page__sizes">
									<p>
										Размер: <span>{sneakers.size}</span>
									</p>
									<p className="card-page__price">
										{sneakers.price} ₽
									</p>
								</div>
								<div className="quantity-controls">
									<button
										className="quantity-controls__button quantity-controls__button--minus"
										onClick={() =>
											onUpdate(
												sneakers.id,
												sneakers.size,
												sneakers.quantity - 1
											)
										}
									>
										<svg
											width="14"
											height="2"
											viewBox="0 0 14 2"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<line
												y1="1"
												x2="14"
												y2="1"
												stroke="#B3C0D2"
												strokeWidth="2"
											/>
										</svg>
									</button>
									<span className="quantity-controls__value">
										{sneakers.quantity}
									</span>
									<button
										className="quantity-controls__button quantity-controls__button--plus"
										onClick={() =>
											onUpdate(
												sneakers.id,
												sneakers.size,
												sneakers.quantity + 1
											)
										}
									>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M11 5V11H5V13H11V19H13V13H19V11H13V5H11Z"
												fill="white"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					))}
					<div className="promo-code">
						<input
							className="promo-code__input"
							type="text"
							placeholder="Введите промокод"
						/>
						<button className="promo-code__button">
							Применить
						</button>
					</div>
					<div className="final-price">
						Сумма к оплате: <span>{finalPrice} ₽</span>
					</div>
					<div className="personal-form">
						<div className="personal-form__column">
							<input
								className="personal-form__input"
								type="text"
								placeholder="Фамилия"
							/>
							<input
								className="personal-form__input"
								type="text"
								placeholder="Имя"
							/>
							<input
								className="personal-form__input"
								type="text"
								placeholder="Отчество"
							/>
							<input
								className="personal-form__input"
								type="email"
								placeholder="Ваш email"
							/>
							<input
								className="personal-form__input"
								type="tel"
								placeholder="Номер телефона"
							/>
						</div>
						<div className="personal-form__column">
							<input
								className="personal-form__input"
								type="text"
								placeholder="Регион"
							/>
							<input
								className="personal-form__input"
								type="text"
								placeholder="Населенный пункт"
							/>
							<input
								className="personal-form__input"
								type="text"
								placeholder="Улица"
							/>
							<div>
								<input
									className="personal-form__input input-h"
									type="text"
									placeholder="Дом"
								/>
								<input
									className="personal-form__input input-h"
									type="text"
									placeholder="Корпус"
								/>
								<input
									className="personal-form__input input-h"
									type="text"
									placeholder="Квартира"
								/>
							</div>
							<input
								className="personal-form__input"
								type="text"
								placeholder="Индекс"
							/>
						</div>
					</div>
					<div className="delivery-option">
						<div className="delivery-options">
							<div className="delivery-options__section">
								<h3 className="delivery-options__title">
									Способ доставки
								</h3>
								{deliverOption.map((deliver) => (
									<div
										className="delivery-options__item"
										key={deliver.id}
									>
										<label
											className="delivery-options__label"
											htmlFor={deliver.id}
										>
											<input
												id={deliver.id}
												type="radio"
												name="delivery-option"
												className="delivery-options__input"
												value={deliver.id}
												checked={
													selectedDelivery ===
													deliver.id
												}
												onChange={(e) =>
													setSelectedDelivery(
														e.target.value
													)
												}
											/>
											<span className="delivery-options__logo">
												<img
													src={deliver.logo}
													alt={deliver.title}
												/>
											</span>
										</label>
									</div>
								))}
							</div>
							<div className="delivery-options__section">
								<h3 className="delivery-options__title">
									Оплата
								</h3>
								{deliverOption.map((deliver) => (
									<p
										className="delivery-options__cost"
										key={deliver.id}
									>
										{deliver.title}
										<span>{deliver.subtitle}</span>
									</p>
								))}
							</div>
							<div className="delivery-options__section">
								<h3 className="delivery-options__title">
									Стоимость
								</h3>
								{deliverOption.map((deliver) => (
									<span
										className="delivery-options__price"
										key={deliver.id}
									>
										{deliver.price} ₽
									</span>
								))}
							</div>
						</div>
						<div className="delivery-options__address">
							<select className="delivery-options__select">
								<option>
									Выберите адрес пункта выдачи СДЭК
								</option>
							</select>
						</div>
					</div>
					<div className="commun-option">
						<h2 className="commun-option__title">
							Выберите удобный способ связи
						</h2>
						<div className="commun-option__img">
							{socialIcons.map((icons) => (
								<img
									key={icons.id}
									src={icons.img}
									alt={icons.title}
								/>
							))}
						</div>
					</div>
					<button
						className="card-page__btn"
						onClick={handlePlaceOrder}
					>
						Подтвердить заказ
					</button>
				</div>
			</div>
		</section>
	);
}
export default BasketPage;
