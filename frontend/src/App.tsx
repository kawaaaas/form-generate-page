import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { HomePage } from './pages/HomePage'
// import { FormCreatePage } from './pages/FormCreatePage'
// import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/forms/create" element={<FormCreatePage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/" element={<div>home</div>} />
        <Route path="/forms/create" element={<div>form/create</div>} />
        <Route path="/forms/response/:id" element={<div>form/response</div>} />
        <Route path="/forms/answer/:id" element={<div>form/answer</div>} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
