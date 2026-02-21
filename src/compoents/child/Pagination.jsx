// import React from "react";
import "./pagination.scss";
function Pagination({ currentPage, totalPages, paginate }) {
	if (totalPages <= 1) {
		return null;
	}

	const pageNumbers = [];
	// --- ИСПРАВЛЕННЫЙ ЦИКЛ ---
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	// --- ИСПРАВЛЕННЫЙ RETURN И КЛАССЫ ---
	return (
		<nav
			className="catalog__pagination"
			aria-label="Навигация по страницам"
		>
			<ul className="pagination__list">
				{pageNumbers.map((page) => (
					<li
						// --- ДОБАВЛЕНО: Класс для активной страницы ---
						className={`pagination__item ${
							page === currentPage
								? "pagination__item--active"
								: ""
						}`}
						key={page}
					>
						<button
							className="pagination__button"
							onClick={() => paginate(page)}
							// --- ДОБАВЛЕНО: Отключение и атрибут для активной кнопки ---
							disabled={page === currentPage}
							aria-current={
								page === currentPage ? "page" : undefined
							}
						>
							{page}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Pagination;
