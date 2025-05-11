"use client";

// zod modules
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// react modules
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// shadcn modules
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { authApi } from "@/api/auth";
import FitnessPic from "../assets/image/fitness_pic.png";
import Footer from "../components/Footer";

// zod schema
const formSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name is required." }),
    lastname: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function RegisterTwo() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { firstname, lastname, email, password } = values;
      const payload = {
        first_name: firstname,
        last_name: lastname,
        email,
        password,
      };
      await authApi("/users/register/", payload);
      console.log("Registration successful:", values);
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
        {/* logo */}
        <div className="mb-4">
          <p className="text-[30px] font-bold text-center">
            A<span style={{ color: "#FCA311" }}>fit</span>nity
          </p>
        </div>

        {/* form */}
        <Card className="w-full max-w-md pt-6 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-medium font-bold text-center">Let's get started</CardTitle>
            <CardDescription className="text-center">Create your first account for your first workout and diet routine</CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-6 pb-4">
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="First Name" className="border focus-visible:ring-3 focus-visible:ring-[#FCA311]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Last Name" className="border focus-visible:ring-3 focus-visible:ring-[#FCA311]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="example@domain.com" className="border focus-visible:ring-3 focus-visible:ring-[#FCA311]" {...field} />
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
                      <Input type="password" placeholder="Enter password" className="border focus-visible:ring-3 focus-visible:ring-[#FCA311]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Repeat password" className="border focus-visible:ring-3 focus-visible:ring-[#FCA311]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" className="bg-[#FCA311] text-white hover:bg-[#F3C623] w-full">
                  Create account
                </Button>
              </div>
            </form>
          </Form>

          <CardFooter className="pb-2 flex justify-center">
            <p className="text-sm leading-none text-center">
              Already have an account?{" "}
              <Link to="/loginTwo" className="text-[#FCA311] underline font-medium">
                Login now.
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

function LoginDescription() {
  return (
    <>
      <div className="pt-20">
        <div className="grid grid-cols-1 mx-5 md:mx-17 md:grid-cols-2">
          {/* description container */}
          <div className="md:order-first md:my-auto">
            <h2 className="font-aeonik text-[20px] leading-8 font-bold text-moss-black mt-5 md:text-3xl md:mb-5">
              Thank you for choosing us to <br /> start your fitness and diet journey.
            </h2>
            <p className="text-justify font-dmsans text-[15px] mt-3 mb-5 md:text-lg md:w-xl md:mb-5">
              We're excited to be part of your transformation. Whether you're here to build strength, eat healthier, or simply feel better every day — we're
              here to guide you at every step. Let’s achieve your goals together with personalized support, proven strategies, and a community that has your
              back.
            </p>
            <Link
              // create a page nga kamulo pa siya og buhat
              to="/"
              className="px-5 py-3 text-[14px] rounded-lg inline-flex items-center justify-center bg-black font-dmsans text-white hover:bg-gray-800"
            >
              Rate Affitnity
            </Link>
          </div>

          {/* image container */}
          <div className="order-first">
            <img className="w-lg rounded-lg md:w-ful lg:w-[450px] md:ml-30" src={FitnessPic} alt="a group of women doing stretching" />
          </div>
        </div>
      </div>
    </>
  );
}

function ChooseUs() {
  return (
    <>
      <div className="mx-5 mt-40 md:mx-17">
        <h2 className="text-[35px] md:text-lg lg:text-[40px] font-bold mb-2.5">Why Choose Us?</h2>
        {/* description with button cont */}
        <div className="md:flex md:justify-between md:items-center">
          <p className="font-dmsans text-justify text-[15px] mb-2.5 md:flex">
            Affitnity helps you plan smarter by turning complex financial and lifestyle decisions into simple, personalized steps.
            <br />
            It's clarity, confidence, and control all in one place.
          </p>
          {/* e modify ni siya e connect sa gemini api */}
          <Link
            to="/"
            className="px-5 py-3 text-[15px] mb-5 rounded-lg inline-flex items-center justify-center bg-black font-dmsans text-white hover:bg-gray-800"
          >
            Start your plan
          </Link>
        </div>
        {/* grid section */}
        <div className="grid grid-cols-1 font-medium gap-4 md:grid-cols-3">
          <div className="bg-[#E3E3E3] text-justify group text-[15px] bg-mygray text-moss-black py-8 px-5 mb-5 rounded-lg hover:bg-moss-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" className="mb-3 group-hover:text-brand">
              <path
                fill="currentColor"
                d="M17 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m0 4h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m-6-6h6a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2m10-6H7a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v10a3 3 0 0 0 3 3h13a4 4 0 0 0 4-4V4a1 1 0 0 0-1-1M6 18a1 1 0 0 1-2 0V9h2Zm14-1a2 2 0 0 1-2 2H7.82A3 3 0 0 0 8 18V5h12Zm-9-4h1a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2m0 4h1a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2"
              />
            </svg>
            <h1 className="mb-5 group-hover:text-brand">
              Personalized
              <br />
              Workout
            </h1>
            <p className="font-manrope text-sm font-normal mb-6 text-moss-black group-hover:text-brand">
              We believe fitness should be personal, which is why our workouts are tailored to your goals, body, and lifestyle. Personalized training helps you
              achieve better results, stay motivated, and avoid injuries. With a custom plan, you’re set for lasting success and your best self.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/" className="font-manrope text-sm font-medium group-hover:text-brand">
                Read More
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 group-hover:text-brand"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>

          <div className="bg-[#E3E3E3] text-justify group text-[15px] bg-mygray text-moss-black py-8 px-3 mb-5 rounded-lg hover:bg-moss-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" className="mb-3 group-hover:text-brand">
              <path
                fill="currentColor"
                d="M16 22.75c-.41 0-.75-.34-.75-.75v-1.296c-.726.037-1.552.044-2.5.046V22c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-1.25a54 54 0 0 1-2.5-.046V22c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-1.44c-1.117-.178-1.935-.525-2.61-1.2s-1.022-1.492-1.201-2.61H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.295a54 54 0 0 1-.045-2.5H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.25c.002-.949.01-1.774.045-2.5H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.439c.179-1.118.526-1.935 1.201-2.61s1.493-1.022 2.61-1.2V2c0-.41.34-.75.75-.75s.75.34.75.75v1.296a54 54 0 0 1 2.5-.046V2c0-.41.34-.75.75-.75s.75.34.75.75v1.25c.948.002 1.774.01 2.5.046V2c0-.41.34-.75.75-.75s.75.34.75.75v1.44c1.117.178 1.935.525 2.61 1.2s1.023 1.492 1.201 2.61H22c.41 0 .75.34.75.75s-.34.75-.75.75h-1.295c.036.726.043 1.551.045 2.5H22c.41 0 .75.34.75.75s-.34.75-.75.75h-1.25a54 54 0 0 1-.045 2.5H22c.41 0 .75.34.75.75s-.34.75-.75.75h-1.439c-.178 1.118-.526 1.935-1.201 2.61s-1.493 1.022-2.61 1.2V22c0 .41-.34.75-.75.75m-4-3.5c3.56 0 5.35 0 6.3-.95s.95-2.74.95-6.3s0-5.35-.95-6.3s-2.74-.95-6.3-.95s-5.35 0-6.3.95s-.95 2.74-.95 6.3s0 5.35.95 6.3s2.74.95 6.3.95m-1.218-2.85c.19.52.67.85 1.22.85s1.03-.33 1.22-.85l.8-2.16c.03-.1.11-.17.21-.21l2.16-.8c.52-.19.85-.67.85-1.22s-.33-1.03-.85-1.22l-2.16-.8a.34.34 0 0 1-.21-.21l-.8-2.16c-.19-.52-.67-.85-1.22-.85s-1.03.33-1.22.85l-.8 2.16c-.03.1-.11.17-.21.21l-2.16.8c-.52.19-.85.67-.85 1.22s.33 1.03.85 1.22l2.16.8c.1.03.17.11.21.21zm-.49-3.78L8.622 12l1.67-.62c.51-.19.91-.59 1.1-1.1l.62-1.67l.62 1.67c.19.51.59.91 1.1 1.1l1.67.62l-1.67.62c-.51.19-.91.59-1.1 1.1l-.62 1.67l-.62-1.67c-.19-.51-.59-.91-1.1-1.1"
                color="currentColor"
              />
            </svg>
            <h1 className="mb-5 group-hover:text-brand">
              Artifical Intelligence
              <br />
              Generated
            </h1>
            <p className="font-manrope text-sm font-normal mb-6 text-moss-black group-hover:text-brand">
              We believe fitness should be as unique as you are. Our AI-powered workouts are tailored to your goals, body, and lifestyle, helping you train
              smarter and achieve real results. With personalized guidance, you’ll stay motivated, reduce the risk of injury, and unlock lasting success.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/" className="font-manrope text-sm font-medium group-hover:text-brand">
                Read More
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 group-hover:text-brand"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>

          <div className="bg-[#E3E3E3] text-justify group text-[15px] bg-mygray text-moss-black py-8 px-3 mb-5 rounded-lg hover:bg-moss-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" className="mb-3 group-hover:text-brand">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                <path d="M10 9.255C7.606 7.958 5.08 5.715 3 2m8.616 2.419C9.58 3.084 7.097 3.642 6.069 5.666s-.211 4.747 1.824 6.083c1.842 1.209 5.874 2.459 9.107-1.004c-3.03-1.29-3.35-4.99-5.384-6.326" />
                <path d="M4 11c-.64.47-1 1.005-1 1.572C3 14.465 7.03 16 12 16s9-1.535 9-3.428c0-.567-.36-1.101-1-1.572" />
                <path d="M21 13c0 3.577-2.506 6.715-5.205 8.482c-.555.364-1.215.518-1.878.518h-3.834c-.663 0-1.323-.154-1.878-.518C5.506 19.715 3 16.577 3 13" />
              </g>
            </svg>
            <h1 className=" mb-5 group-hover:text-brand">
              Adaptive
              <br />
              Meal Guide
            </h1>
            <p className="font-manrope text-sm font-normal mb-6 text-moss-black group-hover:text-brand">
              We believe nutrition should adapt to you, not the other way around. Our adaptive meal guides are tailored to your health goals, preferences, and
              lifestyle, making healthy eating simple and sustainable. With personalized guidance, you can fuel your body smarter and stay on track toward
              lasting wellness.
            </p>
            <div className="flex items-center gap-3 group-hover:text-brand">
              <Link to="/" className="font-manrope text-sm font-medium">
                Read More
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Registerfrom() {
  return (
    <>
      <div>
        {/* <LoginHeader /> */}
        {/* <LoginForm /> */}
        <RegisterTwo />
        <LoginDescription />
        <ChooseUs />
        <Footer />
      </div>
    </>
  );
}
// export default RegisterTwo;
