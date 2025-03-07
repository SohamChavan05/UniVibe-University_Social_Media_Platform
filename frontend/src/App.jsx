import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "./components/loginandregister/LoginandRegister";
import Home from "./components/home/Home";
import Logout from "./components/loginandregister/Logout";
import CommunityLayout from "./components/community/CommunityLayout";
import PostList from "./components/community/PostList";
import "./App.css";
import PropTypes from "prop-types";

// Simulate auth check
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<ProtectedRoute><CommunityLayout /></ProtectedRoute>}>
          <Route path=":communityName" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
        </Route>
        <Route path="/community/:name" element={<ProtectedRoute><PostList/></ProtectedRoute>}/>
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect unknown routes to home */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
