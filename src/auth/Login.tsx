import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validations";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/authSlice";
import { useLoginUser } from "@/tanstack/userQueries";
import { useCheckSubscription } from "@/tanstack/stripeQueries";
import { RootState } from "@/store/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useLoginUser();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { data: subscriptionStatus } = useCheckSubscription(userData?._id);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;

    const response = await loginUser.mutateAsync({ email, password });

    if (response?.success) {
      // store the data in redux
      const user = response.data?.user;
      dispatch(login(user));

      if (!user.phoneVerified) {
        navigate("/verify");
      } else {
        if (user.role === "contestant") {
          console.log({ subscriptionStatus });
          if (!subscriptionStatus?.data) {
            console.log("PAYMENT IS REQUIRED");
            navigate("/payment");
          }
        } else {
          navigate("/");
        }
      }
    }
  }
  return (
    <div className="w-full grid place-content-center min-h-screen p-6">
      <div className=" w-[450px] max-sm:w-full">
        <div className="w-full flex items-center justify-center ">
          <Logo />
        </div>
        <div className="text-dark dark:text-light text-3xl font-bold text-center">
          Login to your account
        </div>
        <p className="text-gray dark:text-light/80 font-inter mt-2 text-center">
          Welcome back! Please enter your details
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-semibold">
                    Email <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-semibold">
                    Password <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>

        <div className="text-center text-dark dark:text-light mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/registerchoice"
            className="text-gold hover:underline font-medium"
          >
            Create one new
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
