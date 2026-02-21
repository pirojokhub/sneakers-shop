import { useContext, useEffect, useState } from "react";
import vk from "../img/modals-icons/vk.png";
import whatSapp from "../img/modals-icons/whatsapp.png";
import telegram from "../img/modals-icons/telegram.png";
import viber from "../img/modals-icons/viber.png";
import instagram from "../img/modals-icons/instagram.png";
import { AuthContext } from "../context/AuthContext";
function Account() {
	const [iconActive, setIconActive] = useState("vk");
	const [input, setInput] = useState("");
	const { user } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (user) {
			setName(user.name || "");
			setEmail(user.email || "");
		}
	}, [user]);

	const contactOptions = [
		{ id: "vk", icon: vk, placeholder: "vk.com/example1234" },
		{ id: "whatsapp", icon: whatSapp, placeholder: "+7 (___) ___-__-__" },
		{ id: "telegram", icon: telegram, placeholder: "@your_telegram" },
		{ id: "viber", icon: viber, placeholder: "Ваш номер в Viber" },
		{ id: "instagram", icon: instagram, placeholder: "@your_instagram" },
	];

	useEffect(() => {
		const currentIcon = contactOptions.find((op) => op.id === iconActive);
		if (currentIcon) {
			setInput(currentIcon.placeholder);
		}
	}, [iconActive]);

	console.log(email);

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		alert("Профиль обновлен! (имитация)");
	};

	if (!user) {
		return <p>Загрузка данных пользователя...</p>;
	}
	return (
		<div className="personal-account">
			<section className="personal-account__data">
				<form onSubmit={handleUpdateProfile}>
					<h2 className="personal-account__section-title">
						Личные данные
					</h2>
					<div className="personal-account__data-fields">
						<input
							type="text"
							className="personal-account__input"
							placeholder="Фамилие"
						/>
						<input
							type="text"
							className="personal-account__input"
							placeholder="Имя"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							className="personal-account__input"
							placeholder="Отчество"
						/>
					</div>
				</form>
			</section>

			<section className="personal-account__password">
				<h2 className="personal-account__section-title">
					Изменить пароль
				</h2>
				<div className="personal-account__password-fields">
					<input
						type="password"
						className="personal-account__input"
						placeholder="Старый пароль"
					/>
					<input
						type="password"
						className="personal-account__input"
						placeholder="Новый пароль"
					/>
					<input
						type="password"
						className="personal-account__input"
						placeholder="Повторите пароль"
					/>
				</div>
			</section>

			<section className="personal-account__address">
				<h2 className="personal-account__section-title">
					Адрес доставки и контакты
				</h2>
				<div className="personal-account__address-fields">
					<input
						type="text"
						className="personal-account__input"
						placeholder="Область"
					/>
					<input
						type="text"
						className="personal-account__input"
						placeholder="Город"
					/>
					<input
						type="text"
						className="personal-account__input"
						placeholder="Регион"
					/>
					<div>
						<input
							type="text"
							className="personal-account__input"
							placeholder="Дом"
						/>
						<input
							type="text"
							className="personal-account__input"
							placeholder="Корпус"
						/>
						<input
							type="text"
							className="personal-account__input"
							placeholder="Квартира"
						/>
					</div>
				</div>
			</section>

			<section className="personal-account__contact">
				<input
					type="email"
					className="personal-account__input"
					placeholder="ivanov@gmail.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="tel"
					className="personal-account__input"
					placeholder="+7900209078"
				/>
				<div className="personal-account__contact-methods">
					<h2 className="personal-account__section-title">
						Выберите удобный способ связи
					</h2>
					<div className="contact-methods__icons-wrapper">
						{contactOptions.map((option) => (
							<button
								key={option.id}
								type="button"
								className={`contact-methods__icon-btn ${
									iconActive === option.id
										? "contact-methods__icon-btn--active"
										: ""
								}`}
								onClick={() => setIconActive(option.id)}
							>
								<img src={option.icon} alt={option.id} />
							</button>
						))}
					</div>
				</div>
				<input
					type="text"
					className="personal-account__input"
					placeholder={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</section>
			<button className="personal-account__button">
				Сохранить изменения
			</button>
		</div>
	);
}

export default Account;
