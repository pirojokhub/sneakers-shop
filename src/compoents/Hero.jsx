import React, { useState } from "react";
import NiteJogger from "../img/hero-img/header_img1.png";
import YeezyBoost from "../img/hero-img/header_img2.png";
import AirMax from "../img/hero-img/header_img3.png";

import ThumbNiteJogger from "../img/thumb-hero-img/adidas-Nite-Jogger.png";
import ThumbYeezyBoost from "../img/thumb-hero-img/uniseks-adidas-yeezy 1.png";
import ThumbAirMax from "../img/thumb-hero-img/air-max.png";

const HeroSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			id: 1,
			title: "ADIDAS NITE JOGGER",
			subtitle: "Городские кроссовки в ярком стиле 80-х",
			image: NiteJogger,
			thumb: ThumbNiteJogger,
			alt: "Кроссовки Adidas Nite Jogger",
		},
		{
			id: 2,
			title: "ADIDAS YEEZY BOOST",
			subtitle: "Премиальные кроссовки от Kanye West",
			image: YeezyBoost,
			thumb: ThumbYeezyBoost,
			alt: "Кроссовки Adidas Yeezy Boost",
		},
		{
			id: 3,
			title: "NIKE AIR MAX",
			subtitle: "Культовые кроссовки с технологией Air",
			image: AirMax,
			thumb: ThumbAirMax,
			alt: "Кроссовки Nike Air Max",
		},
	];

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	};

	const [firstWord, ...restTitle] = slides[currentSlide].title.split(" ");

	return (
		<section className="product-hero">
			<div className="hero-wrapper">
				<div className="hero-content">
					<div className="product-info">
						<h1 className="product-info_title">
							{firstWord} <br />
							{restTitle.join(" ")}
						</h1>
						<p className="product-info_subtitle">
							{slides[currentSlide].subtitle}
						</p>
						<button className="view-all">Смотреть все</button>
					</div>

					<div className="product-image">
						<img
							src={slides[currentSlide].image}
							alt={slides[currentSlide].alt}
							width="549"
							height="447"
							loading="lazy"
						/>
					</div>
					<button className="next-slide-btn" onClick={nextSlide}>
						<svg
							width="15"
							height="33"
							viewBox="0 0 15 33"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M14.0609 15.2796C14.6144 15.9988 14.6144 17.0005 14.0609 17.7196L3.58481
								 31.3284C2.42013 32.8414 0 32.0177 0 30.1084L0 2.89085C0 0.981515 2.42013 0.157899 3.58481
								  1.67087L14.0609 15.2796Z"
								fill="#29292D"
							/>
						</svg>
					</button>
				</div>
				<div className="slider-controls">
					<div className="brand-thumbnails">
						{slides
							.filter(
								(slide) => slide.id !== slides[currentSlide].id
							)

							.map((slide, index) => (
								<div
									key={slide.id}
									className={`brand-thumbnail ${
										index === currentSlide ? "active" : ""
									}`}
									onClick={() => {
										const realIndex = slides.findIndex(
											(s) => s.id === slide.id
										);
										setCurrentSlide(realIndex);
									}}
								>
									<img src={slide.thumb} alt={slide.title} />
									<div className="brand-caption">
										<h4>{slide.title}</h4>
										<button className="arrow">
											<svg
												width="10"
												height="10"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M5 12H19M19 12L12 5M19 12L12 19"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSlider;
