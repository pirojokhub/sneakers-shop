import { Link } from "react-router";
function Navbar() {
	return (
		<>
			<div className="nav-container">
				<nav className="main-nav">
					<ul className="nav-list">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Главная
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/krossovki" className="nav-link">
								Кроссовки
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/odezhda" className="nav-link">
								Одежда
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/blog" className="nav-link">
								Блог
							</Link>
						</li>
					</ul>

					<div className="nav-search">
						<input
							type="text"
							className="search-input"
							placeholder="Поиск"
						/>

						<button className="search-btn">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15.25 15.25L11.5 11.5M13.75 7.375C13.75 10.8247 10.8247 13.75 7.375 13.75C3.92525 13.75 1 10.8247 1 7.375C1 3.92525 3.92525 1 7.375 1C10.8247 1 13.75 3.92525 13.75 7.375Z"
									stroke="#fff"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>
				</nav>
			</div>
		</>
	);
}

export default Navbar;
