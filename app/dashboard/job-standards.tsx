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

const formSchema = z.object({
  scoreExpectation: z
    .string()
    .min(1, "Score expectation is required")
    .regex(/^\d+$/, "Score expectation must be numeric"),
})

export default function JobStandardsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { scoreExpectation: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/job-standards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    if (!res.ok) throw new Error("Failed to save job standards")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Set Job Standards</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="scoreExpectation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score Expectation</FormLabel>
                <FormControl>
                  <Input
                    data-testid="score-expectation-input"
                    placeholder="Enter score expectation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" data-testid="save-job-standards-btn">
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}
