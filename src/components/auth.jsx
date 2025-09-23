import React from 'react'
import { auth } from '../config/firebase.jsx'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useState } from 'react'

const handleLogout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    try {
      // 檢查輸入
      if (!email || !password) {
        alert('請輸入郵箱和密碼')
        return
      }
      if (password.length < 6) {
        alert('密碼長度至少需要6個字符')
        return
      }

      await createUserWithEmailAndPassword(auth, email, password)
      alert('註冊成功！')
    } catch (error) {
      console.error('Error signing up:', error)

      // 顯示更友好的錯誤信息
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('此郵箱已被註冊')
          break
        case 'auth/invalid-email':
          alert('郵箱格式不正確')
          break
        case 'auth/weak-password':
          alert('密碼強度不夠')
          break
        default:
          alert(`註冊失敗: ${error.message}`)
      }
    }
  }

  const handleLogin = async () => {
    try {
      // 檢查輸入
      if (!email || !password) {
        alert('請輸入郵箱和密碼')
        return
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      alert('登入成功！')
    } catch (error) {
      console.error('Error logging in:', error)

      // 顯示更友好的錯誤信息
      switch (error.code) {
        case 'auth/invalid-credential':
          alert('郵箱或密碼錯誤')
          break
        case 'auth/user-not-found':
          alert('用戶不存在')
          break
        case 'auth/wrong-password':
          alert('密碼錯誤')
          break
        case 'auth/invalid-email':
          alert('郵箱格式不正確')
          break
        case 'auth/user-disabled':
          alert('用戶帳戶已被停用')
          break
        default:
          alert(`登入失敗: ${error.message}`)
      }
    }
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Auth
