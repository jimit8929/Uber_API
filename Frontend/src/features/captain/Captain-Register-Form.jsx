// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { useContext, useState } from "react";
// import { Mail, Lock, Eye, EyeOff, User, Car, Truck, Bike } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { NavLink , useNavigate} from "react-router-dom";

// import {toast} from "sonner"
// import axios from "axios"


// import { CaptainDataContext } from "./context/CaptainContext";

// const captainFormSchema = z.object({
//   firstname: z.string().min(2, {
//     message: "First name must be at least 2 characters.",
//   }),
//   lastname: z.string().optional(),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z
//     .string()
//     .min(8, {
//       message: "Password must be at least 8 characters.",
//     })
//     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
//       message:
//         "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
//     }),
//   color: z.string().min(2, {
//     message: "Vehicle color is required.",
//   }),
//   plate: z.string().min(3, {
//     message: "Vehicle plate number is required.",
//   }),
//   capacity: z.string().min(1, {
//     message: "Vehicle capacity is required.",
//   }),
//   vehicleType: z.enum(["car", "auto", "bike"], {
//     required_error: "Please select a vehicle type.",
//   }),
// });

// export function CaptainRegisterForm() {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const {captain , setCaptain} = useContext(CaptainDataContext);

//   const navigate = useNavigate();

//   const form = useForm({
//     resolver: zodResolver(captainFormSchema),
//     defaultValues: {
//       firstname: "",
//       lastname: "",
//       email: "",
//       password: "",
//       color: "",
//       plate: "",
//       capacity: "",
//       vehicleType: undefined,
//     },
//   });

//   async function onSubmit(data) {
//     try {
//       setIsLoading(true);

//       const formattedCaptain = {
//   fullname: {
//     firstname: data.firstname,
//     lastname: data.lastname || " ", // or handle required field
//   },
//   email: data.email,
//   password: data.password,
//   vehicles: {
//     color: data.vehicleColor,
//     plate: data.vehiclePlate,
//     capacity: Number(data.vehicleCapacity),
//     vehicleType: data.vehicleType === "bike" ? "motorcycle" : data.vehicleType,
//   },
// };


//       const response = await axios.post(`http://localhost:8080/api/v1/captain/register` , formattedCaptain)

//     console.log(response.data);

//     const Resdata = response.data;
//     setCaptain(Resdata.captain)
//     localStorage.setItem("token" , Resdata.token)
//     toast("Successfully User Registered")
//     form.reset()
//     navigate("/")

//     } 
//     catch (error) {
//       console.log(error);
//       toast("Something went wrong ")
//     } 
    
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   }

//   return (
//     <Card className="w-full max-w-2xl border-2">
//       <CardHeader>
//         <div className="flex items-center gap-2 mb-2">
//           <Car className="h-5 w-5" />
//           <CardTitle>Captain Registration</CardTitle>
//         </div>
//         <CardDescription>
//           Create your captain account to start accepting rides
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="firstname"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                           <Input
//                             placeholder="John"
//                             className="pl-10"
//                             {...field}
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastname"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Last Name{" "}
//                         <span className="text-gray-400 text-sm">
//                           (Optional)
//                         </span>
//                       </FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                           <Input
//                             placeholder="Doe"
//                             className="pl-10"
//                             {...field}
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                         <Input
//                           placeholder="john.doe@example.com"
//                           type="email"
//                           className="pl-10"
//                           {...field}
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                         <Input
//                           placeholder="••••••••"
//                           type={isPasswordVisible ? "text" : "password"}
//                           className="pl-10"
//                           {...field}
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
//                           onClick={() =>
//                             setIsPasswordVisible(!isPasswordVisible)
//                           }
//                         >
//                           {isPasswordVisible ? (
//                             <EyeOff className="h-4 w-4" />
//                           ) : (
//                             <Eye className="h-4 w-4" />
//                           )}
//                           <span className="sr-only">
//                             {isPasswordVisible
//                               ? "Hide password"
//                               : "Show password"}
//                           </span>
//                         </Button>
//                       </div>
//                     </FormControl>
//                     <FormDescription>
//                       Must be at least 8 characters with uppercase, lowercase,
//                       and number.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="space-y-4 pt-4 border-t">
//               <h3 className="text-lg font-medium">Vehicle Information</h3>

