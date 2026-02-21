import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal-zoom.css";

const modalsRoot = document.getElementById("modal-root");

function Modals({ open, onClose, src, alt }) {
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	if (!open) return null;

	return ReactDOM.createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>
					✕
				</button>
				<img src={src} alt={alt || "Увеличенное изображение"} />
			</div>
		</div>,
		modalsRoot
	);
}

export default Modals;
