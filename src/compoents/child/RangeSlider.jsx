import { useState, useEffect } from "react";
import "./range-slider.css";

function RangeSlider({ minLimit, maxLimit, currentValue, onChange }) {
	const [sliderMinValue] = useState(minLimit);
	const [sliderMaxValue] = useState(maxLimit);

	const [minVal, setMinVal] = useState(currentValue.min);
	const [maxVal, setMaxVal] = useState(currentValue.max);
	const [minInput, setMinInput] = useState(currentValue.min);
	const [maxInput, setMaxInput] = useState(currentValue.max);

	const [isDragging, setIsDragging] = useState(false);

	const minGap = 100;

	useEffect(() => {
		if (currentValue) {
			// Валидация, чтобы значения из пропсов не нарушали логику minGap
			let newMin = currentValue.min;
			let newMax = currentValue.max;

			if (newMax - newMin < minGap) {
				if (newMin + minGap <= sliderMaxValue) {
					newMax = newMin + minGap;
				} else {
					newMin = newMax - minGap;
				}
			}
			if (newMin < sliderMinValue) newMin = sliderMinValue;
			if (newMax > sliderMaxValue) newMax = sliderMaxValue;

			setMinVal(newMin);
			setMaxVal(newMax);
			setMinInput(newMin);
			setMaxInput(newMax);
		}
	}, [currentValue, minGap, sliderMinValue, sliderMaxValue]);

	useEffect(() => {
		setSliderTrack();
	}, [minVal, maxVal, sliderMinValue, sliderMaxValue]);

	const triggerChange = (newMin, newMax) => {
		// Дополнительная валидация перед вызовом onValueChange
		if (newMax - newMin < minGap) {
			// Корректируем, если newMin слишком близко к newMax или наоборот
			// Эта логика может быть сложной, пример:
			// если newMin изменился, newMax = newMin + minGap (если возможно)
			// если newMax изменился, newMin = newMax - minGap (если возможно)
			// Для простоты пока оставим базовую передачу
		}
		if (newMin < sliderMinValue) newMin = sliderMinValue;
		if (newMax > sliderMaxValue) newMax = sliderMaxValue;
		if (newMin > newMax) {
			// Предотвращаем инверсию
			// Можно, например, не вызывать onChange или скорректировать значения
			return; // Или newMin = newMax - minGap; и т.д.
		}

		onChange({ min: newMin, max: newMax });
	};

	const slideMin = (e) => {
		const value = parseInt(e.target.value, 10);
		if (value >= sliderMinValue && maxVal - value >= minGap) {
			triggerChange(value, maxVal);
		}
	};

	const slideMax = (e) => {
		const value = parseInt(e.target.value, 10);
		if (value <= sliderMaxValue && value - minVal >= minGap) {
			triggerChange(minVal, value);
		}
	};

	const setSliderTrack = () => {
		const range = document.querySelector(".slider-track");

		if (range) {
			const minPercent =
				((minVal - sliderMinValue) /
					(sliderMaxValue - sliderMinValue)) *
				100;
			const maxPercent =
				((maxVal - sliderMinValue) /
					(sliderMaxValue - sliderMinValue)) *
				100;

			range.style.left = `${minPercent}%`;
			range.style.right = `${100 - maxPercent}%`;
		}
	};

	const handleMinInput = (e) => {
		const rawValue = e.target.value;
		if (rawValue === "") {
			// setMinInput(""); // Позволяем временно пустое поле
			// Не вызываем triggerChange сразу, или вызываем с defaultMin
			setMinInput(rawValue); // Обновляем только отображение в инпуте
			return;
		}
		const value = parseInt(rawValue, 10);
		if (
			!isNaN(value) &&
			value >= sliderMinValue &&
			value <= maxVal - minGap
		) {
			// setMinInput(value); // Обновится через props.currentValue
			// setMinVal(value);
			triggerChange(value, maxVal);
		} else {
			setMinInput(rawValue); // Позволяем некорректный ввод для отображения, но не обновляем основной стейт
		}
	};

	const handleMaxInput = (e) => {
		const rawValue = e.target.value;
		if (rawValue === "") {
			// setMaxInput("");
			setMaxInput(rawValue);
			return;
		}
		const value = parseInt(rawValue, 10);
		if (
			!isNaN(value) &&
			value <= sliderMaxValue &&
			value >= minVal + minGap
		) {
			// setMaxInput(value);
			// setMaxVal(value);
			triggerChange(minVal, value);
		} else {
			setMaxInput(rawValue);
		}
	};
	const handleMinInputBlur = (e) => {
		let value = parseInt(e.target.value, 10);
		if (isNaN(value) || value < sliderMinValue || value > maxVal - minGap) {
			value = currentValue.min; // Возвращаем к последнему валидному значению из пропсов
		}
		setMinInput(value); // Синхронизируем инпут
		triggerChange(value, maxVal);
	};

	const handleMaxInputBlur = (e) => {
		let value = parseInt(e.target.value, 10);
		if (isNaN(value) || value > sliderMaxValue || value < minVal + minGap) {
			value = currentValue.max; // Возвращаем к последнему валидному значению из пропсов
		}
		setMaxInput(value); // Синхронизируем инпут
		triggerChange(minVal, value);
	};

	const handleInputKeyDown = (e, type) => {
		if (e.key === "Enter") {
			const value = parseInt(e.target.value, 10);
			if (type === "min") {
				if (
					!isNaN(value) &&
					value >= sliderMinValue &&
					value <= maxVal - minGap
				) {
					triggerChange(value, maxVal);
				} else {
					setMinInput(currentValue.min); // Сброс к значению из пропс
				}
			} else if (type === "max") {
				if (
					!isNaN(value) &&
					value <= sliderMaxValue &&
					value >= minVal + minGap
				) {
					triggerChange(minVal, value);
				} else {
					setMaxInput(currentValue.max); // Сброс к значению из пропс
				}
			}
		}
	};

	const startDrag = () => {
		setIsDragging(true);
	};

	const stopDrag = () => {
		setIsDragging(false);
	};

	return (
		<div className="double-slider-box">
			<div className="input-box">
				<div className="min-box">
					<input
						type="number"
						value={minInput}
						onChange={handleMinInput}
						onBlur={handleMinInputBlur}
						onKeyDown={(e) => handleInputKeyDown(e, "min")}
						className="min-input"
						min={sliderMinValue}
						max={maxVal - minGap}
					/>
				</div>
				<div className="max-box">
					<input
						type="number"
						value={maxInput}
						onChange={handleMaxInput}
						onBlur={handleMaxInputBlur}
						onKeyDown={(e) => handleInputKeyDown(e, "max")}
						className="max-input"
						min={minVal + minGap}
						max={sliderMaxValue}
					/>
				</div>
			</div>
			<div className="range-slider">
				<div className="slider-track"></div>
				<input
					type="range"
					min={sliderMinValue}
					max={sliderMaxValue}
					value={minVal}
					onChange={slideMin}
					onMouseDown={startDrag}
					onMouseUp={stopDrag}
					onTouchStart={startDrag}
					onTouchEnd={stopDrag}
					className="min-val"
				/>
				<input
					type="range"
					min={sliderMinValue}
					max={sliderMaxValue}
					value={maxVal}
					onChange={slideMax}
					onMouseDown={startDrag}
					onMouseUp={stopDrag}
					onTouchStart={startDrag}
					onTouchEnd={stopDrag}
					className="max-val"
				/>
				{isDragging && <div className="min-tooltip">{minVal}</div>}
				{isDragging && <div className="max-tooltip">{maxVal}</div>}
			</div>
		</div>
	);
}

export default RangeSlider;
