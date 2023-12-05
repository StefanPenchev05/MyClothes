import React, { useState } from 'react';
import InputLabels from './UI/InputLabels';
import SubmitLogin from './UI/SubmitLoginButton';
import RememberMeForgotPass from './UI/RememberMeForgotPass';
import ThemeProvider from "./ThemeContext";


export const ThemeContext = React.createContext({} as any)

function LoginForm() {
  return (
    <form>
      <ThemeProvider>
        <div className='space-y-4'>
          <InputLabels/>
        </div>
        <RememberMeForgotPass/>
        <SubmitLogin/>
      </ThemeProvider>
    </form>
  )
}

export default LoginForm