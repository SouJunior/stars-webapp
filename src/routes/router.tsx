import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages'
// import { DefaultLayout } from '../layouts/DefaultLayout';
// import { LoginLayout } from '../layouts/LoginLayout';

// Lazy loading dos componentes
// const Home = React.lazy(() => import('../pages/Home'));
// const FeedJobs = React.lazy(() => import('../pages/FeedJobs'));
// const Login = React.lazy(() => import('../pages/Login'));
// const JobSelected = React.lazy(() => import('../pages/JobSelected'));
// const MyApplications = React.lazy(() => import('../pages/MyApplications'));
// const Companies = React.lazy(() => import('../pages/Companies'));
// const CompanyApplications = React.lazy(() => import('../pages/CompanyApplications'));
// const MatchJobs = React.lazy(() => import('../pages/MatchJobs'));
// const ChangePassword = React.lazy(() => import('../pages/ChangePassword'));
// const ResetPassword = React.lazy(() => import('../pages/ResetPassword'));
// const ConfirmEmail = React.lazy(() => import('../pages/ConfirmEmail'));
// const ConfirmRegister = React.lazy(() => import('../pages/ConfirmRegister'));

// Loading component
const LoadingComponent: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}
  >
    <div
      style={{
        width: '32px',
        height: '32px',
        border: '2px solid #f3f3f3',
        borderTop: '2px solid #62d4a4',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    ></div>
  </div>
)

// Router principal
const NavRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Rotas com DefaultLayout */}
        {/*
         <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="job" element={<FeedJobs />} />
          <Route path="job/searchTerm" element={<FeedJobs />} />
          <Route path="job/selected/:id" element={<JobSelected />} />
          <Route path="my-applications" element={<MyApplications />} />
          <Route path="recovery-password" element={<ResetPassword />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route> 

        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="confirm-email" element={<ConfirmEmail />} />
        <Route path="userconfirmation" element={<ConfirmRegister />} />
        <Route 
          path="companyconfirmation" 
          element={<ConfirmRegister />} 
          />

          */}
        {/* 404 e redirecionamentos */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  )
}

export default NavRoutes
