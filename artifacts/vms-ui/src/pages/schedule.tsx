import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import scheduleImg from "@assets/image_1776014103293.png";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  gender: z.string().min(1, "Select gender"),
  phone: z.string().min(10, "Valid phone required"),
  date: z.string().min(1, "Date required"),
  fromTime: z.string().optional(),
  toTime: z.string().optional(),
  duration: z.string().optional(),
  status: z.string().optional(),
  purpose: z.string().optional(),
  address: z.string().optional(),
  meetWith: z.string().min(1, "Select employee"),
});

type FormData = z.infer<typeof schema>;

function FairTechLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 60 52" width="34" height="28">
        <polygon points="30,2 58,50 2,50" fill="#2d6be4" />
        <polygon points="30,14 46,50 14,50" fill="#5b8cf5" />
        <polygon points="30,26 40,50 20,50" fill="#8db4fa" />
      </svg>
      <div>
        <p style={{ fontSize: 7.5, letterSpacing: 1, color: "#555", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, margin: 0 }}>FAIR TECH SERVICES</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#1a202c", margin: 0 }}>Visitor Management System</p>
      </div>
    </div>
  );
}

export default function Schedule() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", gender: "", phone: "", date: "", meetWith: "" },
  });

  function onSubmit() {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); reset(); }, 3000);
  }

  const inp: React.CSSProperties = {
    display: "block",
    width: "100%",
    background: "#f0f4f8",
    border: "1px solid #dce4ef",
    borderRadius: 4,
    padding: "6px 10px",
    fontSize: 12.5,
    color: "#374151",
    outline: "none",
    boxSizing: "border-box",
  };

  const selInp: React.CSSProperties = { ...inp, appearance: "none" as any, cursor: "pointer" };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", padding: "24px 16px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", display: "flex" }}>
        {/* Form side */}
        <div style={{ flex: 1, padding: "28px 36px" }}>
          <div style={{ marginBottom: 18 }}>
            <FairTechLogo />
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a202c", marginBottom: 18 }}>Have an Appointement</h2>

          {submitted && (
            <div style={{ marginBottom: 14, padding: "10px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 6, fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
              Appointment booked! A confirmation will be sent to your email.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Name</label>
                <input {...register("name")} placeholder="Name" style={inp} />
                {errors.name && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.name.message}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Select Employee</label>
                <select {...register("meetWith")} style={selInp}>
                  <option value="">--- Select ---</option>
                  <option value="Alice Johnson">Alice Johnson (HR)</option>
                  <option value="Bob Smith">Bob Smith (Engineering)</option>
                  <option value="Carol White">Carol White (Management)</option>
                  <option value="Reception">Reception</option>
                </select>
                {errors.meetWith && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.meetWith.message}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>E-mail</label>
                <input {...register("email")} type="email" placeholder="E-mail" style={inp} />
                {errors.email && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.email.message}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Phone No.</label>
                <input {...register("phone")} placeholder="Phone No." style={inp} />
                {errors.phone && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.phone.message}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Gender</label>
                <select {...register("gender")} style={selInp}>
                  <option value="">--Select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.gender.message}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Date</label>
                <input {...register("date")} type="date" style={inp} />
                {errors.date && <p style={{ fontSize: 10, color: "#ef4444", marginTop: 2 }}>{errors.date.message}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>From Time</label>
                <input {...register("fromTime")} type="time" style={inp} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>To Time</label>
                <input {...register("toTime")} type="time" style={inp} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Duration</label>
                <input {...register("duration")} placeholder="Hours" style={inp} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Status</label>
                <select {...register("status")} style={selInp}>
                  <option value="">--Select--</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Tentative">Tentative</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Purpose</label>
                <input {...register("purpose")} placeholder="Purpose" style={inp} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Address</label>
                <input {...register("address")} placeholder="Address" style={inp} />
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <button
                type="submit"
                data-testid="btn-schedule-submit"
                style={{
                  padding: "9px 28px",
                  background: "#2d6be4",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 1,
                }}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        {/* Right — photo */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <img
            src={scheduleImg}
            alt="Reception"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
      </div>
    </div>
  );
}
