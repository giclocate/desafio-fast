import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/molecules/Sidebar'
import { WorkshopsPage } from './pages/Workshops'
import { DashboardPage } from './pages/Dashboard'
import { ColaboradoresPage } from './pages/Colaboradores'
import { WorkshopDetailPage } from './pages/WorkshopDetail'

function App() {
  return (
    <BrowserRouter>
      <Sidebar />

      <main className="min-h-screen bg-background text-foreground transition-colors lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/colaboradores" element={<ColaboradoresPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App