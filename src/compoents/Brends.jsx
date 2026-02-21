import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

import slide1 from "../img/brens-img/Mask Group.png";
import slide2 from "../img/brens-img/Mask Group2.png";
import slide3 from "../img/brens-img/Mask Group3.png";
import slide4 from "../img/brens-img/Mask Group4.png";
import slide5 from "../img/brens-img/Mask Group5.png";
import slide6 from "../img/brens-img/Mask Group6.png";

function Brends() {
	const brendImages = [
		{
			id: 1,
			url: slide1,
			alt: "porsche design",
		},
		{
			id: 2,
			url: slide2,
			alt: "new balance",
		},
		{
			id: 3,
			url: slide3,
			alt: "nike",
		},
		{
			id: 4,
			url: slide4,
			alt: "puma",
		},
		{
			id: 5,
			url: slide5,
			alt: "vans",
		},
		{
			id: 6,
			url: slide6,
			alt: "reebook",
		},
	];
	return (
		<section className="brends">
			<h2 className="brends-title">Бренды</h2>
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
				<div className="slider-track_brends">
					<Swiper
						modules={[Navigation]}
						spaceBetween={20}
						slidesPerView={4}
						navigation={{
							nextEl: ".custom-swiper-button-next",
							prevEl: ".custom-swiper-button-prev",
						}}
						className="slider-track_brends"
					>
						{brendImages.map((item) => (
							<SwiperSlide key={item.id}>
								<div className="card">
									<div className="card__image">
										<img src={item.url} alt={item.alt} />
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}
export default Brends;
