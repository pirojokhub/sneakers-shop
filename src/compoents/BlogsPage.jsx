import { Link } from "react-router";
function BlogsPage({ products, tShorts }) {
	return (
		<section className="blogs">
			<div className="blogs__container">
				<div className="blogs__content-wrapper">
					<div className="blogs__grid">
						{products.slice(0, 2).map((post) => (
							<Link
								to={`/krossovki/${post.id}`}
								key={post.id}
								className="blog-card"
							>
								<div className="blog-img">
									<img src={post.img} alt={post.title} />
								</div>
								<div className="blog-content">
									<h3 className="blog-heading">
										{post.title}
									</h3>
									<p className="blog-desc">
										{post.description}
									</p>
									<div className="blog-date">
										<span>{post.date}</span>
										<span className="blog-date_watch">
											<svg
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_20_70)">
													<path
														d="M10 4.03894C6.17879 4.03894 2.71351 6.12956 0.15649 9.52529C-0.0521632 9.80349 -0.0521632 10.1922 0.15649 10.4704C2.71351 13.8702 6.17879 15.9608 10 15.9608C13.8212 15.9608 17.2865 13.8702 19.8435 10.4745C20.0522 10.1962 20.0522 9.80758 19.8435 9.52938C17.2865 6.12956 13.8212 4.03894 10 4.03894ZM10.2741 14.1975C7.73755 14.357 5.64284 12.2664 5.80239 9.72576C5.93331 7.63104 7.63118 5.93318 9.72589 5.80226C12.2625 5.6427 14.3572 7.73332 14.1976 10.274C14.0626 12.3646 12.3647 14.0625 10.2741 14.1975ZM10.1473 12.2582C8.78081 12.3441 7.65163 11.2191 7.74164 9.85258C7.81119 8.7234 8.72763 7.81106 9.85681 7.73742C11.2233 7.6515 12.3525 8.77659 12.2625 10.1431C12.1888 11.2763 11.2724 12.1887 10.1473 12.2582Z"
														fill="#B3C0D2"
													/>
												</g>
												<defs>
													<clipPath id="clip0_20_70">
														<rect
															width="20"
															height="20"
															fill="white"
														/>
													</clipPath>
												</defs>
											</svg>
											{post.views}
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>

					<div className="blogs__flex">
						{tShorts.slice(0, 8).map((post) => (
							<Link to={`/odezhda/${post.id}`} key={post.id}>
								<div className="blog-card">
									<div className="blog-img">
										<img src={post.img} alt={post.title} />
									</div>
									<div className="blog-content">
										<h3 className="blog-heading">
											{post.title}
										</h3>
										<p className="blog-desc">
											{post.description}
										</p>
										<div className="blog-date">
											<span>{post.date}</span>
											<span className="blog-date_watch">
												<svg
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<g clipPath="url(#clip0_20_70)">
														<path
															d="M10 4.03894C6.17879 4.03894 2.71351 6.12956 0.15649 9.52529C-0.0521632 9.80349 -0.0521632 10.1922 0.15649 10.4704C2.71351 13.8702 6.17879 15.9608 10 15.9608C13.8212 15.9608 17.2865 13.8702 19.8435 10.4745C20.0522 10.1962 20.0522 9.80758 19.8435 9.52938C17.2865 6.12956 13.8212 4.03894 10 4.03894ZM10.2741 14.1975C7.73755 14.357 5.64284 12.2664 5.80239 9.72576C5.93331 7.63104 7.63118 5.93318 9.72589 5.80226C12.2625 5.6427 14.3572 7.73332 14.1976 10.274C14.0626 12.3646 12.3647 14.0625 10.2741 14.1975ZM10.1473 12.2582C8.78081 12.3441 7.65163 11.2191 7.74164 9.85258C7.81119 8.7234 8.72763 7.81106 9.85681 7.73742C11.2233 7.6515 12.3525 8.77659 12.2625 10.1431C12.1888 11.2763 11.2724 12.1887 10.1473 12.2582Z"
															fill="#B3C0D2"
														/>
													</g>
													<defs>
														<clipPath id="clip0_20_70">
															<rect
																width="20"
																height="20"
																fill="white"
															/>
														</clipPath>
													</defs>
												</svg>
												{post.views}
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>

					<div className="newsletter__card">
						<div className="newsletter__top">
							<h3 className="newsletter__title">
								ПОДПИШИСЬ НА РАССЫЛКУ
							</h3>
							<h3 className="newsletter__title discount">
								И ПОЛУЧИ СКИДКУ ДО 10 %
							</h3>
						</div>
						<div className="newsletter__bottom">
							<form
								className="newsletter__form"
								onSubmit={(e) => e.preventDefault()}
							>
								<input
									type="email"
									placeholder="Введите Ваш e-mail"
									required
								/>
								<button type="submit">Подписаться</button>
							</form>
							<a href="#" className="policy-link">
								Политика конфиденциальности
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default BlogsPage;
