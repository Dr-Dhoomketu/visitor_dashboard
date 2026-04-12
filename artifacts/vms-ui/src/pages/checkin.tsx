import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVisitors } from "@/hooks/use-visitors";
import checkinImg from "@assets/image_1776014073684.png";

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
      <div>
        <p style={{ fontSize: 8, letterSpacing: 1, color: "#555", fontWeight: 700, textTransform: "uppercase", lineHeight: 1 }}>
          FAIR TECH SERVICES
        </p>
      </div>
    </div>
  );
}

export default function CheckIn() {
  const [, setLocation] = useLocation();
  const { addVisitor } = useVisitors();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(checkinSchema),
    defaultValues: { name: "", aadhaar: "", gender: "", meetWith: "", phone: "", email: "", purpose: "", address: "" },
  });

  function onSubmit(values: FormData) {
    addVisitor({
      name: values.name,
      aadhaar: values.aadhaar,
      phone: values.phone,
      email: values.email,
      purpose: values.purpose,
      meetWith: values.meetWith,
    });
    setLocation("/webcam");
  }

  const inp = {
    style: {
      display: "block",
      width: "100%",
      background: "#f0f4f8",
      border: "1px solid #dce4ef",
      borderRadius: 20,
      padding: "8px 16px",
      fontSize: 13,
      color: "#374151",
      outline: "none",
    } as React.CSSProperties,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4f8" }}>
      {/* Left — form */}
      <div style={{ flex: 1, padding: "32px 40px 32px 48px" }}>
        <div style={{ marginBottom: 20 }}>
          <FairTechLogo />
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a202c", marginBottom: 22 }}>Check in</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Name</label>
              <input {...register("name")} placeholder="Name" {...inp} data-testid="input-checkin-name" />
              {errors.name && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.name.message}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>National-ID</label>
              <input {...register("aadhaar")} placeholder="Adhaar Number" {...inp} data-testid="input-checkin-aadhaar" />
              {errors.aadhaar && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.aadhaar.message}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Gender</label>
              <select
                {...register("gender")}
                data-testid="select-checkin-gender"
                style={{ ...inp.style, appearance: "none", cursor: "pointer" }}
              >
                <option value="">--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.gender.message}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Meet With</label>
              <select
                {...register("meetWith")}
                data-testid="select-checkin-meetwith"
                style={{ ...inp.style, appearance: "none", cursor: "pointer" }}
              >
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
              <input {...register("phone")} placeholder="Phone No." {...inp} data-testid="input-checkin-phone" />
              {errors.phone && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.phone.message}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>E-mail</label>
              <input {...register("email")} type="email" placeholder="Email" {...inp} data-testid="input-checkin-email" />
              {errors.email && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.email.message}</p>}
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Purpose</label>
            <input {...register("purpose")} placeholder="purpose" {...inp} data-testid="input-checkin-purpose" />
            {errors.purpose && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.purpose.message}</p>}
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Address</label>
            <input {...register("address")} placeholder="Address" {...inp} />
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              type="submit"
              data-testid="btn-checkin-submit"
              style={{
                padding: "9px 28px",
                background: "#2d6be4",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              CHECK IN
            </button>
          </div>
        </form>
      </div>

      {/* Right — reference screenshot panel (shows the illustration portion) */}
      <div
        style={{
          width: "43%",
          flexShrink: 0,
          backgroundImage: `url(${checkinImg})`,
          backgroundSize: "230% auto",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
