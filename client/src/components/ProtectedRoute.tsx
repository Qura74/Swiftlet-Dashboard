import { Navigate } from "react-router-dom";

/**
 * Protects routes that require authentication.
 * Redirects to /sign-in if no valid token is found.
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");

  // 🚫 No token → kick user back to sign-in
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // ✅ Token exists → allow page render
  return <>{children}</>;
}
