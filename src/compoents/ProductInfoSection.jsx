import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Modals from "./child/Modals";
import ModalsZoom from "./child/ModalsZoom";

function ProductInfoSection({ products, onAddToCard }) {
	const { id } = useParams();
	const productId = parseInt(id, 10);
	const product = products.find((p) => p.id === productId);

	const navigate = useNavigate();

	const [currentSlide, setCurrentSlide] = useState(0);
	const [sizeSelected, setSizesSelected] = useState([]);
	const [active, setActive] = useState("Описание");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const sliderRef = useRef(null);
	const intervalRef = useRef(null);

	// const [zoomOpen, setZoomOpen] = useState(false);
	// const [zoomSrc, setZoomSrc] = useState(null);
	const [zoom, setZoom] = useState({ open: false, src: "", alt: "" });
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % product.sliderImages.length);
		}, 3000);

		return () => clearInterval(intervalRef.current);
	}, [product]);

	const handleAddToCartClick = () => {
		if (sizeSelected.length === 0) {
			alert("Выберите размер");
			return;
		}
		onAddToCard({ ...product, size: sizeSelected });
		navigate("/card");
	};

	const handleSizeSelected = (size) => {
		setSizesSelected((prevSize) => {
			if (prevSize.includes(size)) {
				return prevSize.filter((s) => s !== size);
			} else {
				return [...prevSize, size];
			}
		});
	};

	const handleOpen = () => {
		if (sizeSelected.length === 0) {
			alert("Пожалуйста, выберите размер!");
			return;
		}
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	if (!product) {
		return (
			<section className="single-blog">
				<div className="container">
					<p
						style={{
							textAlign: "center",
							padding: "50px 0",
							fontSize: "1.2rem",
						}}
					>
						Товар не найден!{" "}
						<Link to="/krossovki">Вернуться к каталогу</Link>
					</p>
				</div>
			</section>
		);
	}

	const handleTabs = (tabName) => {
		setActive(tabName);
	};

	const tabs = [
		{
			name: "Описание",
			content: (
				<div className="product-summary__tab-content">
					<p>
						{product.description ||
							"Кроссовки Nike Air Presto — это стильная и удобная обувь, идеально подходящая для повседневной носки. Изготовлены из высококачественных материалов, обеспечивают комфорт и долговечность. Подошва с амортизацией гарантирует мягкость и поддержку при ходьбе."}
					</p>
				</div>
			),
		},
		{
			name: "Оплата и доставка",
			content: (
				<div className="product-summary__tab-content">
					<p>
						Мы принимаем оплату банковскими картами, электронными
						кошельками и наличными при получении. Доставка
						осуществляется по всей России курьерскими службами и
						почтой. Срок доставки: 3-7 рабочих дней. Бесплатная
						доставка при заказе от 5000 рублей.
					</p>
				</div>
			),
		},
		{
			name: "Обмен и возврат",
			content: (
				<div className="product-summary__tab-content">
					<p>
						Вы можете обменять или вернуть товар в течение 14 дней с
						момента покупки при сохранении товарного вида, упаковки
						и чека. Для возврата свяжитесь с нашей службой
						поддержки. Возврат средств осуществляется в течение 5-10
						рабочих дней.
					</p>
				</div>
			),
		},
		{
			name: "Гарантии",
			content: (
				<div className="product-summary__tab-content">
					<p>
						На все товары предоставляется гарантия 6 месяцев с
						момента покупки. Гарантия распространяется на
						производственные дефекты. Для оформления гарантийного
						случая обратитесь в наш сервисный центр с чеком и
						товаром.
					</p>
				</div>
			),
		},
		{
			name: "О товаре",
			content: (
				<div className="product-summary__tab-content">
					<p>
						На все товары предоставляется гарантия 6 месяцев с
						момента покупки. Гарантия распространяется на
						производственные дефекты. Для оформления гарантийного
						случая обратитесь в наш сервисный центр с чеком и
						товаром.
					</p>
				</div>
			),
		},
	];

	const handleMouseEnter = () => {
		clearInterval(intervalRef.current);
	};

	const handleMouseLeave = () => {
		intervalRef.current = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % product.sliderImages.length);
		}, 3000);
	};

	const goToSlide = (index) => {
		setCurrentSlide(index);
	};

	return (
		<>
			<section className="product-info">
				<div className="container">
					<div className="product-info__wrapper">
						<h2 className="product-info__title">{product.title}</h2>
						<span className="product-info__sku">
							Артикул {product.sku}
						</span>
						<div className="product-info__gallery">
							<div className="product-info__slider">
								<div
									className="product-slider"
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								>
									<div
										className="product-slider__track"
										style={{
											transform: `translateX(-${
												currentSlide * (729 + 20)
											}px)`,
											transition: "transform 0.5s ease",
										}}
										ref={sliderRef}
									>
										{product.sliderImages &&
											product.sliderImages.map(
												(slide, index) => (
													<div
														className="product-slider__card"
														key={index}
														onClick={() => {
															setZoom({
																open: true,
																src: slide,
																alt: product.title,
															});
														}}
													>
														<img
															src={slide}
															alt={product.title}
														/>
													</div>
												)
											)}
									</div>
									<div className="product-slider__thumbs">
										{product.sliderImages &&
											product.sliderImages.map(
												(slide, index) => (
													<div
														className={`product-slider__thumb ${
															index ===
															currentSlide
																? "active"
																: ""
														}`}
														key={index}
														onClick={() =>
															goToSlide(index)
														}
													>
														<img
															src={slide}
															alt={product.title}
														/>
													</div>
												)
											)}
									</div>
								</div>
							</div>
							<div className="product-summary">
								<span className="product-summary__price">
									{product.price} ₽
								</span>
								<div className="product-summary__size">
									<h3 className="product-summary__size_title">
										ВЫБЕРИТЕ РАЗМЕР
									</h3>
									<div className="product-summary__size_list">
										{product.availableSizesList.map(
											(size) => (
												<button
													key={size}
													className={`product-summary__size_item ${
														sizeSelected.includes(
															size
														)
															? "active"
															: ""
													}`}
													onClick={() =>
														handleSizeSelected(size)
													}
												>
													{size}
												</button>
											)
										)}
									</div>
								</div>
								<div className="product-summary__btn">
									<button
										className="btn-corzina"
										onClick={handleAddToCartClick}
									>
										В корзину
									</button>
									<button
										className="btn-now"
										onClick={handleOpen}
									>
										Купить сейчас
									</button>
								</div>
							</div>
						</div>
						<div className="product-info__details">
							<div className="product-info__tab">
								<div className="tab">
									{tabs.map((tab, i) => (
										<button
											className={`tablinks ${
												active === tab.name
													? "active"
													: ""
											}`}
											onClick={() => handleTabs(tab.name)}
											data-index={i}
											key={i}
										>
											{tab.name}
										</button>
									))}
								</div>
								<div className="product-info__tab-content">
									{
										tabs.find((t) => t.name === active)
											.content
									}
									<div className="product-info__parameter">
										<div className="menu-container">
											<div className="menu-column__left">
												<div className="menu-column__item_left">
													Категория
												</div>
												<div className="menu-column__item_left">
													Модель
												</div>
												<div className="menu-column__item_left">
													Сезон
												</div>
												<div className="menu-column__item_left">
													Цвет
												</div>
											</div>
											<div className="menu-column__right">
												<div className="menu-column__item">
													{product.category}
												</div>
												<div className="menu-column__item">
													{product.shoeModel}
												</div>
												<div className="menu-column__item">
													{product.season}
												</div>
												<div className="menu-column__item">
													{product.detailedColor}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Modals
				products={products}
				isOpen={isModalOpen}
				onClose={handleClose}
				sizeSelected={sizeSelected}
				onAddToCard={onAddToCard}
			/>
			<ModalsZoom
				open={zoom.open}
				src={zoom.src}
				alt={zoom.alt}
				onClose={() => setZoom({ open: false, src: "", alt: "" })}
			/>
		</>
	);
}

export default ProductInfoSection;
{
	/* {product.additional_image_sources &&
									product.additional_image_sources.length >
										0 ? (
										product.additional_image_sources.map(
											(image) => (
												<div
													key={image.id || image.src}
												>
													<img
														src={image.src}
														alt={image.alt}
													/>
												</div>
											)
										)
									) : (
										<div>
											<img
												src="/images/placeholder.jpg"
												alt="Изображение не найдено"
											/>
											<p className="legend">
												Изображение не найдено
											</p>
										</div>
									)} */
}
