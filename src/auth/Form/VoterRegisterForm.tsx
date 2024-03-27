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
import { voterRegisterSchema } from "@/lib/validations";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/api/userApi";
import { useRegisterUser } from "@/tanstack/userQueries";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

const VoterRegisterForm = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const registerUser = useRegisterUser();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof voterRegisterSchema>>({
    resolver: zodResolver(voterRegisterSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      dateOfBirth: "",
      nationality: "",
      country: "",
      state: "",
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof voterRegisterSchema>) {
    console.log(values);
    const response = await registerUser.mutateAsync({ userData: values, role });
    console.log("REGISTER", response);

    if (response?.success) {
      const { username, email, password } = values;

      const response = await loginUser({ username, email, password });
      // after logging the user in dispatch their info
      dispatch(login(response?.data.user));
      if (response?.success) {
        console.log("USER LOGGED IN", response.data);
        navigate("/verify");
      }
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-7"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Email <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Fullname <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Username <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Password <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Date of Birth <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Nationality</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="text-primary-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Country <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  State <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  City <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          {registerUser.isError && (
            <div className="text-red">
              An error occurred: {registerUser.error.message}
            </div>
          )}

          <Button
            type="submit"
            className="primary-gradient w-full !text-light-900 gap-1.5"
            disabled={registerUser.isPending}
          >
            Register
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6 text-dark-100">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary-500 hover:underline font-medium"
        >
          Login now
        </Link>
      </div>
    </div>
  );
};

export default VoterRegisterForm;
