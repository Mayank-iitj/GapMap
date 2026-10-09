import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MapPin, Search, Briefcase, IndianRupee, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { analyzeMarket } from "@/lib/api"

const formSchema = z.object({
  businessIdea: z.string().min(3, "Business idea must be at least 3 characters"),
  city: z.string().min(2, "City is required"),
  budget: z.string().optional(),
  targetCustomer: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export default function Workspace() {
  const navigate = useNavigate()
  const [analyzingStates, setAnalyzingStates] = useState([
    { id: 'search', label: 'Preparing search queries', status: 'pending' },
    { id: 'maps', label: 'Investigating local businesses', status: 'pending' },
    { id: 'trends', label: 'Checking search-interest trends', status: 'pending' },
    { id: 'news', label: 'Gathering relevant news', status: 'pending' },
  ])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessIdea: "",
      city: "",
      budget: "",
      targetCustomer: ""
    }
  })

  const analyzeMutation = useMutation({
    mutationFn: analyzeMarket,
    onMutate: () => {
      setAnalyzingStates(s => s.map(x => ({ ...x, status: 'active' })))
    },
    onSuccess: (data: any) => {
      // update state randomly or just push
      toast.success("Analysis complete")
      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem('gapmap_reports') || '[]')
      saved.unshift(data)
      localStorage.setItem('gapmap_reports', JSON.stringify(saved))
      navigate(`/app/report/${data.reportId}`)
    },
    onError: (error: any) => {
      toast.error("Analysis failed. Please try again.")
      console.error(error)
      setAnalyzingStates(s => s.map(x => ({ ...x, status: 'pending' })))
    }
  })

  const fillExample = (idea: string, city: string) => {
    form.setValue("businessIdea", idea)
    form.setValue("city", city)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market Intelligence Workspace</h1>
        <p className="text-[#69766F] mt-2">Enter a business idea and location to start investigating the opportunity.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-[#69766F] py-1.5 mr-2">Examples:</span>
        {[
          { idea: "EV service center", city: "Indore" },
          { idea: "Specialty coffee shop", city: "Bhopal" },
          { idea: "Cloud kitchen", city: "Jaipur" },
          { idea: "Solar installation services", city: "Jodhpur" }
        ].map(ex => (
          <button 
            key={ex.idea}
            onClick={() => fillExample(ex.idea, ex.city)}
            className="text-xs bg-white border border-[#E0E5DF] hover:border-[#117C68] hover:text-[#117C68] px-3 py-1.5 rounded-full transition-colors"
          >
            {ex.idea} &middot; {ex.city}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Investigation Parameters</CardTitle>
              <CardDescription>Provide details about the opportunity you want to explore.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit((d) => analyzeMutation.mutate(d))} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="businessIdea">Business or Product Idea <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="businessIdea" placeholder="e.g. EV service center" className="pl-9" {...form.register("businessIdea")} />
                  </div>
                  {form.formState.errors.businessIdea && <p className="text-xs text-red-500">{form.formState.errors.businessIdea.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City / Target Geography <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="city" placeholder="e.g. Indore, Madhya Pradesh" className="pl-9" {...form.register("city")} />
                  </div>
                  {form.formState.errors.city && <p className="text-xs text-red-500">{form.formState.errors.city.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Investment Budget (INR) <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="budget" placeholder="e.g. 15,000,00" className="pl-9" {...form.register("budget")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetCustomer">Target Customer <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="targetCustomer" placeholder="e.g. EV owners" className="pl-9" {...form.register("targetCustomer")} />
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={analyzeMutation.isPending} className="w-full bg-[#117C68] hover:bg-[#0C5C4F] text-white">
                  {analyzeMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Investigating Market...
                    </>
                  ) : (
                    "Find Market Opportunities"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg">Analysis Status</h3>
          <div className="space-y-3">
            {analyzingStates.map((state, i) => (
              <motion.div 
                key={state.id}
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: analyzeMutation.isPending ? 1 : 0.5,
                  x: analyzeMutation.isPending && state.status === 'active' ? [0, 5, 0] : 0 
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${analyzeMutation.isPending ? 'bg-white border-[#E0E5DF] shadow-sm' : 'bg-transparent border-transparent'}`}
              >
                <div className={`h-2 w-2 rounded-full ${analyzeMutation.isPending ? 'bg-[#117C68] animate-pulse' : 'bg-[#E0E5DF]'}`} />
                <span className={`text-sm ${analyzeMutation.isPending ? 'text-[#17211F]' : 'text-[#69766F]'}`}>{state.label}</span>
              </motion.div>
            ))}
          </div>
          {analyzeMutation.isPending && (
            <div className="pt-4 text-xs text-[#69766F] italic">
              Gathering live intelligence from SerpApi engines...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
