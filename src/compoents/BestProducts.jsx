// import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function BestProducts({ products }) {
	const [favorites, setFavorites] = useState([]);
	// const [color, setColor] = useState("#B3C0D2");
	const [hoverSize, setHoverSize] = useState(null);

	// const handleChangeColor = () => {
	// 	setColor(color === "#B3C0D2" ? "##FF1818" : "#B3C0D2");
	// };

	const toggleFavorite = (products) => {
		setFavorites((prevFavorites) =>
			prevFavorites.some((fav) => fav.id === products.id)
				? prevFavorites.filter((fav) => fav.id !== products.id)
				: [...prevFavorites, products]
		);
	};
	console.log(favorites);
	return (
		<section className="best-product">
			<h2 className="best-product_title">Лучшие из лучших</h2>
			<div className="best-product_wrapper">
				<div className="slider-wrapper">
					<div className="swiper-nav">
						<button className="custom-swiper-button-prev">
							<svg
								width="15"
								height="33"
								viewBox="0 0 15 33"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0.939148 17.72C0.385563 17.0009 0.385563 15.9991 0.939148 15.28L11.4152 1.67123C12.5799 0.158264 15 0.981884 15 2.89122L15 30.1088C15 32.0181 12.5799 32.8417 11.4152 31.3288L0.939148 17.72Z"
									fill="#B3C0D2"
								/>
							</svg>
						</button>
						<button className="custom-swiper-button-next">
							<svg
								width="15"
								height="33"
								viewBox="0 0 15 33"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								style={{ transform: "rotate(180deg)" }}
							>
								<path
									d="M0.939148 17.72C0.385563 17.0009 0.385563 15.9991 0.939148 15.28L11.4152 1.67123C12.5799 0.158264 15 0.981884 15 2.89122L15 30.1088C15 32.0181 12.5799 32.8417 11.4152 31.3288L0.939148 17.72Z"
									fill="#B3C0D2"
								/>
							</svg>
						</button>
					</div>
					<div className="slider-track1">
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={20}
							slidesPerView={4}
							navigation={{
								nextEl: ".custom-swiper-button-next",
								prevEl: ".custom-swiper-button-prev",
							}}
							pagination={{
								el: ".my-custom-pagination",
								clickable: true,
							}}
							className="slider-track1"
						>
							{products.slice(0, 8).map((item) => (
								<SwiperSlide key={item.id}>
									<div
										className="card"
										key={item.id}
										onMouseEnter={() =>
											setHoverSize(item.id)
										}
										onMouseLeave={() => setHoverSize(null)}
										style={{ position: "relative" }}
									>
										<div className="catalog-card">
											<div className="catalog-card_img">
												<img
													src={item.img}
													alt={item.title}
												/>
											</div>
											<div className="catalog-card_info">
												<h4 className="catalog-card_title">
													{item.title}
												</h4>
												<span className="catalog-card_sku">
													{item.sku}
												</span>
												<div className="catalog-card_bottom">
													<div className="catalog-card_price">
														{item.price} ₽
													</div>

													<button
														className="favorite-btn catalog-card_like"
														onClick={() =>
															toggleFavorite(item)
														}
														style={{
															color: favorites.some(
																(fav) =>
																	fav.id ===
																	item.id
															)
																? "#FF4D4F"
																: "#B3C0D2",
															transition:
																"color 0.3s ease",
														}}
													>
														<svg
															width="26"
															height="22"
															viewBox="0 0 26 22"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															// onClick={() =>
															// 	handleChangeColor()
															// }
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M12.8636 4.38086C11.9331 2.10761 9.32615 0.443359 6.61365 0.443359C3.0817 
														0.443359 0.363647 2.97911 0.363647 6.34961C0.363647 10.9814 5.6317 14.5632 
														12.8636 21.4434C20.0956 14.5632 25.3636 10.9814 25.3636 6.34961C25.3636 2.97911
														 22.6456 0.443359 19.1136 0.443359C16.3984 0.443359 13.7942 2.10761 12.8636 
														 4.38086Z"
																fill={
																	favorites.some(
																		(fav) =>
																			fav.id ===
																			item.id
																	)
																		? "#FF4D4F"
																		: "#B3C0D2"
																}
															/>
														</svg>
													</button>
												</div>
											</div>
										</div>
										{item.availableSizesList &&
											item.availableSizesList.length >
												0 && (
												<div
													className={`catalog-card__sizes ${
														hoverSize === item.id
															? "visible"
															: ""
													}`}
												>
													{item.availableSizesList.map(
														(size) => (
															<span key={size}>
																{size}
															</span>
														)
													)}
												</div>
											)}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
						<div className="my-custom-pagination"></div>
					</div>
				</div>
				<div className="benefits">
					<div className="benefit-item">
						<div className="benefit-icon">
							<svg
								width="144"
								height="144"
								viewBox="0 0 144 144"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="72" cy="72" r="72" fill="#B3C0D2" />
								<g clipPath="url(#clip0_0_1)">
									<path
										d="M108.55 79.3873C110.189 77.2961 110.975 75.0544 110.875 72.7457C110.775 70.2028 109.637 68.212 108.7 66.9908C109.788 64.2806 110.206 60.0146 106.575 56.7022C103.916 54.2765 99.3986 53.189 93.1418 53.4902C88.7419 53.6909 85.0615 54.5107 84.9109 54.5441H84.8942C84.0577 54.6947 83.1711 54.8787 82.2677 55.0795C82.2008 54.0088 82.3848 51.3488 84.3588 45.3597C86.701 38.233 86.5671 32.7792 83.9239 29.1322C81.1468 25.3011 76.7135 25 75.4086 25C74.1539 25 72.9996 25.5186 72.1798 26.4722C70.3229 28.6303 70.5404 32.6119 70.7746 34.4521C68.5663 40.3743 62.3764 54.8954 57.1401 58.9272C57.0397 58.9941 56.9561 59.0778 56.8724 59.1614C55.3333 60.7842 54.2961 62.5408 53.5935 64.0799C52.6064 63.5445 51.4856 63.2434 50.2811 63.2434H40.0761C36.2284 63.2434 33.1167 66.3718 33.1167 70.2028V97.3881C33.1167 101.236 36.2451 104.348 40.0761 104.348H50.2811C51.77 104.348 53.1585 103.879 54.2961 103.076L58.2275 103.545C58.8298 103.628 69.5366 104.983 80.5278 104.766C82.5186 104.916 84.3923 105 86.1322 105C89.1267 105 91.7365 104.766 93.9113 104.297C99.0305 103.21 102.527 101.035 104.3 97.8398C105.655 95.3973 105.655 92.9716 105.438 91.4324C108.767 88.4212 109.353 85.092 109.235 82.7499C109.169 81.3948 108.867 80.2405 108.55 79.3873ZM40.0761 99.8306C38.721 99.8306 37.6336 98.7265 37.6336 97.3881V70.1861C37.6336 68.831 38.7378 67.7436 40.0761 67.7436H50.2811C51.6361 67.7436 52.7235 68.8478 52.7235 70.1861V97.3714C52.7235 98.7265 51.6194 99.8139 50.2811 99.8139H40.0761V99.8306ZM104.267 77.4299C103.564 78.166 103.43 79.2869 103.966 80.1568C103.966 80.1736 104.652 81.3446 104.735 82.9506C104.852 85.1422 103.798 87.0828 101.59 88.739C100.804 89.3413 100.486 90.3785 100.821 91.3153C100.821 91.3321 101.54 93.5404 100.369 95.6315C99.248 97.6391 96.7553 99.0778 92.9745 99.8808C89.9465 100.533 85.831 100.65 80.7788 100.249C80.7118 100.249 80.6282 100.249 80.5445 100.249C69.7875 100.483 58.9134 99.0778 58.7963 99.0611H58.7796L57.0899 98.8603C57.1903 98.3919 57.2405 97.89 57.2405 97.3881V70.1861C57.2405 69.4667 57.1234 68.7641 56.9226 68.1117C57.2238 66.9908 58.0602 64.4981 60.0343 62.3735C67.5458 56.4178 74.89 36.3258 75.2079 35.4559C75.3417 35.1046 75.3752 34.7198 75.3082 34.335C75.0238 32.4613 75.1242 30.1694 75.5257 29.4835C76.4124 29.5002 78.8047 29.7511 80.2434 31.7419C81.9498 34.1008 81.8829 38.3166 80.0427 43.9042C77.2321 52.4195 76.9979 56.903 79.2229 58.877C80.3271 59.8641 81.7992 59.9143 82.8699 59.5295C83.8904 59.2953 84.8607 59.0945 85.7808 58.944C85.8478 58.9272 85.9314 58.9105 85.9983 58.8938C91.1343 57.7729 100.335 57.087 103.531 59.9979C106.241 62.4739 104.317 65.7528 104.1 66.1041C103.481 67.041 103.665 68.2622 104.501 69.0151C104.518 69.0318 106.274 70.688 106.358 72.913C106.425 74.4019 105.722 75.9243 104.267 77.4299Z"
										fill="#002C6A"
									/>
								</g>
								<defs>
									<clipPath id="clip0_0_1">
										<rect
											width="144"
											height="144"
											fill="white"
											transform="translate(19 20)"
										/>
									</clipPath>
								</defs>
							</svg>
						</div>

						<p className="benefit-text">
							Гарантируем качество товара
						</p>
					</div>

					<div className="benefit-item">
						<div className="benefit-icon">
							<svg
								width="144"
								height="144"
								viewBox="0 0 144 144"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="72" cy="72" r="72" fill="#CFEBC6" />
								<g clipPath="url(#clip0_0_1)">
									<path
										d="M71.5 20C44.2994 20 22.2823 42.0127 22.2823 69.2177C22.2823 81.1445 26.5704 92.5735 34.3817 101.537V121.922C34.3817 124.669 37.7082 126.022 39.6329 124.097L50.1542 113.575C82.51 129.143 120.718 105.75 120.718 69.2175C120.718 42.0172 98.705 20 71.5 20V20ZM51.0252 107.114C49.8283 106.466 48.3479 106.682 47.3853 107.644L40.5338 114.495V100.363C40.5338 99.5943 40.2459 98.8534 39.7268 98.2861C32.4449 90.3311 28.4346 80.0077 28.4346 69.2175C28.4346 45.4711 47.7538 26.1519 71.5002 26.1519C95.2466 26.1519 114.566 45.4711 114.566 69.2175C114.566 101.893 79.4779 122.521 51.0252 107.114Z"
										fill="#2C830E"
									/>
									<path
										d="M71.5 41.7174C61.3174 41.7174 53.0331 50.0017 53.0331 60.1843C53.0331 61.8831 54.4104 63.2605 56.1093 63.2605C57.8081 63.2605 59.1854 61.8831 59.1854 60.1843C59.1854 53.3939 64.7098 47.8695 71.5002 47.8695C78.2905 47.8695 83.8149 53.3939 83.8149 60.1843C83.8149 66.9746 78.2903 72.499 71.5 72.499C69.8011 72.499 68.4238 73.8763 68.4238 75.5752V84.7932C68.4238 86.4921 69.8011 87.8694 71.5 87.8694C73.1988 87.8694 74.5761 86.4921 74.5761 84.7932V78.395C83.2997 76.926 89.9668 69.3191 89.9668 60.1843C89.9668 50.0017 81.6825 41.7174 71.5 41.7174Z"
										fill="#2C830E"
									/>
									<path
										d="M71.5 100.163C73.1933 100.163 74.5659 98.7908 74.5659 97.0975C74.5659 95.4043 73.1933 94.0316 71.5 94.0316C69.8067 94.0316 68.4341 95.4043 68.4341 97.0975C68.4341 98.7908 69.8067 100.163 71.5 100.163Z"
										fill="#2C830E"
									/>
								</g>
								<defs>
									<clipPath id="clip0_0_1">
										<rect
											width="105"
											height="105"
											fill="white"
											transform="translate(19 20)"
										/>
									</clipPath>
								</defs>
							</svg>
						</div>
						<p className="benefit-text">Поможем подобрать размер</p>
					</div>

					<div className="benefit-item">
						<div className="benefit-icon">
							<svg
								width="144"
								height="144"
								viewBox="0 0 144 144"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="72" cy="72" r="72" fill="#FFE1E1" />
								<g clipPath="url(#clip0_0_1)">
									<path
										d="M116.983 49.9628C116.884 49.0486 116.316 48.2394 115.467 47.8431L75.6231 29.2494C74.9111 28.9172 74.0886 28.9172 73.3766 29.2494L33.5328 47.8431C32.6838 48.2394 32.1157 49.0484 32.0163 49.9628C32.0141 49.9819 32 50.2363 32 50.2502V95.4064C32 96.4925 32.6612 97.4694 33.6698 97.8726L73.5135 113.81C73.8301 113.937 74.1651 114 74.5 114C74.8349 114 75.1699 113.937 75.4865 113.81L115.33 97.8726C116.339 97.4694 117 96.4925 117 95.4064V50.2502C117 50.2363 116.986 49.9818 116.983 49.9628ZM74.5 34.5876L107.661 50.0626L94.8917 55.1702L61.107 40.8378L74.5 34.5876ZM54.6296 43.8606L87.8902 57.9708L74.5 63.3268L41.3394 50.0626L54.6296 43.8606ZM37.3125 54.1735L71.8438 67.986V107.421L37.3125 93.608V54.1735ZM77.1562 107.421V67.986L111.688 54.1735V93.608L77.1562 107.421Z"
										fill="#AD0808"
									/>
								</g>
								<defs>
									<clipPath id="clip0_0_1">
										<rect
											width="85"
											height="85"
											fill="white"
											transform="translate(32 29)"
										/>
									</clipPath>
								</defs>
							</svg>
						</div>
						<p className="benefit-text">Быстро доставим покупку</p>
					</div>
				</div>
			</div>
		</section>
	);
}
export default BestProducts;
