import React from "react";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Label } from "../label";
import { Input } from "../input";
import FormGroup from "../common/FormGroup";
import { Button } from "../button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggleValue from "../hooks/useToogleValue";

const schema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be no more than 20 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
});

const SignUpPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const navigate = useNavigate(); // Hook để điều hướng
    const { value: acceptTerm, handleToggleValue: handleToggleTerm } = useToggleValue();
    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();

    const handleSignUp = (values) => {
        console.log(values);

        // Điều hướng đến trang sign-in sau khi hoàn tất
        navigate("/auth/sign-in", { state: { message: "Đăng ký thành công!" } });
    };

    return (
        <LayoutAuthentication heading="FASCO">
            {/* Text for existing account */}
            <div className="text-black text-3xl font-normal font-['Volkhov'] leading-10 mb-5">Create Account</div>

            <div className="flex gap-4">
                <div className="w-[294px] h-[55px] bg-white rounded-lg border border-[#5b86e5] flex items-center justify-center">
                    <img src="/Google__G__logo.svg.webp" alt="Google Logo" className="w-6 h-6 mr-2" />
                    <div className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider">
                        Sign up with Google
                    </div>
                </div>

                <div className="w-[270px] h-[55px] bg-white rounded-lg border border-[#5b86e5] flex items-center justify-center">
                    <img src="/email.png" alt="Email Icon" className="w-6 h-6 mr-2" />
                    <div className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider">
                        Sign up with Email
                    </div>
                </div>
            </div>


            <div className="flex flex-col items-center mt-20 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-[30px] h-[5px] bg-[#828282]"></div>
                    <div className="text-[#828282] text-3xl font-bold font-['Poppins'] leading-10 tracking-widest">OR</div>
                    <div className="w-[30px] h-[5px] bg-[#828282]"></div>
                </div>
            </div>



            <form onSubmit={handleSubmit(handleSignUp)}>
                <FormGroup>


                    <Label
                        className="text-[#121018] text-xs font-normal font-['Jost']"
                        htmlFor="firstname"
                    >
                    </Label>
                    <Input
                        control={control}
                        name="firstname"
                        type="text"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="First Name"
                        error={errors.email?.message}
                    />

                    <Label
                        className="text-[#121018] text-xs font-normal font-['Jost']"
                        htmlFor="lastname"
                    >
                    </Label>
                    <Input
                        control={control}
                        name="lastname"
                        type="text"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Last Name"
                        error={errors.email?.message}
                    />

                    <Label
                        className="text-[#121018] text-xs font-normal font-['Jost']"
                        htmlFor="phone"
                    >
                    </Label>
                    <Input
                        control={control}
                        name="phone"
                        type="number"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Phone Number"
                        error={errors.email?.message}
                    />


                    <Label
                        className="text-[#121018] text-xs font-normal font-['Jost']"
                        htmlFor="email"
                    >
                    </Label>
                    <Input
                        control={control}
                        name="email"
                        type="email"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Email"
                        error={errors.email?.message}
                    />

                </FormGroup>

                <FormGroup>
                    <Label
                        className="text-[#121018] text-xs font-normal font-['Jost']"
                        htmlFor="password"
                    >
                    </Label>
                    <Input
                        control={control}
                        name="password"
                        type={`${showPassword ? "text" : "password"}`}
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Password"
                        error={errors.password?.message}
                    >
                    </Input>

                    <Label
                        className="text-[#121018] text-xs font-normal font-['Jost']"
                        htmlFor="confirm"
                    >
                    </Label>
                    <Input
                        control={control}
                        name="confirm"
                        type={`${showPassword ? "text" : "password"}`}
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Confirm Password"
                        error={errors.password?.message}
                    >
                    </Input>
                </FormGroup>


                <Button
                    className="w-[445px] h-14 p-5 bg-black rounded-[10px] shadow-[0px_20px_35px_0px_rgba(0,0,0,0.15) justify-center items-center gap-2.5 inline-flex"
                    type="submit"
                >
                    <div className="text-white text-base font-semibold font-['Poppins'] leading-10 tracking-wider">
                        Create Account
                    </div>
                </Button>

                <p className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider lg:mb-6 mb-4 justify-center items-center">
                    Already have an account?{" "}
                    <Link
                        to="/auth/sign-in"
                        className=" text-[#5b86e5] text-base font-normal font-['Poppins'] leading-10 tracking-wider"
                    >
                        Login
                    </Link>
                </p>
            </form>


        </LayoutAuthentication>
    );
};

export default SignUpPage;
