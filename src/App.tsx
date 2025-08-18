import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useWindowWidth from './hooks/useWindowWidth';
import { TabBar } from './components/TabBar/TabBar';
import Test from './pages/Test/Test';
import Auth from './pages/Auth/Auth';
import Contacts from './pages/Contacts/Contacts';
import Contact from './pages/mobile/Contact/Contact';
import Chats from './pages/Chats/Chats';
import NotFound from './pages/NotFound/NotFound';
import BasicInfoFormPage from './pages/mobile/BasicInfoFormPage/BasicInfoFormPage';

function App() {
	const width = useWindowWidth();
	return (
		<BrowserRouter>
			{width > 800 && <TabBar />}
			<Routes>
				<Route path="/" element={<Test />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/contacts/create" element={<BasicInfoFormPage />} />
				<Route path="/contact/:id" element={<Contact />} />
				<Route path="/contact/edit/:id" element={<BasicInfoFormPage />} />
				<Route path="/settings/profile/edit" element={<BasicInfoFormPage />} />
				<Route path="/chats" element={<Chats />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
