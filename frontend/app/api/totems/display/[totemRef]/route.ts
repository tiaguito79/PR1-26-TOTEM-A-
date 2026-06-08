import connectDB from "@/lib/mongodb"
import { corsJson, corsPreflightResponse } from "@/lib/cors"
import { AuthError } from "@/lib/auth.server"
import { authorizeTotemDisplayAccess } from "@/lib/totem-display-access.server"
import { buildTotemDisplayResponse } from "@/lib/totem-display-response.server"

export const runtime = "nodejs"

type RouteContext = { params: Promise<{ totemRef: string }> }

export async function OPTIONS() {
  return corsPreflightResponse()
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    await connectDB()
    const { totemRef } = await params

    await authorizeTotemDisplayAccess(request, totemRef)

    const payload = await buildTotemDisplayResponse(totemRef)
    if (!payload) {
      return corsJson({ error: "Tótem no encontrado" }, { status: 404 })
    }

    return corsJson(payload)
  } catch (error) {
    if (error instanceof AuthError) {
      return corsJson({ error: error.message }, { status: error.status })
    }
    console.error("Error GET totem display:", error)
    const msg = error instanceof Error ? error.message : "Error obteniendo datos del tótem"
    return corsJson({ error: msg }, { status: 500 })
  }
}
