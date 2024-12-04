import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import InvoiceCreate from './InvoiceCreate'
import InvoiceEdit from './InvoiceEdit';
import InvoiceList from './InvoiceList';


function App() {
  return (
    <div className='app'>
      <h1>Manage Invoice</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InvoiceList />}></Route>
          <Route path='/invoice/create' element={<InvoiceCreate />}></Route>
          <Route path='/invoice/edit/:invoiceid' element={<InvoiceEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
