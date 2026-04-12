import { useState } from "react";
import { useLocation } from "wouter";
import { Camera, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Webcam() {
  const [, setLocation] = useLocation();
  const [captured, setCaptured] = useState(false);
  const { toast } = useToast();

  const handleCapture = () => {
    setCaptured(true);
    toast({
      title: "Photo Captured",
      description: "Visitor photo successfully saved to record.",
    });
  };

  const handleProceed = () => {
    setLocation("/dashboard");
    toast({
      title: "Check-In Complete",
      description: "Visitor has been successfully registered and is pending approval.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Capture Photo</h2>
        <p className="text-muted-foreground">Please capture a clear photo of the visitor for their badge.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Camera Preview</CardTitle>
          <CardDescription>Ensure the visitor's face is clearly visible and well-lit.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8">
          
          {/* Fake Webcam View */}
          <div className="w-full max-w-lg aspect-video bg-muted border-2 border-border border-dashed rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
            {captured ? (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-foreground">Photo Captured!</h3>
              </div>
            ) : (
              <>
                <Camera className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <span className="text-muted-foreground font-medium">Camera Active</span>
                <span className="text-xs text-muted-foreground/70">Align face within frame</span>
              </>
            )}
          </div>

          <div className="flex gap-4 w-full max-w-lg">
            {!captured ? (
              <Button 
                onClick={handleCapture} 
                className="w-full h-12 text-base" 
                data-testid="btn-capture-photo"
              >
                <Camera className="mr-2 h-5 w-5" />
                Capture Photo
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setCaptured(false)} 
                  className="flex-1 h-12"
                  data-testid="btn-retake-photo"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
                <Button 
                  onClick={handleProceed} 
                  className="flex-1 h-12"
                  data-testid="btn-proceed-checkin"
                >
                  Proceed
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}