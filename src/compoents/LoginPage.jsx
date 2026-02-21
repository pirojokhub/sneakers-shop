import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabase"; 

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { setIsAuth, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setLoading(false);
			if (error.message?.toLowerCase().includes("email not confirmed")) {
				alert(
					"Подтвердите email по ссылке из письма и попробуйте снова."
				);
			} else {
				alert("Неправильный логин или пароль.");
			}
			return;
		}

		const authedUser = data.user;
		let profile = null;
		if (authedUser) {
			const { data: prof, error: profErr } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", authedUser.id)
				.single();

			if (!profErr) profile = prof;
		}

		// 3) обновим контекст приложения
		setIsAuth(true);
		setUser(profile || { id: authedUser.id, email: authedUser.email });

		setLoading(false);
		navigate("/account");
	};

	return (
		<div className="personal-account">
			<section className="personal-account__data">
				<h2 className="personal-account__section-title">Вход</h2>
				<div className="personal-account__data-fields">
					<form onSubmit={handleLogin}>
						<input
							type="email"
							className="personal-account__input"
							placeholder="ivanov@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							type="password"
							className="personal-account__input"
							placeholder="Пароль"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button
							type="submit"
							className="login-page__btn"
							disabled={loading}
						>
							{loading ? "Входим..." : "Войти"}
						</button>
					</form>

					<div
						className="account-form__footer"
						style={{ marginTop: 12 }}
					>
						<span>Нет аккаунта? </span>
						<Link to="/register">Зарегистрируйтесь</Link>
					</div>

					<div
						className="account-form__footer"
						style={{ marginTop: 8 }}
					>
						<button
							type="button"
							className="link-like"
							onClick={async () => {
								if (!email)
									return alert(
										"Укажите email выше и нажмите сюда снова."
									);
								const { error } =
									await supabase.auth.resetPasswordForEmail(
										email,
										{
											redirectTo:
												window.location.origin +
												"/reset-password",
										}
									);
								if (error)
									alert(
										"Не удалось отправить письмо: " +
											error.message
									);
								else
									alert(
										"Мы отправили письмо для восстановления пароля."
									);
							}}
						>
							Забыли пароль?
						</button>
					</div>
				</div>
			</section>
		</div>
	);	
}

export default LoginPage;
