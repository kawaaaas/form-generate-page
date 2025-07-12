import { useEffect, useState } from 'react'

function App() {
  const [backendStatus, setBackendStatus] = useState<string>('connecting...')
  const [backendMessage, setBackendMessage] = useState<string>('')

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/health')
        const data = await response.json()
        setBackendStatus('connected')
        setBackendMessage(data.status)
      } catch (error) {
        setBackendStatus('disconnected')
        setBackendMessage('Backend server is not running')
      }
    }

    checkBackend()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Form Generate Page
        </h1>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Frontend Status</h2>
            <p className="text-green-600">✅ React + Vite + TypeScript</p>
            <p className="text-green-600">✅ Tailwind CSS</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Backend Status</h2>
            <p
              className={`${backendStatus === 'connected' ? 'text-green-600' : 'text-red-600'}`}
            >
              {backendStatus === 'connected' ? '✅' : '❌'} {backendStatus}
            </p>
            <p className="text-sm text-gray-600">{backendMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
