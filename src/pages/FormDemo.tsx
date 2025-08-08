import React, { useState } from "react"

type DemoForm = {
  firstName: string
  lastName: string
  email: string
  company: string
  teamSize: string
}

type Errors = Partial<Record<keyof DemoForm, string>>

const initialForm: DemoForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  teamSize: "",
}

export default function FormDemo() {
  const [form, setForm] = useState<DemoForm>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [resent, setResent] = useState(false)

  const validate = (): boolean => {
    const e: Errors = {}
    if (!form.firstName.trim()) e.firstName = "First name is required"
    if (!form.lastName.trim()) e.lastName = "Last name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email"
    // company and teamSize optional in the reference UI
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name as keyof DemoForm]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    // Simulate request
    await new Promise((r) => setTimeout(r, 1200))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleOpenEmailApp = () => {
    // Tries to open default mail client compose
    window.location.href = "mailto:"
  }

  const handleResend = async () => {
    setResent(false)
    await new Promise((r) => setTimeout(r, 600))
    setResent(true)
    setTimeout(() => setResent(false), 2000)
  }

  const Field = ({
    label,
    name,
    type = "text",
    placeholder,
    required,
  }: {
    label: string
    name: keyof DemoForm
    type?: string
    placeholder: string
    required?: boolean
  }) => (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className={[
          "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] outline-none transition",
          errors[name]
            ? "border-red-400 focus:ring-2 focus:ring-red-200"
            : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100",
        ].join(" ")}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen w-full bg-white">
      {!submitted ? (
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:pt-14">
          <h1 className="text-center text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            {"Get a full demo of"} <br className="hidden sm:block" /> {"how Blacksight works"}
          </h1>

          <div className="mx-auto mt-8 sm:mt-10 w-full rounded-3xl border border-blue-100 bg-gradient-to-br from-[#f6f9ff] to-white p-5 sm:p-8 shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-blue-600">
                Get a demo from our chatbot Agent
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill out the form below and we&apos;ll get you started with a personalized demo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field
                label="First Name"
                name="firstName"
                placeholder="Enter First Name"
                required
              />
              <Field
                label="Last Name"
                name="lastName"
                placeholder="Enter last Name"
                required
              />
              <Field
                label="Business Email"
                name="email"
                type="email"
                placeholder="Enter Email Address"
                required
              />
              <Field
                label="Company/ Business Name"
                name="company"
                placeholder="Enter Business or company’s name"
              />
              <Field
                label="Team Size"
                name="teamSize"
                placeholder="Market Team Size"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mx-auto block rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting…" : "Get Demo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Success view (matches demo2.PNG)
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center">
          {/* Badge */}
          <div className="relative mb-6">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-blue-50">
              <svg
                viewBox="0 0 48 48"
                className="h-16 w-16 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Badge squiggle */}
                <path d="M10 22c-1-8 6-14 14-14s15 7 14 16c-1 8-7 13-14 13-3 0-5-1-7-2" />
                {/* Check */}
                <path d="M16 26l6 6 12-14" />
              </svg>
            </div>
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-100" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">We have sent you a mail</h2>
          <p className="mt-1 text-sm text-gray-500">
            Please check your Inbox or Spam Folder
          </p>

          <button
            onClick={handleOpenEmailApp}
            className="mt-5 rounded-full bg-blue-600 px-5 py-2.5 text-white shadow-sm hover:bg-blue-700"
          >
            Open Email App
          </button>

          <button
            onClick={handleResend}
            className="mt-3 text-sm font-medium text-blue-600 hover:underline"
          >
            Resend Email
          </button>
          {resent && (
            <div className="mt-2 text-xs text-green-600">Resent! Check your inbox.</div>
          )}

          <p className="mt-8 text-xs text-gray-500">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <a
              className="text-blue-600 underline underline-offset-2"
              href="mailto:support@blacksight.ai"
            >
              contact support
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
