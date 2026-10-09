import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function Settings() {
  const [apiKey, setApiKey] = useState("")
  const [demoMode, setDemoMode] = useState(true)

  useEffect(() => {
    // Load from local storage or backend if needed, mock for now
    const savedKey = localStorage.getItem("gapmap_api_key") || ""
    setApiKey(savedKey)
    setDemoMode(savedKey === "")
  }, [])

  const handleSave = () => {
    localStorage.setItem("gapmap_api_key", apiKey)
    setDemoMode(apiKey === "")
    toast.success("Settings saved successfully")
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-[#69766F] mt-2">Manage your workspace preferences and integrations.</p>
      </div>

      <div className="bg-white border border-[#E0E5DF] rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">SerpApi Integration</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">SerpApi Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your SerpApi key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-[#69766F]">
                Required for live market data. If empty, the app runs in demo mode.
              </p>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label className="text-base">Demo Mode</Label>
                <p className="text-sm text-[#69766F]">
                  Return static data for testing when API Key is missing.
                </p>
              </div>
              <input type="checkbox" checked={demoMode} readOnly className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E0E5DF]">
          <Button onClick={handleSave} className="bg-[#117C68] hover:bg-[#0C5C4F] text-white">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
