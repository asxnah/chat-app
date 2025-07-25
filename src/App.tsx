import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TabBar } from './components/TabBar/TabBar';
import Test from './pages/Test/Test';
import Auth from './pages/Auth/Auth';
import Contacts from './pages/Contacts/Contacts';
import Contact from './pages/Contact/Contact';

function App() {
	return (
		<BrowserRouter>
			<TabBar />
			<Routes>
				<Route path="/" element={<Test />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/contacts/contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
