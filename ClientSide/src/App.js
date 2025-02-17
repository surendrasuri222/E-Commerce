import './app.css';
import './comp.css'
import Dashboard from "./Components/Dashboard";
import { Route, Routes } from 'react-router-dom'
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Nav from './Components/Navbar';
import Products from './Components/Products';
import Search from './Components/Search';
import Newproduct from './Components/Newproduct';
import Userprofile from './Components/Userprofile';
import MyProfleEdit from './Components/MyProfleEdit';
import Wishlist from './Components/Wishlist';
import Mail from './Components/Mail';
import Images from './Components/images';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Nav />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path='/newproduct' element={<Newproduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path='/userprofile/editdata/:id' element={<MyProfleEdit />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/sendmail" element={<Mail />} />
        <Route path='/images' element={<Images />} />


      </Routes>
    </div>
  );
}

export default App;
