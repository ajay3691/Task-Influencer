import React, { createContext, useState } from 'react';

import Navbar from './Navabr/Navbar';

import Admin from './ProductCompo/Admin';
import CreateMark from './ProductCompo/CreateMark';
import EditMark from './ProductCompo/EditMark';
import Register from './AuthCompo/register';
import Login from './AuthCompo/Login';
import TeacherEdit from './ProductCompo/TeacherEdit';
import TeachersList from './ProductCompo/TeacherList';
import Dashboard from './AuthCompo/Dashboards';
import MarksList from './ProductCompo/MarksList'
import CreateStudent from './ProductCompo/CreateStudent';
import CreateStudent1 from './ProductCompo/CreateStudent1';
import CreateTeacher from './ProductCompo/CreateTeachers';
import TeachersBoard from './AuthCompo/TeachersBoard';
import Myprofile from './AuthCompo/Myprofile';
import MarkList from './ProductCompo/MarksList';
import MarkList1 from './ProductCompo/MarksList1';
import AddMark from './ProductCompo/CreateMark';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <Router>

          <Navbar />
          <Routes>
          <Route path="/addMark" element={<AddMark />} />
          <Route path="/markList" element={<MarkList />} />
          <Route path="/markList1" element={<MarkList1 />} />
          <Route path="/teacherEdit" element={<TeacherEdit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createStudent" element={<CreateStudent />} />
          <Route path="/createStudent1" element={<CreateStudent1 />} />
          <Route path="/teachersBoard" element={<TeachersBoard />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/teachersList" element={<TeachersList />} />
          
          <Route path="/createTeacher" element={<CreateTeacher />} />
          <Route path="/marksList" element={<MarksList />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-mark" element={<CreateMark />} />
            <Route path="/edit-mark/:id" element={<EditMark />} />
          </Routes>
        </Router>
        </store.Provider>

    </div>
  );
};

export default App;