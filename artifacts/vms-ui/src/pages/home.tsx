import { ShieldCheck, UserPlus, History, LogIn, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      
      <header className="flex items-center justify-between p-6 md:px-12 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">VMS Secure</span>
        </div>
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Admin Login
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-3xl text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Enterprise Visitor Management
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Secure, efficient, and professional visitor tracking for modern facilities. 
            Streamline your front desk operations and ensure workplace security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="group relative bg-card hover:bg-accent/50 border border-border hover:border-primary/50 transition-all duration-300 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Log In / Check-In</h3>
            <p className="text-muted-foreground text-sm flex-1 mb-8">
              Arriving visitors can quickly register their details and print a badge.
            </p>
            <Link href="/checkin">
              <Button className="w-full group/btn" data-testid="btn-home-checkin">
                Check In Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="group relative bg-card hover:bg-accent/50 border border-border hover:border-primary/50 transition-all duration-300 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Schedule Appointment</h3>
            <p className="text-muted-foreground text-sm flex-1 mb-8">
              Pre-register a visitor to speed up their arrival process and notify security.
            </p>
            <Link href="/schedule">
              <Button variant="outline" className="w-full group/btn" data-testid="btn-home-schedule">
                Schedule Visit
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="group relative bg-card hover:bg-accent/50 border border-border hover:border-primary/50 transition-all duration-300 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <History className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Previous Visits</h3>
            <p className="text-muted-foreground text-sm flex-1 mb-8">
              Returning visitors can look up past details for an expedited sign-in.
            </p>
            <Link href="/previous-visits">
              <Button variant="outline" className="w-full group/btn" data-testid="btn-home-history">
                View History
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border mt-auto relative z-10 bg-background/50 backdrop-blur">
        &copy; {new Date().getFullYear()} VMS Secure. All rights reserved.
      </footer>
    </div>
  );
}