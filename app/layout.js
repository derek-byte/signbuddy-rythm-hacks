import Navbar from './components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from './components/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SignBuddy',
  description: 'Learn and recognize common sign-language gestures with your camera.',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <Navbar/>
            {children}
          </AuthProvider>
        </body>
      </html>
  )
}
