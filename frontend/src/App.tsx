import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AdminResponseListPage from './pages/AdminResponseListPage';
import FormCreatePage from './pages/FormCreatePage';
import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResponseDetailPage from './pages/ResponseDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms/create" element={<FormCreatePage />} />
          <Route path="/forms/:formId" element={<FormPage />} />
          <Route
            path="/forms/:formId/responses/:responseId"
            element={<ResponseDetailPage />}
          />
          <Route
            path="/responses/:responseId"
            element={<ResponseDetailPage />}
          />
          <Route
            path="/admin/:adminId/responses"
            element={<AdminResponseListPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
