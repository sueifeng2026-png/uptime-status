export interface CheckResult {
  status: "up" | "down"
  statusCode: number | null
  responseMs: number
  error: string | null
}

export async function checkUrl(url: string, timeoutMs = 10000): Promise<CheckResult> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), timeoutMs)
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { "User-Agent": "UptimeStatus/1.0" },
    })
    clearTimeout(t)
    const responseMs = Date.now() - start
    const ok = res.status >= 200 && res.status < 500
    return {
      status: ok ? "up" : "down",
      statusCode: res.status,
      responseMs,
      error: ok ? null : `HTTP ${res.status}`,
    }
  } catch (e: unknown) {
    const responseMs = Date.now() - start
    const msg = e instanceof Error ? e.message : String(e)
    return { status: "down", statusCode: null, responseMs, error: msg }
  }
}
