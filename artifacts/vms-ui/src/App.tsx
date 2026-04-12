import { VisitorProvider } from "@/hooks/use-visitors";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layout";

import Home from "@/pages/home";
import Login from "@/pages/login";
import CheckIn from "@/pages/checkin";
import Webcam from "@/pages/webcam";
import Dashboard from "@/pages/dashboard";
import Approval from "@/pages/approval";
import Schedule from "@/pages/schedule";
import PreviousVisits from "@/pages/previous-visits";

const queryClient = new QueryClient();

const LayoutRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest}>
    {(params) => (
      <MainLayout>
        <Component params={params} />
      </MainLayout>
    )}
  </Route>
);

function Router() {
  return (
    <Switch>
      {/* Public full-screen pages — no sidebar */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/checkin" component={CheckIn} />
      <Route path="/webcam" component={Webcam} />
      <Route path="/schedule" component={Schedule} />

      {/* Admin pages — with sidebar */}
      <LayoutRoute path="/dashboard" component={Dashboard} />
      <LayoutRoute path="/approval" component={Approval} />
      <LayoutRoute path="/previous-visits" component={PreviousVisits} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VisitorProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </VisitorProvider>
    </QueryClientProvider>
  );
}

export default App;
