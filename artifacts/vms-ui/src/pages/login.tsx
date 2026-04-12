import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  userId: z.string().min(3, "User ID must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userId: "", password: "" },
  });

  function onSubmit() {
    setLocation("/dashboard");
  }

  const inputCls = "w-full bg-gray-100 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#ddeaf7" }}>
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4 shadow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Visitor Management</h1>
          <p className="text-xs text-gray-400 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">User ID</label>
            <input
              {...register("userId")}
              placeholder="Enter your User ID"
              className={inputCls}
              data-testid="input-userid"
            />
            {errors.userId && <p className="text-xs text-red-500 mt-1">{errors.userId.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className={inputCls}
              data-testid="input-password"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            data-testid="btn-login-submit"
            className="w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-blue-500 transition-colors">Return to Home</Link>
        </p>
      </div>
    </div>
  );
}
