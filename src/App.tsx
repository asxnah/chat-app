import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TabBar } from './components/TabBar/TabBar';
import Test from './pages/Test/Test';
import Auth from './pages/Auth/Auth';
import Contacts from './pages/Contacts/Contacts';
import ContactAdd from './pages/ContactAdd/ContactAdd';
import ContactEdit from './pages/ContactEdit/ContactEdit';

function App() {
	return (
		<BrowserRouter>
			<TabBar />
			<Routes>
				<Route path="/" element={<Test />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/contacts/add" element={<ContactAdd />} />
				<Route path="/contacts/edit" element={<ContactEdit />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
