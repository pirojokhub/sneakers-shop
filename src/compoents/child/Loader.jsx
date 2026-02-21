// import React from "react";
import "./loader.scss";

function Loader() {
	return (
		<div className="loader-overlay">
			<div className="loader-box">
				<div className="box-front"></div>
				<div className="box-side"></div>
				<div className="box-top">
					<span className="brand-logo">Intoestage</span>
				</div>
				<div className="sneaker-icon">👟</div>
			</div>
		</div>
	);
}

export default Loader;
