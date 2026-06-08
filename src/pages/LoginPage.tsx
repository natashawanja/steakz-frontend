tsximport { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/api/auth/login', { email, password })
      login(res.data.token, res.data.user)
      const role = res.data.user.role
      if (role === 'ADMIN') navigate('/admin')
      else if (role === 'HM') navigate('/hm')
      else if (role === 'BM') navigate('/bm')
      else if (role === 'CHEF') navigate('/chef')
      else if (role === 'CASHIER') navigate('/cashier')
      else navigate('/waiter')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const branchGroups = [
    {
      label: 'Global',
      accounts: [
        { label: 'Admin', email: 'admin@steakz.com', pw: 'Admin123!' },
        { label: 'HQ Manager', email: 'hm@steakz.com', pw: 'HM123!' },
      ]
    },
    {
      label: 'London',
      accounts: [
        { label: 'BM', email: 'bm.london@steakz.com', pw: 'BM123!' },
        { label: 'Chef', email: 'chef.london@steakz.com', pw: 'Chef123!' },
        { label: 'Cashier', email: 'cashier.london@steakz.com', pw: 'Cash123!' },
        { label: 'Waiter', email: 'waiter.london@steakz.com', pw: 'Wait123!' },
      ]
    },
    {
      label: 'Manchester',
      accounts: [
        { label: 'BM', email: 'bm.manchester@steakz.com', pw: 'BM@Manc1' },
        { label: 'Chef', email: 'chef.manchester@steakz.com', pw: 'Chef@Manc1' },
        { label: 'Cashier', email: 'cashier.manchester@steakz.com', pw: 'Cash@Manc1' },
        { label: 'Waiter', email: 'waiter.manchester@steakz.com', pw: 'Wait@Manc1' },
      ]
    },
    {
      label: 'Birmingham',
      accounts: [
        { label: 'BM', email: 'bm.birmingham@steakz.com', pw: 'BM@Birm1' },
        { label: 'Chef', email: 'chef.birmingham@steakz.com', pw: 'Chef@Birm1' },
        { label: 'Cashier', email: 'cashier.birmingham@steakz.com', pw: 'Cash@Birm1' },
        { label: 'Waiter', email: 'waiter.birmingham@steakz.com', pw: 'Wait@Birm1' },
      ]
    },
    {
      label: 'Leeds',
      accounts: [
        { label: 'BM', email: 'bm.leeds@steakz.com', pw: 'BM123!' },
        { label: 'Chef', email: 'chef.leeds@steakz.com', pw: 'Chef123!' },
        { label: 'Cashier', email: 'cashier.leeds@steakz.com', pw: 'Cash123!' },
        { label: 'Waiter', email: 'waiter.leeds@steakz.com', pw: 'Wait123!' },
      ]
    },
    {
      label: 'Edinburgh',
      accounts: [
        { label: 'BM', email: 'bm.edinburgh@steakz.com', pw: 'BM@Edin1' },
        { label: 'Chef', email: 'chef.edinburgh@steakz.com', pw: 'Chef@Edin1' },
        { label: 'Cashier', email: 'cashier.edinburgh@steakz.com', pw: 'Cash@Edin1' },
        { label: 'Waiter', email: 'waiter.edinburgh@steakz.com', pw: 'Wait@Edin1' },
      ]
    },
    {
      label: 'Bristol',
      accounts: [
        { label: 'BM', email: 'bm.bristol@steakz.com', pw: 'BM@Bris1' },
        { label: 'Chef', email: 'chef.bristol@steakz.com', pw: 'Chef@Bris1' },
        { label: 'Cashier', email: 'cashier.bristol@steakz.com', pw: 'Cash@Bris1' },
        { label: 'Waiter', email: 'waiter.bristol@steakz.com', pw: 'Wait@Bris1' },
      ]
    },
    {
      label: 'Liverpool',
      accounts: [
        { label: 'BM', email: 'bm.liverpool@steakz.com', pw: 'BM123!' },
        { label: 'Chef', email: 'chef.liverpool@steakz.com', pw: 'Chef123!' },
        { label: 'Cashier', email: 'cashier.liverpool@steakz.com', pw: 'Cash123!' },
        { label: 'Waiter', email: 'waiter.liverpool@steakz.com', pw: 'Wait123!' },
      ]
    },
  ]

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url("/login.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="fixed inset-0 bg-black/60 z-0"></div>

      {/* Navbar */}
      <nav className="relative z-10 bg-charcoal/80 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold text-brass">STEAKZ</h1>
        <div className="flex items-center gap-6 text-sm">
          <a href="/home" className="hover:text-brass transition">Home</a>
          <a href="/home#menu" className="hover:text-brass transition">Menu</a>
          <a href="/home#branches" className="hover:text-brass transition">Branches</a>
          <a href="/home#contact" className="hover:text-brass transition">Contact</a>
        </div>
      </nav>

      {/* Login card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">

          <h1 className="font-display text-4xl font-bold text-charcoal mb-1">
            STEAKZ
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Staff portal — sign in to continue
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@steakz.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-brass text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          {/* Test accounts */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-medium mb-3">Test accounts</p>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {branchGroups.map(group => (
                <div key={group.label}>
                  <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 px-1">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.accounts.map(u => (
                      <button
                        key={u.email}
                        onClick={() => { setEmail(u.email); setPassword(u.pw) }}
                        className="w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-500 transition"
                      >
                        <span className="font-medium text-gray-700">{u.label}</span>
                        {' — '}{u.email}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}