import { VisitorProvider } from "@/hooks/use-visitors";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layout";

// Page Imports
import Home from "@/pages/home";
import Login from "@/pages/login";
import CheckIn from "@/pages/checkin";
import Webcam from "@/pages/webcam";
import Dashboard from "@/pages/dashboard";
import Approval from "@/pages/approval";
import Schedule from "@/pages/schedule";
import PreviousVisits from "@/pages/previous-visits";

const queryClient = new QueryClient();

// Wrapper for pages that need the layout
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
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <LayoutRoute path="/checkin" component={CheckIn} />
      <LayoutRoute path="/webcam" component={Webcam} />
      <LayoutRoute path="/dashboard" component={Dashboard} />
      <LayoutRoute path="/approval" component={Approval} />
      <LayoutRoute path="/schedule" component={Schedule} />
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
