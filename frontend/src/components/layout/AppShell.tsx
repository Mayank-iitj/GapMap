import { Outlet, Link, useLocation } from "react-router-dom"
import { Compass, LayoutDashboard, Bookmark, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AppShell() {
  const location = useLocation()
  
  const navItems = [
    { label: "Workspace", icon: LayoutDashboard, path: "/app" },
    { label: "Saved Reports", icon: Bookmark, path: "/app/saved" },
    { label: "Settings", icon: Settings, path: "/app/settings" },
  ]

  return (
    <div className="flex h-screen w-full bg-[#F7F8F5] overflow-hidden font-sans text-[#17211F]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#14212B] text-white flex flex-col border-r border-[#E0E5DF]/10 hidden md:flex no-print">
        <div className="p-6 pb-2">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold font-sans tracking-tight">
            <Compass className="h-6 w-6 text-[#117C68]" />
            <span>GapMap <span className="text-[#69766F] font-normal">India</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path))
                  ? "bg-[#117C68] text-white" 
                  : "text-[#69766F] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar for mobile / breadcrumbs */}
        <header className="h-14 border-b border-[#E0E5DF] bg-white flex items-center px-6 shrink-0 md:hidden no-print">
          <div className="font-semibold text-lg flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#117C68]" /> GapMap
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
