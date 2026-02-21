import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useLayoutEffect,
} from "react";
import "./scrool-bar.css"; // Убедись, что путь и имя файла верны

// Простая функция debounce
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

function CustomScrollbar({ children, height = "auto", maxHeight = "none" }) {
	const contentRef = useRef(null);
	const trackRef = useRef(null);
	const thumbRef = useRef(null);

	const [thumbHeight, setThumbHeight] = useState(20);
	const [scrollTop, setScrollTop] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [startY, setStartY] = useState(0);
	const [startScrollTop, setStartScrollTop] = useState(0);

	// --- Расчет высоты ползунка ---
	const updateThumb = useCallback(() => {
		const contentEl = contentRef.current;
		if (!contentEl) return;

		const { scrollHeight, clientHeight } = contentEl;
		// Убедимся, что scrollHeight не меньше clientHeight
		const currentScrollHeight = Math.max(scrollHeight, clientHeight);
		const newThumbHeight = Math.max(
			// Добавим проверку на scrollHeight > 0, чтобы избежать NaN
			currentScrollHeight > 0
				? (clientHeight / currentScrollHeight) * clientHeight
				: clientHeight,
			20 // Минимальная высота ползунка
		);
		setThumbHeight(Math.min(newThumbHeight, clientHeight)); // Ползунок не может быть выше контейнера
	}, []);

	// --- Обработчик скролла контента ---
	const handleScroll = useCallback(() => {
		const contentEl = contentRef.current;
		if (!contentEl) return;
		setScrollTop(contentEl.scrollTop);
		// Обновление высоты ползунка на скролл - опционально, убираем для производительности
		// updateThumb(); // Можно убрать, если контент не меняет размер динамически во время скролла
	}, []);

	// --- Обработчики перетаскивания ползунка ---
	const handleThumbMouseDown = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!contentRef.current) return; // Добавим проверку
		setStartY(e.clientY);
		setStartScrollTop(contentRef.current.scrollTop);
		setIsDragging(true);
	}, []);

	const handleThumbMouseMove = useCallback(
		(e) => {
			if (
				!isDragging ||
				!contentRef.current ||
				!trackRef.current ||
				!thumbRef.current
			)
				return;
			e.preventDefault();
			e.stopPropagation();

			const contentEl = contentRef.current;
			const trackEl = trackRef.current;

			const { scrollHeight, clientHeight } = contentEl;
			const trackHeight = trackEl.clientHeight;
			const deltaY = e.clientY - startY;

			// Максимальный скролл контента
			const maxScrollTop = scrollHeight - clientHeight;
			// Убедимся, что он не отрицательный
			if (maxScrollTop <= 0) return;

			// Максимальное смещение ползунка
			// Используем высоту из state 'thumbHeight' для консистентности
			const currentThumbHeight = thumbHeight;
			const maxThumbTop = trackHeight - currentThumbHeight;

			// Защита от деления на ноль или некорректного значения maxThumbTop
			if (maxThumbTop <= 0) return;

			// Расчет смещения скролла
			const scrollDelta = (deltaY / maxThumbTop) * maxScrollTop;
			const newScrollTop = Math.min(
				maxScrollTop,
				Math.max(0, startScrollTop + scrollDelta)
			);

			contentEl.scrollTop = newScrollTop;
		},
		[isDragging, startY, startScrollTop, thumbHeight] // Добавили thumbHeight в зависимости
	);

	const handleThumbMouseUp = useCallback(
		(e) => {
			if (!isDragging) return;
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);
		},
		[isDragging]
	);

	// --- Добавление и удаление глобальных слушателей для перетаскивания ---
	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleThumbMouseMove);
			document.addEventListener("mouseup", handleThumbMouseUp);
			document.body.style.userSelect = "none";
		} else {
			document.removeEventListener("mousemove", handleThumbMouseMove);
			document.removeEventListener("mouseup", handleThumbMouseUp);
			document.body.style.removeProperty("user-select");
		}

		return () => {
			document.removeEventListener("mousemove", handleThumbMouseMove);
			document.removeEventListener("mouseup", handleThumbMouseUp);
			document.body.style.removeProperty("user-select");
		};
	}, [isDragging, handleThumbMouseMove, handleThumbMouseUp]);

	// --- Расчет позиции Top для ползунка ---
	const getThumbTop = useCallback(() => {
		const contentEl = contentRef.current;
		const trackEl = trackRef.current;
		if (!contentEl || !trackEl) return 0;

		const { scrollHeight, clientHeight } = contentEl;
		const trackHeight = trackEl.clientHeight;
		const currentThumbHeight = thumbHeight; // Используем state

		// Если скролла нет или track еще не отрисован
		if (scrollHeight <= clientHeight || trackHeight <= 0) return 0;

		const maxScrollTop = scrollHeight - clientHeight;
		const maxThumbTop = trackHeight - currentThumbHeight;

		// Защита от деления на ноль и некорректных значений
		if (maxScrollTop <= 0 || maxThumbTop <= 0) return 0;

		return (scrollTop / maxScrollTop) * maxThumbTop;
	}, [scrollTop, thumbHeight]); // Добавили thumbHeight

	// --- Обработчик изменения размера окна ---
	const handleResize = useCallback(
		debounce(() => {
			// console.log('Resizing, updating thumb...');
			updateThumb();
			// Можно добавить setScrollTop(contentRef.current.scrollTop), если нужно обновить
			// позицию ползунка немедленно после ресайза, а не ждать следующего скролла
			if (contentRef.current) {
				setScrollTop(contentRef.current.scrollTop); // Обновляем позицию
			}
		}, 100),
		[updateThumb]
	); // debounce с задержкой 100ms

	// --- Эффект для слушателей скролла и ресайза ---
	// Используем useLayoutEffect для более плавной инициализации
	useLayoutEffect(() => {
		const contentEl = contentRef.current;
		if (contentEl) {
			updateThumb(); // Первоначальный расчет
			// Устанавливаем начальное значение scrollTop из элемента, если оно есть
			setScrollTop(contentEl.scrollTop);
			contentEl.addEventListener("scroll", handleScroll, {
				passive: true,
			}); // { passive: true } для производительности
		}
		window.addEventListener("resize", handleResize);

		// Очистка при размонтировании
		return () => {
			if (contentEl) {
				contentEl.removeEventListener("scroll", handleScroll);
			}
			window.removeEventListener("resize", handleResize);
		};
	}, [handleScroll, updateThumb, handleResize]); // Добавили handleResize

	return (
		<div className="custom-scrollbar_wrapper">
			<div
				className="custom-scrollbar_content"
				ref={contentRef}
				style={{ height, maxHeight }}
			>
				{children}
			</div>
			{/* Показываем трек и ползунок только если есть скролл */}
			{thumbHeight < (contentRef.current?.clientHeight || 0) && (
				<div className="custom-scrollbar_track" ref={trackRef}>
					<div
						className="custom-scrollbar_thumb"
						ref={thumbRef}
						style={{
							height: `${thumbHeight}px`,
							top: `${getThumbTop()}px`, // Используем useCallback-версию
						}}
						onMouseDown={handleThumbMouseDown}
					/>
				</div>
			)}
		</div>
	);
}

export default CustomScrollbar;
