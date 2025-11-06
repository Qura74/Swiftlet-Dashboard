import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import logo from "/images/wisma_logo.webp";
import { User, LockKeyhole, Eye, EyeClosed } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"DVS" | "ADMIN">("DVS");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setErrorDialogOpen(false);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", formData.username);

      // ✅ Redirect after successful login
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMessage(err.message || "An error occurred during login");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 bg-white">
        <CardContent className="p-8 space-y-6">
          {/* 🟦 Logo & Title */}
          <div className="text-center space-y-3">
            <img src={logo} alt="DVS Logo" className="mx-auto h-20" />
            <h2 className="text-2xl font-semibold text-blue-800">
              Swiftlet Monitoring System
            </h2>
            <p className="text-sm text-gray-600">
              Jabatan Perkhidmatan Veterinar Sabah
            </p>
          </div>

          {/* 🟩 Role Tabs */}
          <div className="flex justify-center gap-3 mt-4">
            {["DVS", "ADMIN"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r as "DVS" | "ADMIN")}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                  role === r
                    ? "bg-blue-100 text-blue-800 border-blue-300"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* 🟧 Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Username */}
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 text-black-400 w-5 h-5" />
              <Input
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="pl-10 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Username"
              />
            </div>

            {/* Password */}
            <div className="relative mt-1">
              <LockKeyhole className="absolute left-3 top-3 text-black-400 w-5 h-5" />
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="pl-10 pr-10 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, rememberMe: checked as boolean })
                }
              />
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Remember Me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white text-base py-3 rounded-full font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "SIGNING IN..." : `LOGIN AS ${role}`}
            </Button>

            <p className="text-center text-xs text-gray-500 mt-4">
              © 2025 Jabatan Perkhidmatan Veterinar Sabah. Hak Cipta Terpelihara.
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Login Failed</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setErrorDialogOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
