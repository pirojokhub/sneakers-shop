import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext({
	isAuth: false,
	user: null,
	setIsAuth: () => {},
	setUser: () => {},
});

// 👇 добавляем кастомный хук
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		let mounted = true;

		// получаем сессию при старте
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			const session = data?.session ?? null;
			setUser(session?.user ?? null);
			setIsAuth(!!session);
		});

		// подписка на изменения
		const { data: subscription } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
				setIsAuth(!!session);
			}
		);

		return () => {
			mounted = false;
			subscription?.subscription?.unsubscribe?.();
		};
	}, []);

	const value = useMemo(
		() => ({ isAuth, user, setIsAuth, setUser }),
		[isAuth, user]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
