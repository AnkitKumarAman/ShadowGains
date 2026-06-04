
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Get the tab from the URL query params
  const queryParams = new URLSearchParams(location.search);
  const defaultTab = queryParams.get('tab') === 'signup' ? 'signup' : 'signin';

  // Redirect to home if already logged in (and not currently on the update password screen)
  useEffect(() => {
    if (!authLoading && isAuthenticated && queryParams.get('tab') !== 'update-password') {
      navigate("/");
    }
  }, [isAuthenticated, authLoading, location.search, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?tab=update-password`,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Check your email for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?tab=update-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Reset link sent!",
        description: "Please check your email inbox for the recovery link.",
      });
      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message || "An error occurred during password reset",
        variant: "destructive",
      });
      console.error("Password reset error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated!",
        description: "Your password has been successfully updated. You are now logged in.",
      });
      
      setShowForgotPassword(false);
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "An error occurred during password update",
        variant: "destructive",
      });
      console.error("Password update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="section-container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Account Access</h1>
              <p className="text-white/90 text-lg">
                Login or create an account to track your fitness journey
              </p>
            </div>
          </div>
        </div>
        
        <div className="section-container py-12">
          <div className="max-w-md mx-auto">
            {queryParams.get('tab') === 'update-password' ? (
              <Card className="border-2 border-muted shadow-lg">
                <CardHeader>
                  <CardTitle>Update Password</CardTitle>
                  <CardDescription>
                    {!authLoading && !isAuthenticated 
                      ? "Your recovery session has expired or is invalid."
                      : "Enter your new password below"
                    }
                  </CardDescription>
                </CardHeader>
                {!authLoading && !isAuthenticated ? (
                  <CardContent className="space-y-4 pt-2">
                    <p className="text-sm text-muted-foreground">
                      For security reasons, password recovery links are temporary. Please request a new recovery link.
                    </p>
                    <Button 
                      type="button" 
                      className="w-full mt-4"
                      onClick={() => {
                        setShowForgotPassword(true);
                        navigate("/auth");
                      }}
                    >
                      Request New Link
                    </Button>
                  </CardContent>
                ) : (
                  <form onSubmit={handleUpdatePassword}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          min={6}
                          placeholder="Min 6 characters"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={loading || authLoading}>
                        {loading || authLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </CardFooter>
                  </form>
                )}
              </Card>
            ) : showForgotPassword ? (
              <Card className="border-2 border-muted shadow-lg">
                <CardHeader>
                  <CardTitle>Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email address and we'll send you a recovery link
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleResetPassword}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input 
                        id="reset-email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Back to Sign In
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            ) : (
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="signin" className="text-lg py-3">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="text-lg py-3">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <Card className="border-2 border-muted shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LogIn className="h-5 w-5 text-primary" />
                        Sign In
                      </CardTitle>
                      <CardDescription>
                        Enter your credentials to access your account
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSignIn}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <Input 
                            id="signin-email" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="signin-password">Password</Label>
                            <button
                              type="button"
                              onClick={() => setShowForgotPassword(true)}
                              className="text-xs text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
                            >
                              Forgot Password?
                            </button>
                          </div>
                          <Input 
                            id="signin-password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Signing in..." : "Sign In"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
                
                <TabsContent value="signup">
                  <Card className="border-2 border-muted shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-primary" />
                        Create Account
                      </CardTitle>
                      <CardDescription>
                        Sign up to start tracking your fitness journey
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSignUp}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input 
                            id="signup-email" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input 
                            id="signup-password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            min={6}
                          />
                          <p className="text-xs text-muted-foreground">
                            Password must be at least 6 characters
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Creating account..." : "Create Account"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
