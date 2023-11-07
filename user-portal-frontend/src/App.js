import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/loginPage/loginPage';
import StudentHomepage from './components/pages/studentHomepage/studentHomepage';
import TeacherHomepage from './components/pages/teacherHomepage/teacherHomepage';
import StudentRegisterPage from './components/pages/studentRegisterPage/studentRegisterPage';
import TestPage from './components/pages/TakeTest/TestPage';
import ForgetPwd from './components/pages/ForgetPasswordpage/ForgetPwd';
import Demo from './components/pages/ForgetPasswordpage/Demo';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginPage/>}/>
        <Route exact path='/homeStudent' element={<StudentHomepage/>}/>
        <Route exact path='/homeTeacher' element={<TeacherHomepage/>}/>
        <Route exact path='/studentRegisterPage' element={<StudentRegisterPage/>}/>
        <Route exact path='/takeTestPage' element={<TestPage/>}/>
        <Route exact path='/forgetPwd' element={<ForgetPwd/>}/>
        <Route exact path='/demo/:id/:token' element={<Demo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
