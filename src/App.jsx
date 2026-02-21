// import React from "react";
import AppContent from "./AppContent";
import AuthProvider from "./context/AuthContext";
function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}
export default App;
