import { useState, useCallback, useMemo } from "react";
import RangeSlider from "./child/RangeSlider";
import Pagination from "./child/Pagination";
import { Link } from "react-router";

//Скролл Бар

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

function KrossovkiPage({ products }) {
	// Состояние для фильтрации по цене и цвету и т.д
	const [priceRange, setPriceRange] = useState({ min: 300, max: 8390 });
	const [colorSelected, setColorSelected] = useState([]);
	const [categorySelected, setCategorySelected] = useState([]);
	const [brandSelected, setBrandSelected] = useState([]);
	const [seasonSelected, setSeasonSelected] = useState([]);
	const [sizeSelected, setSizeSelected] = useState([]);
	const [saleSelected, setSaleSelectad] = useState(false);
	const [hoverSize, setHoverSize] = useState(null);

	// Состояние для избранных товаров
	const [favorites, setFavorites] = useState([]);

	// Состояние для сортировки
	const [sortOption, setSortOption] = useState("");

	// Состояние для пагинации
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(18);

	const handlePriceRangeChange = useCallback(
		(newRange) => {
			setPriceRange(newRange);
			setCurrentPage(1);
		},
		[setPriceRange, setCurrentPage]
	);

	const handleSelectedColor = (colorHex) => {
		setColorSelected((prevColor) => {
			if (prevColor.includes(colorHex)) {
				return prevColor.filter((c) => c !== colorHex);
			} else {
				return [...prevColor, colorHex];
			}
		});
		setCurrentPage(1);
	};

	const handleSelectedCategoty = (category) => {
		setCategorySelected((prevCategory) => {
			if (prevCategory.includes(category)) {
				return prevCategory.filter((c) => c !== category);
			} else {
				return [...prevCategory, category];
			}
		});
		setCurrentPage(1);
	};

	const handleSelectedBrands = (brand) => {
		setBrandSelected((prevBrands) => {
			if (prevBrands.includes(brand)) {
				return prevBrands.filter((b) => b !== brand);
			} else {
				return [...prevBrands, brand];
			}
		});
		setCurrentPage(1);
	};

	const handleSeasonSelected = (season) => {
		setSeasonSelected((prevSeason) => {
			if (prevSeason.includes(season)) {
				return prevSeason.filter((s) => s !== season);
			} else {
				return [...prevSeason, season];
			}
		});
		setCurrentPage(1);
	};

	const handleSizeSelected = (size) => {
		setSizeSelected((prevSize) => {
			if (prevSize.includes(size)) {
				return prevSize.filter((s) => s !== size);
			} else {
				return [...prevSize, size];
			}
		});
		setCurrentPage(1);
	};

	const toggleFavorite = (productItem) => {
		setFavorites((prevFavorites) =>
			prevFavorites.some((fav) => fav.id === productItem.id)
				? prevFavorites.filter((fav) => fav.id !== productItem.id)
				: [...prevFavorites, productItem]
		);
	};

	const toggleSeletedOption = (e) => {
		setSortOption(e.target.value);
	};

	const handleSaleChange = (event) => {
		setSaleSelectad(event.target.checked);
		setCurrentPage(1); 
	};

	const handleResetFilters = () => {
		setPriceRange({ min: 590, max: 8390 });
		setColorSelected([]);
		setCategorySelected([]);
		setBrandSelected([]);
		setSeasonSelected([]);
		setSizeSelected([]);
		setSaleSelectad(false);
		setSortOption("default"); 
		setCurrentPage(1);
	};

	const filteredAndSortProducts = useMemo(() => {
		let processedProducts = [...products];

		// Фильтр по цене
		processedProducts = processedProducts.filter(
			(product) =>
				product.price >= priceRange.min &&
				product.price <= priceRange.max
		);

		// Фильтр по бренду
		if (brandSelected.length > 0) {
			processedProducts = processedProducts.filter((product) =>
				brandSelected.includes(product.brand)
			);
		}

		// Фильтр по цвету
		if (colorSelected.length > 0) {
			processedProducts = processedProducts.filter((product) => {
				if (
					product.colorHexValues &&
					Array.isArray(product.colorHexValues)
				) {
					return product.colorHexValues.some((productHex) =>
						colorSelected.includes(productHex)
					);
				}
				return false;
			});
		}

		// Фильтр по категории
		if (categorySelected.length > 0) {
			processedProducts = processedProducts.filter((product) => {
			
				return categorySelected.includes(product.category);
			});
		}

		// Фильтр по сезону
		if (seasonSelected.length > 0) {
			processedProducts = processedProducts.filter((product) => {
				return seasonSelected.includes(product.season); 
			});
		}

		// Фильтр по размеру
		if (sizeSelected.length > 0) {
			processedProducts = processedProducts.filter((product) =>
				sizeSelected.some((selSize) =>
					product.availableSizesList?.includes(selSize)
				)
			);
		}

		// Фильтр по распродаже
		if (saleSelected) {
			processedProducts = processedProducts.filter(
				(product) => product.sale === true
			);
		}

		// Сортировка отфильтрованных товаров
		const sortableProducts = [...processedProducts];
		switch (sortOption) {
			case "price_asc":
				sortableProducts.sort((a, b) => a.price - b.price);
				break;
			case "price_desc":
				sortableProducts.sort((a, b) => b.price - a.price);
				break;
			case "default":
			default:
				sortableProducts.sort((a, b) => a.id - b.id); 
				break;
		}
		return sortableProducts;
	}, [
		products,
		sortOption,
		priceRange,
		brandSelected,
		colorSelected,
		categorySelected,
		seasonSelected,
		saleSelected,
		sizeSelected,
	]);
	const totalPages = Math.ceil(
		filteredAndSortProducts.length / productsPerPage
	);
	const lastProductIndex = currentPage * productsPerPage;
	const firstProductIndex = lastProductIndex - productsPerPage;

	
	const currentProducts = filteredAndSortProducts.slice(
		firstProductIndex,
		lastProductIndex
	);
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const availableSizes = [
		"30 EUR",
		"31 EUR",
		"32 EUR",
		"33 EUR",
		"34 EUR",
		"35 EUR",
		"36 EUR",
		"37 EUR",
		"38 EUR",
		"39 EUR",
		"40 EUR",
		"41 EUR",
		"42 EUR",
		"43 EUR",
		"44 EUR",
		"45 EUR",
		"46 EUR",
	]; // [cite: 2, 5]
	const availableColors = [
		{ name: "Красный", hex: "#FF0000" },
		{ name: "Черный", hex: "#000000" },
		{ name: "Белый", hex: "#FFFFFF" },
		{ name: "Серый", hex: "#B3C0D2" },
		{ name: "Синий", hex: "#0000FF" },
		{ name: "Зеленый", hex: "#008000" },
		{ name: "Коричневый", hex: "#A52A2A" },
		{ name: "Желтый", hex: "#FFFF00" },
		{ name: "Оранжевый", hex: "#FFA500" },
		{ name: "Фиолетовый", hex: "#800080" },
		{ name: "Розовый", hex: "#FFC0CB" },
		{ name: "Голубой", hex: "#ADD8E6" },
	];
	const availableSeasons = ["Демисезон", "Зима", "Лето"];
	const availableCategories = [
		"Баскетбол",
		"Бег",
		"Ботинки",
		"Кроссовки с мехом",
		"Сандалии и сланцы",
		"Сапоги",
		"Футболь",
		"Вело",
		"Повседневные",
		"Лайфстайл",
		"Треккинг",
		"Теннис",
		"Скейтбординг",
		"Волейбол",
		"Тренировочные",
		"Высокие кроссовки",
		"Низкие кроссовки",
		"Кроссовки на платформе",
		"Классические модели",
		"Лимитированные серии",
	];
	const availableBrands = [
		"Adidas",
		"Nike",
		"Puma",
		"Reebok",
		"Asics",
		"New Balance",
		"Converse",
		"Vans",
		"Jordan",
		"Under Armour",
		"Salomon",
		"Columbia",
		"The North Face",
		"Timberland",
		"Caterpillar",
		"Dr. Martens",
		"Balenciaga",
		"Alexander McQueen",
		"Gucci",
		"Fila",
		"Skechers",
	];

	return (
		<section className="catalog">
			<div className="catalog-container">
				<div className="catalog-content">
					<aside className="catalog-filters">
						<div className="filter">
							<h3 className="filter-title">Размер</h3>
							<div className="filter-size_list">
								{availableSizes.map((size) => (
									<button
										key={size}
										className={`filter-size_item ${
											sizeSelected.includes(size)
												? "active"
												: "" 
										}`}
										onClick={() => handleSizeSelected(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>

						<div className="filter">
							<h3 className="filter-title">Сезон</h3>
							<div className="filter-season_options">
								{availableSeasons.map((season) => (
									<label
										key={season}
										className="filter-category_option"
									>
										<input
											type="checkbox"
											className="filter-category_checkbox"
											onChange={() =>
												handleSeasonSelected(season)
											}
											checked={seasonSelected.includes(
												season
											)}
										/>
										<span className="filter-category_label">
											{season}
										</span>
									</label>
								))}
							</div>
						</div>

						<div className="filter">
							<h3 className="filter-title">Цена</h3>
							<div className="filter-section_price">
								<RangeSlider
									minLimit={0}
									maxLimit={10000}
									currentValue={priceRange}
									onChange={handlePriceRangeChange}
								/>
							</div>
						</div>
						<div className="filter">
							<h3 className="filter-title">Цвет</h3>
							<div className="filter-section_color">
								{availableColors.map((color) => (
									<div
										key={color.hex}
										className={`filter-color_item ${
											colorSelected.includes(color.hex)
												? "filter-color_item--selected"
												: ""
										}`}
										style={{
											background: color.hex,
											borderColor:
												color.hex === "#FFFFFF"
													? "#ccc"
													: color.hex,
										}}
										onClick={() =>
											handleSelectedColor(color.hex)
										}
										title={color.name}
									>
										{colorSelected.includes(color.hex) && (
											<span className="filter-color_item-checked">
												✓
											</span>
										)}
									</div>
								))}
							</div>
						</div>
						<div className="filter">
							<h3 className="filter-title">Категория</h3>
							<OverlayScrollbarsComponent
								element="div"
								style={{ maxHeight: 293 }}
								options={{
									scrollbars: {
										autoHide: "never",
										autoHideDelay: 500,
										theme: "os-theme-light",
									},
									paddingAbsolute: true,
								}}
								className="filter-section_category-scrollhost"
								defer
							>
								{availableCategories.map((category) => (
									<label
										key={category}
										className="filter-category_option"
									>
										<input
											type="checkbox"
											className="filter-category_checkbox"
											onChange={() =>
												handleSelectedCategoty(category)
											}
											checked={categorySelected.includes(
												category
											)}
										/>
										<span className="filter-category_label">
											{category}
										</span>
									</label>
								))}
							</OverlayScrollbarsComponent>
						</div>

						<div className="filter">
							<h3 className="filter-title">Бренд</h3>
							<OverlayScrollbarsComponent
								element="div"
								style={{ maxHeight: 293 }}
								options={{
									scrollbars: {
										autoHide: "never",
										autoHideDelay: 500,
										theme: "os-theme-light",
									},
									paddingAbsolute: true,
								}}
								className="filter-section_category-scrollhost"
								defer
							>
								{availableBrands.map((brand) => (
									<label
										key={brand}
										className="filter-category_option"
									>
										<input
											type="checkbox"
											className="filter-category_checkbox"
											onChange={() =>
												handleSelectedBrands(brand)
											}
											checked={brandSelected.includes(
												brand
											)}
										/>
										<span className="filter-category_label">
											{brand}
										</span>
									</label>
								))}
							</OverlayScrollbarsComponent>
						</div>

						<div className="filter">
							<label className="filter_sale">
								<input
									type="checkbox"
									className="filter_sale-checkbox"
									checked={saleSelected}
									onChange={handleSaleChange}
								/>
								<span className="filter_sale-label">Sale</span>
							</label>
						</div>
						<div className="filter">
							<div className="filter-btn">
								<button
									className="filter-reset_button"
									onClick={() => handleResetFilters()}
								>
									Отменить
								</button>
							</div>
						</div>
					</aside>
					<div className="catalog__main">
						<div className="catalog-sorting">
							<span className="catalog-sorting_title">
								Сортировка
							</span>
							<select
								className="catalog-sort_select"
								value={sortOption}
								onChange={toggleSeletedOption}
							>
								<option value="default">по умолчанию</option>
								<option value="price_asc">
									по возрастанию цены
								</option>
								<option value="price_desc">
									по убыванию цены
								</option>
							</select>
						</div>
						<div className="catalog__grid">
							{currentProducts.map((item) => (
								<Link
									to={`/krossovki-info/${item.id}`}
									key={item.id}
								>
									<div
										className="card"
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
								</Link>
							))}
						</div>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							paginate={paginate}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default KrossovkiPage;
