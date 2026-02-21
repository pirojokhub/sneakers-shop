import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const CheckIcon = () => (
	<svg
		width="12"
		height="10"
		viewBox="0 0 12 10"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.7071 0.792893C11.0976 0.402369 11.0976 -0.230803 10.7071 -0.621327C10.3166 -1.01185 9.68342 -1.01185 9.29289 -0.621327L10.7071 0.792893ZM3.5 7.5L2.79289 8.20711C3.18342 8.59763 3.81658 8.59763 4.20711 8.20711L3.5 7.5ZM1.20711 5.20711C0.816583 4.81658 0.183417 4.81658 -0.207107 5.20711C-0.597631 5.59763 -0.597631 6.2308 -0.207107 6.62132L1.20711 5.20711ZM9.29289 -0.621327L2.79289 6.79289L4.20711 8.20711L10.7071 0.792893L9.29289 -0.621327ZM2.79289 6.79289L1.20711 5.20711L-0.207107 6.62132L2.79289 8.20711L2.79289 6.79289Z"
			fill="white"
		/>
	</svg>
);

function OrdersTable() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		const fetchOrders = async () => {
			setLoading(true);
			setErrMsg("");

			// 1) кто залогинен
			const { data: userData, error: userErr } =
				await supabase.auth.getUser();
			if (userErr || !userData?.user) {
				setErrMsg(
					"Не удалось определить пользователя. Войдите в аккаунт."
				);
				setLoading(false);
				return;
			}

			const userId = userData.user.id;

			const { data, error } = await supabase
				.from("orders")
				.select(
					`
  id,
  user_id,
  orderId:order_id,
  items,
  totalSum:total_sum,
  isDelivery:is_delivery,
  isPaid:is_paid,
  createdAt:created_at
`
				)
				.eq("user_id", userId)
				.order("created_at", { ascending: false });

			if (error) {
				setErrMsg(error.message || "Не удалось загрузить заказы");
			} else {
				setOrders(Array.isArray(data) ? data : []);
			}

			setLoading(false);
		};

		fetchOrders();
	}, []);

	if (loading) {
		return (
			<div className="container">
				<p>Загрузка истории заказов…</p>
			</div>
		);
	}

	if (errMsg) {
		return (
			<div className="container">
				<p style={{ color: "crimson" }}>{errMsg}</p>
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="container">
				<p>Заказы пока не найдены.</p>
			</div>
		);
	}

	return (
		<div className="container">
			<table className="orders-table">
				<thead className="orders-table__header">
					<tr className="orders-table__row">
						<th className="orders-table__cell">Номер заказа</th>
						<th className="orders-table__cell">Дата</th>
						<th className="orders-table__cell">Предметов</th>
						<th className="orders-table__cell">Сумма</th>
						<th className="orders-table__cell">Доставлено</th>
						<th className="orders-table__cell">Оплачено</th>
					</tr>
				</thead>
				<tbody className="orders-table__body">
					{orders.map((o) => (
						<tr
							key={o.id}
							className={`orders-table__row ${
								o.isActive ? "orders-table__row--active" : ""
							}`}
						>
							<td className="orders-table__cell">
								<span className="orders-table__link">
									{o.orderId}
								</span>
							</td>

							<td className="orders-table__cell">
								{o.createdAt
									? new Date(o.createdAt).toLocaleDateString()
									: "—"}
							</td>

							<td className="orders-table__cell">
								{Array.isArray(o.items) ? o.items.length : 0}
							</td>

							<td className="orders-table__cell">
								{o.totalSum} ₽
							</td>

							<td className="orders-table__cell">
								<div
									className={`orders-table__checkbox ${
										o.isDelivery
											? "orders-table__checkbox--checked"
											: ""
									}`}
								>
									{o.isDelivery && <CheckIcon />}
								</div>
							</td>

							<td className="orders-table__cell">
								<div
									className={`orders-table__checkbox ${
										o.isPaid
											? "orders-table__checkbox--checked"
											: ""
									}`}
								>
									{o.isPaid && <CheckIcon />}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default OrdersTable;
