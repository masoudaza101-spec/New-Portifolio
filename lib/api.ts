import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(code: ErrorCode, message: string, status = 400) {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  );
}

export function unauthorized(message = "Authentication required.") {
  return fail("UNAUTHORIZED", message, 401);
}

export function rateLimited(message = "Too many requests. Please try again later.") {
  return fail("RATE_LIMITED", message, 429);
}

export function forbidden(message = "You do not have permission to do this.") {
  return fail("FORBIDDEN", message, 403);
}

export function notFound(message = "The requested resource was not found.") {
  return fail("NOT_FOUND", message, 404);
}

export function validationError(error: ZodError) {
  const first = error.issues[0];
  const message = first
    ? `${first.path.join(".") || "Request"}: ${first.message}`
    : "Invalid request.";
  return fail("VALIDATION_ERROR", message, 400);
}

export function internalError(error?: unknown) {
  console.error("[api] internal error", error);
  return fail("INTERNAL_ERROR", "Something went wrong.", 500);
}
