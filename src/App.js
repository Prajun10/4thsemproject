import NavBar from './components/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/home/Home';
import Products from './components/products/Products';
import { Provider } from "react-redux"
import store from "./store/store"
import ProductDetails from "./product/ProductDetails"
import LoginSignup from './components/login/LoginSignup';
import './App.css';
import Search from './components/search/Search';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <>
          <Router>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:keyword' element={<Products />} />
              <Route path='/search' element={<Search/>} />
              <Route path='/login' element={<LoginSignup/>} />
            </Routes>
          </Router>
          {/* <Footer/> */}
        </>
        </Provider>
    </div>
  );
}

export default App;
