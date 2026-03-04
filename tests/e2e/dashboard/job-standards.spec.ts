import { test, expect } from "@playwright/test"

test.describe("Job Standards", () => {
  test("should set job standards successfully", async ({ page }) => {
    await page.goto("/dashboard/job-standards")

    // Fill in the score expectation
    await page.getByTestId("score-expectation-input").fill("85")

    // Submit the form
    await page.getByTestId("save-job-standards-btn").click()

    // Check for success alert
    await expect(page.getByText("Job standards saved successfully")).toBeVisible()
  })
})
