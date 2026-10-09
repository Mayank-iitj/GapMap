import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import AppShell from "./components/layout/AppShell"
import LandingPage from "./pages/LandingPage"
import Workspace from "./pages/Workspace"
import Report from "./pages/Report"
import SavedReports from "./pages/SavedReports"
import ApiDocs from "./pages/ApiDocs"
import Policy from "./pages/Policy"
import Blog from "./pages/Blog"
import SystemStatus from "./pages/SystemStatus"
import CookieSettings from "./pages/CookieSettings"
import Settings from "./pages/Settings"
import About from "./pages/About"
import UseCases from "./pages/UseCases"
import Contact from "./pages/Contact"
import Pricing from "./pages/Pricing"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/status" element={<SystemStatus />} />
          <Route path="/cookie-settings" element={<CookieSettings />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Workspace />} />
            <Route path="report/:id" element={<Report />} />
            <Route path="saved" element={<SavedReports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </QueryClientProvider>
  )
}

export default App
