"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const formSchema = z.object({
  scenarioName: z.string().min(1, "Scenario Name is required"),
})

export default function ScenarioManagementPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { scenarioName: "" },
  })

  const [successMessage, setSuccessMessage] = useState("")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    if (res.ok) {
      setSuccessMessage("Scenario saved successfully")
    } else {
      setSuccessMessage("Failed to save scenario")
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scenario Management</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="scenarioName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scenario Name</FormLabel>
                <FormControl>
                  <Input data-testid="scenario-name-input" placeholder="Enter scenario name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" data-testid="save-scenario-btn">Save Scenario</Button>
        </form>
      </Form>
      {successMessage && <p role="alert" className="mt-4 text-green-600">{successMessage}</p>}
    </div>
  )
}
