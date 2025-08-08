import React, { useState } from "react"

const LeadForm: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!form.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!form.firstName) newErrors.firstName = "First name is required"
    if (!form.lastName) newErrors.lastName = "Last name is required"
    if (!form.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10,}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", form)
      setIsSubmitted(true)
      setTimeout(() => {
        setForm({
          email: "",
          firstName: "",
          lastName: "",
          company: "",
          phone: "",
        })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fields = [
    { label: "Email", name: "email", type: "email", required: true },
    { label: "First Name", name: "firstName", type: "text", required: true },
    { label: "Last Name", name: "lastName", type: "text", required: true },
    { label: "Company", name: "company", type: "text", required: false },
    { label: "Phone Number", name: "phone", type: "tel", required: true },
  ] as const

  return (
    <div className="mx-auto max-w-[360px] p-4">
      <h3 className="mb-4 text-center text-[20px] font-extrabold text-blue-600">
        Get A Live call From Nova AI
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1 block text-[12px] font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                className={[
                  "w-full rounded-md px-3 py-2 text-sm outline-none",
                  "border focus:ring-2 transition",
                  errors[field.name]
                    ? "border-red-500 focus:ring-red-200"
                    : "border-blue-300 focus:ring-blue-200",
                ].join(" ")}
                type={field.type}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                required={field.required}
              />
              {errors[field.name] && (
                <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-500 py-2 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-4 w-4 -ml-1 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send IT"
            )}
          </button>

          {isSubmitted && (
            <div className="mt-3 rounded-md border border-green-400 bg-green-100 p-2 text-center text-green-700 animate-[fade-in_0.5s_ease-out_forwards]">
              <p className="text-sm">✓ Form submitted successfully!</p>
              <p className="mt-1 text-xs">We'll contact you soon</p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default LeadForm;
