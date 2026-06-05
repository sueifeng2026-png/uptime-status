"use client"

import { useState, useEffect, useCallback } from "react"

interface Service {
  id: string
  name: string
  url: string
  description: string | null
  status: string
  lastChecked: string | null
  responseMs: number | null
}

export default function AdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: "", url: "", description: "" })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const fetchServices = useCallback(async () => {
    const res = await fetch("/api/services")
    const data = await res.json()
    setServices(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchServices() }, [fetchServices])

  const showMsg = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(""), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.url) return showMsg("Name and URL are required")

    if (editingId) {
      await fetch(`/api/services/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      showMsg("Service updated")
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      showMsg("Service added")
    }

    setForm({ name: "", url: "", description: "" })
    setEditingId(null)
    fetchServices()
  }

  const handleEdit = (svc: Service) => {
    setForm({ name: svc.name, url: svc.url, description: svc.description || "" })
    setEditingId(svc.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return
    await fetch(`/api/services/${id}`, { method: "DELETE" })
    showMsg("Service deleted")
    fetchServices()
  }

  const handleCheck = async (id: string) => {
    showMsg("Running check...")
    await fetch("/api/checks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId: id }),
    })
    fetchServices()
    showMsg("Check completed")
  }

  const handleCheckAll = async () => {
    showMsg("Checking all services...")
    await fetch("/api/cron")
    fetchServices()
    showMsg("All checks completed")
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your monitored services</p>
        </div>
        <a href="/status" className="text-sm text-blue-400 hover:underline">
          View Status Page &rarr;
        </a>
      </div>

      {/* Toast */}
      {message && (
        <div className="fixed top-4 right-4 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <h2 className="font-semibold mb-4">{editingId ? "Edit Service" : "Add Service"}</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Service name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium"
            >
              {editingId ? "Update" : "Add Service"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setForm({ name: "", url: "", description: "" }) }}
                className="bg-gray-700 hover:bg-gray-600 text-sm px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Service list */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Services ({services.length})</h2>
        <button
          onClick={handleCheckAll}
          className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg"
          disabled={services.length === 0}
        >
          Check All
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <div key={svc.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{svc.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{svc.url}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    svc.status === "up"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : svc.status === "down"
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }`}
                >
                  {svc.status}
                </span>
              </div>
              {svc.responseMs != null && (
                <p className="text-xs text-gray-500 mt-1">Response: {svc.responseMs}ms</p>
              )}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleCheck(svc.id)}
                  className="text-xs bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-800/30"
                >
                  Check Now
                </button>
                <button
                  onClick={() => handleEdit(svc)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(svc.id)}
                  className="text-xs bg-red-900/30 hover:bg-red-800/30 text-red-400 px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
