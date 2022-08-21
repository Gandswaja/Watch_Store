import React from 'react';
import { Route, Routes } from 'react-router-dom'

// connect react-redux
import { connect } from 'react-redux'

// import pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisPage from './pages/register';
import DetailPage from './pages/detail.jsx'
import CartPage from './pages/cart.jsx'
import HistoryPage from './pages/history';
import HistoryAdmin from './pages/historyAdmin';
import NotFound from './pages/notFound';

// import action
import { keepLogin } from "./redux/actions"
class App extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem('idUser')
    this.props.keepLogin(id)
  }
  render() {
    console.log(this.props.role)
    if (this.props.role === 'admin') {
      return (
        <div style={{ backgroundColor: '#A3DDCB' }}>
          <Routes>
            <Route path='/' element={<HomePage />}> </Route>
            <Route path='/login' element={< LoginPage />} ></Route>
            <Route path='/register' element={< RegisPage />}></Route>
            <Route path='/detail' element={< DetailPage />}></Route>
            <Route path='/cart' element={< CartPage />}></Route>
            <Route path='/historyadmin' element={< HistoryAdmin />}></Route>
            <Route path='*' element={< NotFound />}></Route>
          </Routes>
        </div>
      )
    }
    return (
      <div style={{ backgroundColor: '#A3DDCB' }}>
        <Routes>
          <Route path='/' element={<HomePage />}> </Route>
          <Route path='/login' element={< LoginPage />} ></Route>
          <Route path='/register' element={< RegisPage />}></Route>
          <Route path='/detail' element={< DetailPage />}></Route>
          <Route path='/cart' element={< CartPage />}></Route>
          <Route path='/history' element={< HistoryPage />}></Route>
          <Route path='*' element={< NotFound />}></Route>
        </Routes>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapStateToProps, { keepLogin })(App);