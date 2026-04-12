import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVisitors } from "@/hooks/use-visitors";

const checkinSchema = z.object({
  name: z.string().min(2, "Name is required"),
  aadhaar: z.string().length(12, "Aadhaar must be exactly 12 digits"),
  gender: z.string().min(1, "Please select gender"),
  meetWith: z.string().min(1, "Please select who you are meeting"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email address"),
  purpose: z.string().min(1, "Please enter purpose"),
  address: z.string().optional(),
});

type FormData = z.infer<typeof checkinSchema>;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-gray-500 mb-1 font-medium">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

export default function CheckIn() {
  const [, setLocation] = useLocation();
  const { addVisitor } = useVisitors();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(checkinSchema),
    defaultValues: { name: "", aadhaar: "", gender: "", meetWith: "", phone: "", email: "", purpose: "", address: "" },
  });

  function onSubmit(values: FormData) {
    addVisitor({ name: values.name, aadhaar: values.aadhaar, phone: values.phone, email: values.email, purpose: values.purpose, meetWith: values.meetWith });
    setLocation("/webcam");
  }

  const inputCls = "w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors";
  const selectCls = inputCls + " appearance-none cursor-pointer";

  return (
    <div className="min-h-screen flex" style={{ background: "#ddeaf7" }}>
      {/* Left — form */}
      <div className="flex-1 flex flex-col px-10 py-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-600">Fair Tech Services</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Check in</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel>Name</FieldLabel>
              <input {...register("name")} placeholder="Name" className={inputCls} data-testid="input-checkin-name" />
              <FieldError message={errors.name?.message} />
            </div>
            <div>
              <FieldLabel>National-ID</FieldLabel>
              <input {...register("aadhaar")} placeholder="Adhaar Number" className={inputCls} data-testid="input-checkin-aadhaar" />
              <FieldError message={errors.aadhaar?.message} />
            </div>
            <div>
              <FieldLabel>Gender</FieldLabel>
              <select {...register("gender")} className={selectCls} data-testid="select-checkin-gender">
                <option value="">--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <FieldError message={errors.gender?.message} />
            </div>
            <div>
              <FieldLabel>Meet With</FieldLabel>
              <select {...register("meetWith")} className={selectCls} data-testid="select-checkin-meetwith">
                <option value="">-- Select --</option>
                <option value="Alice Johnson">Alice Johnson (HR)</option>
                <option value="Bob Smith">Bob Smith (Engineering)</option>
                <option value="Carol White">Carol White (Management)</option>
                <option value="Reception">Reception</option>
              </select>
              <FieldError message={errors.meetWith?.message} />
            </div>
            <div>
              <FieldLabel>Phone No.</FieldLabel>
              <input {...register("phone")} placeholder="Phone No." className={inputCls} data-testid="input-checkin-phone" />
              <FieldError message={errors.phone?.message} />
            </div>
            <div>
              <FieldLabel>E-mail</FieldLabel>
              <input {...register("email")} type="email" placeholder="Email" className={inputCls} data-testid="input-checkin-email" />
              <FieldError message={errors.email?.message} />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel>Purpose</FieldLabel>
            <input {...register("purpose")} placeholder="purpose" className={inputCls} data-testid="input-checkin-purpose" />
            <FieldError message={errors.purpose?.message} />
          </div>

          <div className="mt-4">
            <FieldLabel>Address</FieldLabel>
            <input {...register("address")} placeholder="Address" className={inputCls} />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              data-testid="btn-checkin-submit"
              className="px-8 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              CHECK IN
            </button>
          </div>
        </form>
      </div>

      {/* Right — blue panel */}
      <div className="w-[42%] flex-shrink-0 flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2196f3 0%, #1565c0 100%)" }}>
        <div className="text-center text-white px-10 z-10">
          <h2 className="text-xl font-bold mb-2">Visitor Management System</h2>
          <p className="text-sm text-blue-100 italic mb-6">"Empowering Success Through Value."</p>
          <a href="/login"
            className="inline-block px-6 py-2 border-2 border-white text-white text-sm font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors"
          >
            LOG IN
          </a>
        </div>
        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-16 translate-y-16" />
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-12 -translate-y-12" />
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <svg viewBox="0 0 280 200" className="w-72 opacity-90" fill="none">
            {/* Simple desk illustration */}
            <rect x="60" y="130" width="160" height="12" rx="4" fill="rgba(255,255,255,0.3)" />
            <rect x="80" y="142" width="8" height="40" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x="192" y="142" width="8" height="40" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x="100" y="90" width="80" height="55" rx="4" fill="rgba(255,255,255,0.25)" />
            <rect x="105" y="96" width="70" height="40" rx="2" fill="rgba(255,255,255,0.3)" />
            <circle cx="175" cy="100" r="18" fill="rgba(255,255,255,0.2)" />
            <path d="M168 100 l5 5 l9-9" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
