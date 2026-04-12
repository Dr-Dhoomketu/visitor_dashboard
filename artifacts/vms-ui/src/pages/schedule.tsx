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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-gray-500 mb-1 font-medium">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs text-red-500 mt-1">{message}</p> : null;
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

  const inputCls = "w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors";
  const selectCls = inputCls + " appearance-none cursor-pointer";

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "#ddeaf7" }}>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden flex">
        {/* Form side */}
        <div className="flex-1 p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-700 leading-none">Visitor Management System</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-5">Have an Appointement</h2>

          {submitted && (
            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
              Appointment booked successfully! A confirmation will be sent to your email.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <FieldLabel>Name</FieldLabel>
                <input {...register("name")} placeholder="Name" className={inputCls} />
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <FieldLabel>Select Employee</FieldLabel>
                <select {...register("meetWith")} className={selectCls}>
                  <option value="">--- Select ---</option>
                  <option value="Alice Johnson">Alice Johnson (HR)</option>
                  <option value="Bob Smith">Bob Smith (Engineering)</option>
                  <option value="Carol White">Carol White (Management)</option>
                  <option value="Reception">Reception</option>
                </select>
                <FieldError message={errors.meetWith?.message} />
              </div>
              <div>
                <FieldLabel>E-mail</FieldLabel>
                <input {...register("email")} type="email" placeholder="E-mail" className={inputCls} />
                <FieldError message={errors.email?.message} />
              </div>
              <div>
                <FieldLabel>Phone No.</FieldLabel>
                <input {...register("phone")} placeholder="Phone No." className={inputCls} />
                <FieldError message={errors.phone?.message} />
              </div>
              <div>
                <FieldLabel>Gender</FieldLabel>
                <select {...register("gender")} className={selectCls}>
                  <option value="">--Select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <FieldError message={errors.gender?.message} />
              </div>
              <div>
                <FieldLabel>Date</FieldLabel>
                <input {...register("date")} type="date" placeholder="Date" className={inputCls} />
                <FieldError message={errors.date?.message} />
              </div>
              <div>
                <FieldLabel>From Time</FieldLabel>
                <input {...register("fromTime")} type="time" className={inputCls} />
              </div>
              <div>
                <FieldLabel>To Time</FieldLabel>
                <input {...register("toTime")} type="time" className={inputCls} />
              </div>
              <div>
                <FieldLabel>Duration</FieldLabel>
                <input {...register("duration")} placeholder="Hours" className={inputCls} />
              </div>
              <div>
                <FieldLabel>Status</FieldLabel>
                <select {...register("status")} className={selectCls}>
                  <option value="">--Select--</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Tentative">Tentative</option>
                </select>
              </div>
              <div>
                <FieldLabel>Purpose</FieldLabel>
                <input {...register("purpose")} placeholder="Purpose" className={inputCls} />
              </div>
              <div>
                <FieldLabel>Address</FieldLabel>
                <input {...register("address")} placeholder="Address" className={inputCls} />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                data-testid="btn-schedule-submit"
                className="px-8 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        {/* Image side */}
        <div className="w-64 flex-shrink-0">
          <img
            src={scheduleImg}
            alt="Reception"
            className="w-full h-full object-cover"
            style={{ minHeight: 420 }}
          />
        </div>
      </div>
    </div>
  );
}
