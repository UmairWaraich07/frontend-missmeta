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

const VoterRegisterForm = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const registerUser = useRegisterUser();

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
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-semibold">
                  Fullname <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-semibold">
                  Username <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                    placeholder="Email"
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
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-semibold">
                  Date of Birth <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                    placeholder="Date of Birth"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-semibold">
                  Nationality
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                    placeholder="Nationality"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-semibold">
                  Country <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                    placeholder="Country"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-semibold">
                  State <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                    placeholder="State"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-semibold">
                  City <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="px-4 py-2 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-dark  bg-light text-dark rounded-md "
                    placeholder="City"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {registerUser.isError && (
            <div className="text-red-600">
              An error occurred: {registerUser.error.message}
            </div>
          )}

          <Button type="submit">Register</Button>
        </form>
      </Form>

      <div className="text-center mt-6 text-dark">
        Already have an account?{" "}
        <Link to="/login" className="text-gold hover:underline font-medium">
          Login now
        </Link>
      </div>
    </div>
  );
};

export default VoterRegisterForm;
