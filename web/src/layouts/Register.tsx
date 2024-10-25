import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputHeader from "./components/Input";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import InputIcon from "@/icons/InputIcon";
import { Slider } from "@/components/ui/slider";
import RulerIcon from "@/icons/RulerIcon";
import GenderIcon from "@/icons/GenderIcon";
import MaleIcon from "@/icons/MaleIcon";
import FemaleIcon from "@/icons/FemaleIcon";
import { Button } from "@/components/ui/button";
import CalendarIcon from "@/icons/CalendarIcon";
import { cn } from "@/lib/utils";
import AlertDispatch from "./components/Alert";
import { fetchNui } from "@/utils/fetchNui";

type playerData = {
  firstName: string;
  lastName: string;
  gender: string;
  height: number;
  dateOfBirth: string;
};

const RegisterLayout = ({setShowRegister}: {setShowRegister: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      height: 170,
      dateOfBirth: "",
    },
  });

  const [selected, setSelected] = useState("male");
  const [height, setHeight] = useState(170);

  const onSubmit = (data: playerData) => {
    fetchNui<string>('register', data).then((res) => {
      if (res === 'success') {
        setShowRegister(false)
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: "0%" }}
      exit={{ opacity: 0, x: "100%" }}
      className="h-full p-2 pr-5 bg-gradient-to-r from-slate-900/50 to-gray-50/0  rounded flex items-center justify-start"
    >
      <div className="flex flex-col gap-3 w-fit  ml-10">
        <div className="-space-y-1 flex flex-col">
          <span className="text-3xl font-bold">New Character</span>
          <span className="text-foreground/80">Registration</span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-80"
        >
          <InputHeader
            icon={<InputIcon />}
            header="First Name"
            description="Enter your character name"
          >
            <Input
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: "Only letters and spaces allowed",
                },
              })}
              placeholder="John"
              className="bg-foreground/10"
            />
            {errors.firstName && (
              <AlertDispatch
                clearError={clearErrors}
                error="firstName"
                message={errors.firstName.message}
              />
            )}
          </InputHeader>

          <InputHeader
            icon={<InputIcon />}
            header="Last Name"
            description="Enter your character name"
          >
            <Input
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: "Only letters and spaces allowed",
                },
              })}
              placeholder="Doe"
              className="bg-foreground/10"
            />
            {errors.lastName && (
              <AlertDispatch
                clearError={clearErrors}
                error="lastName"
                message={errors.lastName.message}
              />
            )}
          </InputHeader>

          <InputHeader
            header="Gender"
            description="Select your gender"
            icon={<GenderIcon />}
          >
            <div className="w-full h-full flex items-center justify-center gap-4">
              <label
                className={cn(
                  "hover:bg-foreground/30 rounded w-20 h-20 bg-foreground/10 flex items-center flex-col justify-center cursor-pointer",
                  selected === "male" && "bg-foreground/30"
                )}
              >
                <input
                  type="radio"
                  value="male"
                  {...register("gender", {
                    required: "Please select a gender",
                  })}
                  className="hidden"
                  onClick={() => setSelected("male")}
                />
                <MaleIcon />
                Male
              </label>
              <label
                className={cn(
                  "hover:bg-foreground/30 rounded w-20 h-20 bg-foreground/10 flex items-center flex-col justify-center cursor-pointer",
                  selected === "female" && "bg-foreground/30"
                )}
              >
                <input
                  type="radio"
                  value="female"
                  {...register("gender", {
                    required: "Please select a gender",
                  })}
                  className="hidden"
                  onClick={() => setSelected("female")}
                />
                <FemaleIcon />
                Female
              </label>
            </div>
            {errors.gender && (
              <AlertDispatch
                clearError={clearErrors}
                error="gender"
                message={errors.gender.message}
              />
            )}
          </InputHeader>

          <InputHeader
            header="Height"
            description="Enter your height in cm"
            icon={<RulerIcon />}
          >
            <div className="p-2 bg-foreground/10 rounded flex gap-2 w-full">
              <div className="bg-foreground/10 rounded text-center p-1 min-w-10">
                {height}
              </div>
              <Slider
                defaultValue={[height]}
                className="flex-grow"
                max={210}
                min={100}
                onValueChange={(e) => {
                  setValue("height", e[0]);
                  setHeight(e[0]);
                }}
              />
            </div>
          </InputHeader>

          <InputHeader
            header="Date of Birth"
            description="Enter your date of birth"
            icon={<CalendarIcon />}
          >
            <Input
              type="date"
              min="1900-01-01"
              max="2010-01-01"
              className="bg-foreground/10"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />
            {errors.dateOfBirth && (
              <AlertDispatch clearError={clearErrors} error="dateOfBirth" message={errors.dateOfBirth.message} />
            )}
          </InputHeader>

          <Button className="bg-foreground/20 text-foreground hover:bg-foreground/50" type="submit">Submit</Button>
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterLayout;
