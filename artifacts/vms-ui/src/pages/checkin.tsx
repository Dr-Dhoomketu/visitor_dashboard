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

function FairTechLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 60 52" width="32" height="28">
        <polygon points="30,2 58,50 2,50" fill="#2d6be4" />
        <polygon points="30,14 46,50 14,50" fill="#5b8cf5" />
        <polygon points="30,26 40,50 20,50" fill="#8db4fa" />
      </svg>
      <p style={{ fontSize: 8, letterSpacing: 1, color: "#555", fontWeight: 700, textTransform: "uppercase" }}>
        FAIR TECH SERVICES
      </p>
    </div>
  );
}

/* SVG illustration – person at a computer desk */
function DeskIllustration() {
  return (
    <svg viewBox="0 0 340 260" width="100%" height="100%" style={{ maxWidth: 320 }}>
      {/* Monitor */}
      <rect x="110" y="60" width="120" height="85" rx="6" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <rect x="116" y="66" width="108" height="70" rx="3" fill="rgba(255,255,255,0.15)" />
      {/* Screen content */}
      <circle cx="170" cy="90" r="14" fill="rgba(255,255,255,0.5)" />
      <polygon points="164,84 164,96 178,90" fill="#1976d2" />
      {/* Monitor stand */}
      <rect x="164" y="145" width="12" height="16" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="154" y="160" width="32" height="5" rx="2" fill="rgba(255,255,255,0.3)" />
      {/* Desk */}
      <rect x="50" y="165" width="240" height="12" rx="4" fill="rgba(255,255,255,0.35)" />
      <rect x="70" y="177" width="10" height="55" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="260" y="177" width="10" height="55" rx="3" fill="rgba(255,255,255,0.2)" />
      {/* Plant */}
      <rect x="68" y="142" width="6" height="22" rx="2" fill="rgba(255,255,255,0.3)" />
      <ellipse cx="71" cy="138" rx="10" ry="8" fill="rgba(129,199,132,0.7)" />
      <ellipse cx="65" cy="133" rx="7" ry="6" fill="rgba(102,187,106,0.7)" />
      <ellipse cx="77" cy="133" rx="7" ry="6" fill="rgba(102,187,106,0.7)" />
      {/* Coffee mug */}
      <rect x="248" y="147" width="18" height="17" rx="3" fill="rgba(255,255,255,0.4)" />
      <path d="M266 152 Q274 152 274 158 Q274 164 266 164" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
      {/* Person body */}
      <ellipse cx="230" cy="162" rx="22" ry="6" fill="rgba(255,255,255,0.15)" />
      {/* Chair */}
      <rect x="215" y="162" width="30" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
      <rect x="227" y="168" width="6" height="22" rx="2" fill="rgba(255,255,255,0.2)" />
      {/* Person torso */}
      <rect x="214" y="115" width="32" height="40" rx="10" fill="#42a5f5" />
      {/* Arm reaching to keyboard */}
      <path d="M214 130 Q190 145 175 155" stroke="#42a5f5" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Keyboard */}
      <rect x="148" y="155" width="45" height="10" rx="3" fill="rgba(255,255,255,0.3)" />
      {/* Head */}
      <circle cx="230" cy="100" r="20" fill="#ffcc80" />
      {/* Hair */}
      <path d="M211 96 Q215 78 230 78 Q245 78 249 96 Q245 85 230 85 Q215 85 211 96Z" fill="#5d4037" />
      {/* Ponytail */}
      <path d="M248 90 Q258 88 260 98 Q258 106 250 108" stroke="#5d4037" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Face */}
      <circle cx="224" cy="102" r="2" fill="#5d4037" />
      <circle cx="236" cy="102" r="2" fill="#5d4037" />
      <path d="M224 110 Q230 114 236 110" stroke="#e65100" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function CheckIn() {
  const [, setLocation] = useLocation();
  const { addVisitor } = useVisitors();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(checkinSchema),
    defaultValues: { name: "", aadhaar: "", gender: "", meetWith: "", phone: "", email: "", purpose: "", address: "" },
  });

  function onSubmit(values: FormData) {
    addVisitor({
      name: values.name, aadhaar: values.aadhaar, phone: values.phone,
      email: values.email, purpose: values.purpose, meetWith: values.meetWith,
    });
    setLocation("/webcam");
  }

  const inp: React.CSSProperties = {
    display: "block", width: "100%", background: "#f0f4f8",
    border: "1px solid #dce4ef", borderRadius: 20, padding: "8px 16px",
    fontSize: 13, color: "#374151", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4f8" }}>
      {/* Left — form */}
      <div style={{ flex: 1, padding: "32px 40px 32px 48px" }}>
        <div style={{ marginBottom: 20 }}><FairTechLogo /></div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a202c", marginBottom: 22 }}>Check in</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
            {[
              { label: "Name", name: "name", placeholder: "Name", type: "text", testId: "input-checkin-name" },
              { label: "National-ID", name: "aadhaar", placeholder: "Adhaar Number", type: "text", testId: "input-checkin-aadhaar" },
            ].map(({ label, name, placeholder, type, testId }) => (
              <div key={name}>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{label}</label>
                <input {...register(name as any)} placeholder={placeholder} type={type} style={inp} data-testid={testId} />
                {(errors as any)[name] && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{(errors as any)[name].message}</p>}
              </div>
            ))}

            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Gender</label>
              <select {...register("gender")} data-testid="select-checkin-gender" style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                <option value="">--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.gender.message}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Meet With</label>
              <select {...register("meetWith")} data-testid="select-checkin-meetwith" style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                <option value="">-- Select --</option>
                <option value="Alice Johnson">Alice Johnson (HR)</option>
                <option value="Bob Smith">Bob Smith (Engineering)</option>
                <option value="Carol White">Carol White (Management)</option>
                <option value="Reception">Reception</option>
              </select>
              {errors.meetWith && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.meetWith.message}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Phone No.</label>
              <input {...register("phone")} placeholder="Phone No." style={inp} data-testid="input-checkin-phone" />
              {errors.phone && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.phone.message}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>E-mail</label>
              <input {...register("email")} type="email" placeholder="Email" style={inp} data-testid="input-checkin-email" />
              {errors.email && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.email.message}</p>}
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Purpose</label>
            <input {...register("purpose")} placeholder="purpose" style={inp} data-testid="input-checkin-purpose" />
            {errors.purpose && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.purpose.message}</p>}
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Address</label>
            <input {...register("address")} placeholder="Address" style={inp} />
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              type="submit"
              data-testid="btn-checkin-submit"
              style={{ padding: "9px 28px", background: "#2d6be4", color: "white", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}
            >
              CHECK IN
            </button>
          </div>
        </form>
      </div>

      {/* Right — blue gradient panel with original SVG illustration */}
      <div
        style={{
          width: "43%", flexShrink: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-start", paddingTop: 60,
          background: "linear-gradient(150deg, #42a5f5 0%, #1565c0 60%, #0d47a1 100%)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", top: 120, left: -30, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ textAlign: "center", color: "white", zIndex: 1, padding: "0 32px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Visitor Management System</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontStyle: "italic", marginBottom: 24 }}>"Empowering Success Through Value."</p>
          <a
            href="/login"
            style={{
              display: "inline-block", padding: "9px 28px", border: "2px solid white",
              borderRadius: 30, color: "white", fontSize: 13, fontWeight: 600,
              textDecoration: "none", letterSpacing: 1,
            }}
          >
            LOG IN
          </a>
        </div>

        {/* SVG Illustration */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <DeskIllustration />
        </div>
      </div>
    </div>
  );
}
