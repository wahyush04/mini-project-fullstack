
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import { UserRole } from "../types/enum/role";


const formSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(1, "Password is required"),
});


type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const {
    authData,
    isLoading: authLoading,
    isError,
    errorMessage,
    status,
    login,
    reset
  } = useAuth();


  const onSubmit = (data: FormValues) => {
    login(data.email, data.password);
  };

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("pos", user.role)

    if (user.role === "student") {
      navigate("/pos");
    } else if (user.role === "admin") {
      navigate("/admin");
    }

    if (authData) {
      localStorage.setItem("user", JSON.stringify({
        email: authData.data.user.email,
        role: authData.data.user.data.role,
        name: authData.data.user.name,
        userId: authData.data.user.id,
        token: authData.data.token
      }));
  
      toast.success("Login successful!");
  
      if (authData.data.user.data.role === UserRole.ADMIN) {
        navigate("/admin");
      } else {
        navigate("/pos");
      }
    }

    if (isError) {
      toast.error(errorMessage);
    }

    reset();
  }, [authData, isError, errorMessage]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-pos-bg-light p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 w-full"
                disabled={authLoading}
              >
                {authLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground mt-4">
            <p>Don't have an account?</p>
            <Button variant="link" onClick={() => navigate("/register")}>Register here</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

