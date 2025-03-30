// import './App.css'
import Login from './components/LogIn'
import HomePage from './components/HomePage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignUpBuilding from './components/SignUpBuilding'
import SignUp from './components/SignUp'
import MyDetails from './components/MyDetails'
import MyPayments from './components/MyPayments'
// import Email from './components/Email/Email'
// import { Email } from '@mui/icons-material'

function App() {

  return (
    <>
      {/* <Email tenant={{ userName: "Avital", email: "a0583236811@gmail.com", managerEmail: "avital.busso@gmail.com" }} />      */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="homePage" element={<HomePage />}></Route>
          <Route path='signUpBuilding' element={<SignUpBuilding />}></Route>
          <Route path='signUp' element={<SignUp />}></Route>
          <Route path='myDetails' element={<MyDetails />}></Route>
          <Route path='myPayments' element={<MyPayments />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
