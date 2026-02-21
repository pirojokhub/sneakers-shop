import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; 

function RegisterPage() {
	const nav = useNavigate();
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		middle_name: "",
		email: "",
		password: "",
		phone: "",
		region: "",
		city: "",
		street: "",
		house: "",
		building: "",
		apartment: "",
		postal_code: "",
		vk: "",
		telegram: "",
		instagram: "",
		whatsapp: "",
	});

	const onChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const { data, error } = await supabase.auth.signUp({
			email: form.email,
			password: form.password,
			options: {
				data: {
					first_name: form.first_name,
					last_name: form.last_name,
				},
			},
		});

		if (error) {
			alert(error.message);
			setLoading(false);
			return;
		}

		const user = data.user;
		if (!user) {
			alert("Проверьте почту для подтверждения регистрации");
			setLoading(false);
			return;
		}

		const { error: profileError } = await supabase.from("profiles").insert({
			user_id: user.id,
			first_name: form.first_name,
			last_name: form.last_name,
			middle_name: form.middle_name,
			email: form.email,
			phone: form.phone,
			region: form.region,
			city: form.city,
			street: form.street,
			house: form.house,
			building: form.building,
			apartment: form.apartment,
			postal_code: form.postal_code,
			vk: form.vk,
			telegram: form.telegram,
			instagram: form.instagram,
			whatsapp: form.whatsapp,
		});

		if (profileError) {
			console.error(profileError);
			alert("Ошибка при сохранении профиля");
			setLoading(false);
			return;
		}

		alert("Регистрация успешна!");
		nav("/account/profile"); 
	};

	return (
		<div className="personal-account">
			<section className="personal-account__data">
				<h2 className="personal-account__section-title">Регистрация</h2>
				<div className="personal-account__data-fields">
					<form onSubmit={onSubmit}>
						<input
							type="text"
							name="first_name"
							className="personal-account__input"
							placeholder="Имя"
							value={form.first_name}
							onChange={onChange}
							required
						/>
						<input
							type="text"
							name="last_name"
							className="personal-account__input"
							placeholder="Фамилия"
							value={form.last_name}
							onChange={onChange}
							required
						/>
						<input
							type="text"
							name="middle_name"
							className="personal-account__input"
							placeholder="Отчество"
							value={form.middle_name}
							onChange={onChange}
						/>
						<input
							type="email"
							name="email"
							className="personal-account__input"
							placeholder="ivanov@gmail.com"
							value={form.email}
							onChange={onChange}
							required
						/>
						<input
							type="password"
							name="password"
							className="personal-account__input"
							placeholder="Пароль"
							value={form.password}
							onChange={onChange}
							required
						/>
						<input
							type="text"
							name="phone"
							className="personal-account__input"
							placeholder="+7 900 00 00 000"
							value={form.phone}
							onChange={onChange}
						/>
						<input
							type="text"
							name="region"
							className="personal-account__input"
							placeholder="Регион"
							value={form.region}
							onChange={onChange}
						/>
						<input
							type="text"
							name="city"
							className="personal-account__input"
							placeholder="Город"
							value={form.city}
							onChange={onChange}
						/>
						<input
							type="text"
							name="street"
							className="personal-account__input"
							placeholder="Улица"
							value={form.street}
							onChange={onChange}
						/>
						<input
							type="text"
							name="house"
							className="personal-account__input"
							placeholder="Дом"
							value={form.house}
							onChange={onChange}
						/>
						<input
							type="text"
							name="building"
							className="personal-account__input"
							placeholder="Корпус"
							value={form.building}
							onChange={onChange}
						/>
						<input
							type="text"
							name="apartment"
							className="personal-account__input"
							placeholder="Квартира"
							value={form.apartment}
							onChange={onChange}
						/>
						<input
							type="text"
							name="postal_code"
							className="personal-account__input"
							placeholder="Индекс"
							value={form.postal_code}
							onChange={onChange}
						/>
						{/* Соцсети */}
						<input
							type="text"
							name="vk"
							className="personal-account__input"
							placeholder="VK"
							value={form.vk}
							onChange={onChange}
						/>
						<input
							type="text"
							name="telegram"
							className="personal-account__input"
							placeholder="@telegram"
							value={form.telegram}
							onChange={onChange}
						/>
						<input
							type="text"
							name="instagram"
							className="personal-account__input"
							placeholder="@instagram"
							value={form.instagram}
							onChange={onChange}
						/>
						<input
							type="text"
							name="whatsapp"
							className="personal-account__input"
							placeholder="WhatsApp"
							value={form.whatsapp}
							onChange={onChange}
						/>
						<button
							type="submit"
							className="registor-page__btn"
							disabled={loading}
						>
							{loading
								? "Создаю аккаунт..."
								: "Зарегистрироваться"}
						</button>
					</form>
					<div className="account-form__footer">
						<span>Есть аккаунт? </span>
						<Link to="/login">Войти</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

export default RegisterPage;
