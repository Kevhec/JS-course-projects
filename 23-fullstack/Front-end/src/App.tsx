import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import { AuthProvider } from './context/AuthProvider'
import { PacientsProvider } from './context/PacientsProvider'

import AuthLayout from './layout/AuthLayout'
import AdminLayout from './layout/AdminLayout'

import SignIn from './pages/public/SignIn'
import SignUp from './pages/public/SignUp'
import VerifyAccount from './pages/public/VerifyAccount'
import ForgotPassword from './pages/public/ForgotPassword'
import NewPassword from './pages/public/NewPassword'
import Pacients from './pages/admin/Pacients'

// TODOS: Passwords requirements on label, countdown for redirect

function App (): JSX.Element {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <AuthProvider>
        <PacientsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='verification/:token' element={<VerifyAccount />} />
                <Route path='forgotpassword' element={<ForgotPassword />} />
                <Route path='forgotpassword/:token' element={<NewPassword />} />
              </Route>
              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Pacients />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PacientsProvider>
      </AuthProvider>
    </FormProvider>
  )
}

export default App
