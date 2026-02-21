import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./modals.scss";
// import img from "../../img/test/krossovki-nike-air-presto-1 1.png";

import img1 from "../../img/deliver-icons/pochta.png";
import img2 from "../../img/deliver-icons/CDEK.png";

import vk from "../../img/modals-icons/vk.png";
import whatSapp from "../../img/modals-icons/whatsapp.png";
import telegram from "../../img/modals-icons/telegram.png";
import viber from "../../img/modals-icons/viber.png";
import instagram from "../../img/modals-icons/instagram.png";
import { useParams } from "react-router";

const modalsRoot = document.getElementById("modal-root");
function Modals({ products, isOpen, onClose, sizeSelected }) {
	const { id } = useParams();
	const productId = parseInt(id, 10);
	const product = products.find((p) => p.id === productId);
	const [selectedDelivery, setSelectedDelivery] = useState("cdek-courier");
	const [count, setCount] = useState(1);

	const price = product.price;

	const totalPrice = count * price;

	const handleIncreaseQuantity = () => {
		setCount((prevCount) => prevCount + 1);
	};

	const handleDeincreaseQuantity = () => {
		setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
	};

	useEffect(() => {
		const hanldeKeyDown = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", hanldeKeyDown);
		return () => {
			document.removeEventListener("keydown", hanldeKeyDown);
		};
	}, [onClose]);

	if (!isOpen) {
		return null;
	}
	if (!product) {
		return ReactDOM.createPortal(
			<div className="modal-overlay">
				<button className="modal-close-floating" onClick={onClose}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							d="M6 6L18 18M6 18L18 6"
							stroke="#333"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<div className="modal-content">
					<div className="modal-body">
						<p
							style={{
								textAlign: "center",
								padding: "50px 0",
								fontSize: "1.2rem",
							}}
						>
							Товар не найден!
						</p>
					</div>
				</div>
			</div>,
			modalsRoot
		);
	}

	const displaySizes =
		sizeSelected.length > 0 ? sizeSelected.join(", ") : "Размер не выбран";

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
	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<button className="modal-close-floating" onClick={onClose}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						d="M6 6L18 18M6 18L18 6"
						stroke="#333"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<div className="modal-content">
				<div className="modal-body">
					<div className="modal-body__card ">
						<div className="modal-body__img">
							<img src={product.img} alt="" />
						</div>
						<div className="modal-body__info">
							<h2 className="modal-body__title">
								{product.title}
							</h2>
							<span className="modal-body__sku">
								{product.sku}
							</span>
							<div className="modal-body__sizes">
								<p>
									Размер: <span>{displaySizes}</span>
								</p>
								<p className="modal-body__price">
									{totalPrice} ₽
								</p>
							</div>
							<div className="quantity-controls">
								<button
									className="quantity-controls__button quantity-controls__button--minus"
									onClick={handleDeincreaseQuantity}
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
									{count}
								</span>
								<button
									className="quantity-controls__button quantity-controls__button--plus"
									onClick={handleIncreaseQuantity}
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
						</div>
					</div>
					<div className="modal-body__decoration">
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

						<button className="modal-body__btn">
							Подтвердить заказ
						</button>
					</div>
				</div>
			</div>
		</div>,
		modalsRoot
	);
}
export default Modals;