//               <FormField
//                 control={form.control}
//                 name="vehicleType"
//                 render={({ field }) => (
//                   <FormItem className="space-y-3">
//                     <FormLabel>Vehicle Type</FormLabel>
//                     <FormControl>
//                       <RadioGroup
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                         className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
//                       >
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value="car" />
//                           </FormControl>
//                           <FormLabel className="font-normal flex items-center gap-1">
//                             <Car className="h-4 w-4" /> Car
//                           </FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value="auto" />
//                           </FormControl>
//                           <FormLabel className="font-normal flex items-center gap-1">
//                             <Truck className="h-4 w-4" /> Auto
//                           </FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value="bike" />
//                           </FormControl>
//                           <FormLabel className="font-normal flex items-center gap-1">
//                             <Bike className="h-4 w-4" /> Bike
//                           </FormLabel>
//                         </FormItem>
//                       </RadioGroup>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="vehicleColor"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Vehicle Color</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Black" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="vehiclePlate"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>License Plate</FormLabel>
//                       <FormControl>
//                         <Input placeholder="ABC123" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="vehicleCapacity"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Capacity</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select capacity" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="1">1 Person</SelectItem>
//                           <SelectItem value="2">2 People</SelectItem>
//                           <SelectItem value="3">3 People</SelectItem>
//                           <SelectItem value="4">4 People</SelectItem>
//                           <SelectItem value="5">5 People</SelectItem>
//                           <SelectItem value="6">6+ People</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Creating account..." : "Create Captain Account"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//       <CardFooter className="flex flex-col space-y-4">
//         <div className="relative w-full">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-background px-2 text-muted-foreground">
//               Already have an account?
//             </span>
//           </div>
//         </div>
//         <Button variant="outline" className="w-full" asChild>
//           <NavLink to="/captain-login">Sign In</NavLink>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Car, Truck, Bike } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { CaptainDataContext } from "./context/CaptainContext";

const captainFormSchema = z.object({
  firstname: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastname: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
  vehicleType: z.enum(["car", "auto", "bike"], { required_error: "Please select a vehicle type." }),
  vehicleColor: z.string().min(2, { message: "Vehicle color is required." }),
  vehiclePlate: z.string().min(3, { message: "Vehicle plate number is required." }),
  vehicleCapacity: z.string().min(1, { message: "Vehicle capacity is required." }),
});

export function CaptainRegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(captainFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      vehicleType: undefined,
      vehicleColor: "",
      vehiclePlate: "",
      vehicleCapacity: "",
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      const formattedCaptain = {
        fullname: {
          firstname: data.firstname,
          lastname: data.lastname || " ",
        },
        email: data.email,
        password: data.password,
        vehicles: {
          color: data.vehicleColor,
          plate: data.vehiclePlate,
          capacity: Number(data.vehicleCapacity),
          vehicleType: data.vehicleType === "bike" ? "motorcycle" : data.vehicleType,
        },
      };

      const response = await axios.post(
        `http://localhost:8080/api/v1/captain/register`,
        formattedCaptain
      );

      const Resdata = response.data;
      setCaptain(Resdata.captain);
      localStorage.setItem("token", Resdata.token);
      toast.success("Successfully registered!");
      form.reset();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl border-2">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Car className="h-5 w-5" />
          <CardTitle>Captain Registration</CardTitle>
        </div>
        <CardDescription>Create your captain account to start accepting rides</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="John" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="Doe" className="pl-10" {...field} />
                        </div>
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
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="john.doe@example.com" type="email" className="pl-10" {...field} />
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
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="••••••••"
                          type={isPasswordVisible ? "text" : "password"}
                          className="pl-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                          {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters with uppercase, lowercase, and number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Vehicle Info */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Vehicle Information</h3>

              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="car" /></FormControl>
                          <FormLabel className="font-normal flex items-center gap-1"><Car className="h-4 w-4" /> Car</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="auto" /></FormControl>
                          <FormLabel className="font-normal flex items-center gap-1"><Truck className="h-4 w-4" /> Auto</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="bike" /></FormControl>
                          <FormLabel className="font-normal flex items-center gap-1"><Bike className="h-4 w-4" /> Bike</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehiclePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select capacity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4 People</SelectItem>
                          <SelectItem value="5">5 People</SelectItem>
                          <SelectItem value="6">6+ People</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Captain Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Already have an account?</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <NavLink to="/captain-login">Sign In</NavLink>
        </Button>
      </CardFooter>
    </Card>
  );
}

