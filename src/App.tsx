import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/Test/Test';
import Auth from './pages/Auth/Auth';
import Contacts from './pages/Contacts/Contacts';
import BasicInfoFormPage from './pages/mobile/BasicInfoFormPage/BasicInfoFormPage';
import Contact from './pages/mobile/Contact/Contact';
// import useWindowWidth from './hooks/useWindowWidth';

function App() {
	// const width = useWindowWidth();
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Test />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/contacts/create" element={<BasicInfoFormPage />} />
				<Route path="/contact/:id" element={<Contact />} />
				<Route path="/contact/edit/:id" element={<BasicInfoFormPage />} />
				<Route path="/settings/profile/edit" element={<BasicInfoFormPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
