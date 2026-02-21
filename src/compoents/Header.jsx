import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

import Navbar from "./Navbar";
import HeaderLogo from "../img/hero-img/header_logo.png";
import PhoneCall from "../img/commun-img/phone-call 1.png";
import Email from "../img/commun-img/email 1.png";

function Header() {
	const { isAuth, setUser, setIsAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		setIsAuth(false);
		setUser(null);
		navigate("/");
	};

	return (
		<header className="header">
			<div className="header-container">
				<div className="header-grid">
					<div className="contact-info">
						<span className="contact-elem">
							<img src={PhoneCall} alt="" />
							<p>+7 951 999 28 34 </p>
						</span>
						<span className="contact-elem">
							<img src={Email} alt="" />
							<p>info@stageboxbrand.ru</p>
						</span>
					</div>

					<picture>
						<source
							srcSet="header_logo.webp"
							type="header_logo/webp"
						/>
						<Link to="/">
							<img
								src={HeaderLogo}
								alt="Логотип"
								width="95"
								height="95"
							/>
						</Link>
					</picture>

					<div className="buttons-container">
						<Link to="/account/orders">
							<button className="round-btn btn-primary">
								{/* иконка корзины/заказов */}
								<svg
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19.0441 19.0025L17.8712 6.12562C17.8396 5.77087 17.5426 5.5 17.1865 5.5H15.124V4.125C15.124 3.0195 14.695 1.98275 13.9181 1.20587C13.1536 0.44 12.0894 0 10.999 0C8.72474 0 6.87399 1.85075 6.87399 4.125V5.5H4.81149C4.45537 5.5 4.15837 5.77087 4.12674 6.12562L2.95662 19.0011C2.88649 19.7698 3.14499 20.5356 3.66474 21.1049C4.18449 21.6741 4.92424 22 5.69562 22H16.3037C17.0737 22 17.8135 21.6741 18.3332 21.1063C18.8544 20.537 19.1115 19.7697 19.0441 19.0025ZM13.749 5.5H8.24899V4.125C8.24899 2.60837 9.48237 1.375 10.999 1.375C11.7277 1.375 12.4372 1.6665 12.946 2.17663C13.4644 2.695 13.749 3.38663 13.749 4.125V5.5Z"
										fill="white"
									/>
								</svg>
							</button>
						</Link>

						{isAuth ? (
							<>
								<Link to="/account/profile">
									<button className="round-btn btn-primary">
										{/* иконка профиля */}
										<svg
											width="22"
											height="22"
											viewBox="0 0 22 22"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g clipPath="url(#clip0_6093_2668)">
												<path
													d="M10.8431 10.5975C12.299 10.5975 13.5597 10.0753 14.5897 9.04505C15.6198 8.01498 16.142 6.75463 16.142 5.29856C16.142 3.843 15.6198 2.58248 14.5896 1.55207C13.5593 0.522169 12.2988 0 10.8431 0C9.38702 0 8.12667 0.522169 7.0966 1.55224C6.06653 2.58231 5.54419 3.84283 5.54419 5.29856C5.54419 6.75463 6.06653 8.01515 7.09677 9.04522C8.127 10.0751 9.38753 10.5975 10.8431 10.5975Z"
													fill="white"
												/>
												<path
													d="M20.1148 16.917C20.0851 16.4883 20.025 16.0207 19.9366 15.5269C19.8473 15.0294 19.7323 14.5591 19.5947 14.1292C19.4525 13.6849 19.2592 13.2462 19.0202 12.8257C18.7721 12.3893 18.4807 12.0093 18.1537 11.6966C17.8118 11.3695 17.3932 11.1065 16.9092 10.9146C16.4268 10.7238 15.8922 10.6271 15.3203 10.6271C15.0957 10.6271 14.8786 10.7193 14.4591 10.9924C14.201 11.1607 13.899 11.3554 13.562 11.5708C13.2738 11.7544 12.8834 11.9264 12.4011 12.0822C11.9307 12.2344 11.453 12.3116 10.9815 12.3116C10.51 12.3116 10.0325 12.2344 9.56152 12.0822C9.07981 11.9266 8.6894 11.7545 8.40154 11.5709C8.06769 11.3576 7.76557 11.1629 7.50356 10.9922C7.08462 10.7191 6.86726 10.627 6.64268 10.627C6.07066 10.627 5.53624 10.7238 5.05402 10.9148C4.57029 11.1063 4.15151 11.3693 3.80927 11.6968C3.48248 12.0097 3.19093 12.3895 2.94319 12.8257C2.70434 13.2462 2.51098 13.6848 2.36865 14.1294C2.23118 14.5593 2.11621 15.0294 2.02692 15.5269C1.93846 16.02 1.87837 16.4878 1.84866 16.9175C1.81946 17.3384 1.80469 17.7753 1.80469 18.2166C1.80469 19.365 2.16975 20.2947 2.88964 20.9804C3.60064 21.657 4.54142 22.0002 5.68546 22.0002H16.2786C17.4226 22.0002 18.363 21.6571 19.0742 20.9804C19.7943 20.2952 20.1593 19.3654 20.1593 18.2164C20.1592 17.7732 20.1442 17.3359 20.1148 16.917Z"
													fill="white"
												/>
											</g>
											<defs>
												<clipPath id="clip0_6093_2668">
													<rect
														width="21.9999"
														height="22"
														fill="white"
													/>
												</clipPath>
											</defs>
										</svg>
									</button>
								</Link>

								<button
									className="round-btn btn-logout"
									onClick={handleLogout}
								>
									{/* иконка выхода */}
									<svg
										width="55"
										height="55"
										viewBox="0 0 44 44"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="22"
											cy="22"
											r="22"
											fill="#29292D"
										/>
										<path
											d="M25 15H28C29.1046 15 30 15.8954 30 17V27C30 28.1046 29.1046 29 28 29H25"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M18 23L13 18.5L18 14"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M13 18.5H25"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</>
						) : (
							<Link to="/login">
								<button className="round-btn btn-login">
									{/* иконка логина */}
									<svg
										width="55"
										height="55"
										viewBox="0 0 55 55"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="27.5"
											cy="27.5"
											r="27.5"
											fill="#29292D"
										/>
										<path
											d="M36.6667 13.75H22.9167C21.3644 13.75 20.125 14.9894 20.125 16.5417V41.25C20.125 42.8023 21.3644 44 22.9167 44H36.6667"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M28.4375 38.5L36.6667 30.25L28.4375 22"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M36.6667 30.25H42.1875"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</Link>
						)}

						<button className="round-btn btn-primary">
							{/* иконка «избранное/гео» как было */}
							<svg
								width="19"
								height="19"
								viewBox="0 0 19 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M9.5 3.5625C8.79278 1.50575 6.8115 0 4.75 0C2.06572 0 0 2.29425 0 5.34375C0 9.53444 4.00372 12.7751 9.5 19C14.9963 12.7751 19 9.53444 19 5.34375C19 2.29425 16.9343 0 14.25 0C12.1864 0 10.2072 1.50575 9.5 3.5625Z"
									fill="white"
								/>
							</svg>
						</button>
					</div>

					<div className="nav-wrapper">
						<Navbar />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
