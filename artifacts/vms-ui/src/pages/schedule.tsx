import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";

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

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 60 52" width="32" height="27">
        <polygon points="30,2 58,50 2,50" fill="#2d6be4" />
        <polygon points="30,14 46,50 14,50" fill="#5b8cf5" />
        <polygon points="30,26 40,50 20,50" fill="#8db4fa" />
      </svg>
      <div>
        <p className="text-[8px] font-bold tracking-widest text-gray-400 uppercase leading-none">Fair Tech Services</p>
        <p className="text-sm font-bold text-gray-800 leading-tight">Visitor Management System</p>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

const FIELD_CLS = "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors";
const LABEL_CLS = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";
const ERR_CLS = "text-[11px] text-red-500 mt-1";

export default function Schedule() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", gender: "", phone: "", date: "", meetWith: "" },
  });

  function onSubmit() {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); reset(); }, 4000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">

      {/* Top Nav Bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo />
          <Link href="/" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-6">
          <Link href="/" className="flex items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors font-medium">
            <HomeIcon />
            <span>Home</span>
          </Link>
          <ChevronRight />
          <span className="text-gray-400 font-medium">Visitor</span>
          <ChevronRight />
          <span className="text-blue-600 font-semibold">Book Appointment</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="flex min-h-[580px]">

            {/* Left — Form */}
            <div className="flex-1 p-8">

              {/* Page heading */}
              <div className="flex items-center gap-2.5 mb-1">
                <CalendarIcon />
                <h1 className="text-xl font-bold text-gray-800">Book an Appointment</h1>
              </div>
              <p className="text-xs text-gray-400 mb-6 pl-7">Fill in the details below and we'll confirm your visit.</p>

              {/* Success banner */}
              {submitted && (
                <div className="mb-5 flex items-center gap-2.5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="text-xs font-semibold text-green-700">Appointment booked! A confirmation will be sent to your email.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Section: Personal Info */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3 border-b border-blue-100 pb-1.5">Personal Information</p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb-5">
                  <div>
                    <label className={LABEL_CLS}>Full Name</label>
                    <input {...register("name")} placeholder="e.g. John Doe" className={FIELD_CLS} />
                    {errors.name && <p className={ERR_CLS}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Email Address</label>
                    <input {...register("email")} type="email" placeholder="you@example.com" className={FIELD_CLS} />
                    {errors.email && <p className={ERR_CLS}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Phone Number</label>
                    <input {...register("phone")} placeholder="e.g. 555-0123" className={FIELD_CLS} />
                    {errors.phone && <p className={ERR_CLS}>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Gender</label>
                    <select {...register("gender")} className={FIELD_CLS}>
                      <option value="">-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className={ERR_CLS}>{errors.gender.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className={LABEL_CLS}>Address</label>
                    <input {...register("address")} placeholder="Street, City" className={FIELD_CLS} />
                  </div>
                </div>

                {/* Section: Appointment Details */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3 border-b border-blue-100 pb-1.5">Appointment Details</p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb-6">
                  <div>
                    <label className={LABEL_CLS}>Meet With</label>
                    <select {...register("meetWith")} className={FIELD_CLS}>
                      <option value="">-- Select Employee --</option>
                      <option value="Alice Johnson">Alice Johnson (HR)</option>
                      <option value="Bob Smith">Bob Smith (Engineering)</option>
                      <option value="Carol White">Carol White (Management)</option>
                      <option value="Reception">Reception</option>
                    </select>
                    {errors.meetWith && <p className={ERR_CLS}>{errors.meetWith.message}</p>}
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Purpose</label>
                    <input {...register("purpose")} placeholder="e.g. Interview, Meeting" className={FIELD_CLS} />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Date</label>
                    <input {...register("date")} type="date" className={FIELD_CLS} />
                    {errors.date && <p className={ERR_CLS}>{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Status</label>
                    <select {...register("status")} className={FIELD_CLS}>
                      <option value="">-- Select --</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Tentative">Tentative</option>
                    </select>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>From Time</label>
                    <input {...register("fromTime")} type="time" className={FIELD_CLS} />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>To Time</label>
                    <input {...register("toTime")} type="time" className={FIELD_CLS} />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Duration (hours)</label>
                    <input {...register("duration")} placeholder="e.g. 1.5" className={FIELD_CLS} />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    data-testid="btn-schedule-submit"
                    className="px-7 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold rounded-full shadow-sm shadow-blue-200 transition-all tracking-wide"
                  >
                    Confirm Appointment
                  </button>
                  <button
                    type="reset"
                    onClick={() => reset()}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm font-semibold rounded-full transition-all"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* Right — image panel */}
            <div className="hidden lg:flex w-56 flex-shrink-0 flex-col">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80"
                alt="Receptionist at front desk"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
