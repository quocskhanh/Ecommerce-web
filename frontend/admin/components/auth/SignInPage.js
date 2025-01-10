import React, { useState } from "react";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../label";
import { Input } from "../input";
import FormGroup from "../common/FormGroup";
import useToggleValue from "../hooks/useToogleValue";
import { Button } from "../button";
import IconEyeToggle from "../icons/IconEyeToggle";

const schema = yup.object({
    email: yup.string().email("Invalid email address").required("This field is required"),
    password: yup.string().required("This field is required"),
});

const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
    const navigate = useNavigate();

    const handleSignIn = async (values) => {
        setLoading(true);
        console.log(values);

        setTimeout(() => {
            setLoading(false);
            navigate("/"); // Điều hướng đến trang chủ
        }, 500); // Giả lập thời gian xử lý
    };

    const handleGoogleSignIn = () => {
        console.log("Google Sign-In clicked");
        // Integrate Google Sign-In API logic here
    };

    const handleFacebookSignIn = () => {
        console.log("Facebook Sign-In clicked");
        // Integrate Facebook Login API logic here
    };

    return (
        <LayoutAuthentication heading="FASCO">
            <div className="flex gap-4">
                <div className="w-[294px] h-[55px] bg-white rounded-lg border border-[#5b86e5] flex items-center justify-center">
                    <img src="/Google__G__logo.svg.webp" alt="Google Logo" className="w-6 h-6 mr-2" />
                    <div className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider">
                        Sign up with Google
                    </div>
                </div>

                <div className="w-[300px] h-[55px] bg-white rounded-lg border border-[#5b86e5] flex items-center justify-center">
                    <img src="/fb.png" alt="Email Icon" className="w-6 h-6 mr-2" />
                    <div className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider">
                        Sign up with Facebook
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




            <form onSubmit={handleSubmit(handleSignIn)}>
                <FormGroup>
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
                        <IconEyeToggle open={showPassword} onClick={handleTogglePassword} />
                    </Input>
                </FormGroup>

                <FormGroup>

                </FormGroup>

                <Button
                    className={`bg-[#121018] w-full flex justify-center items-center ${
                        loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    type="submit"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-white"></div>
                            <span>Signing In...</span>
                        </div>
                    ) : (
                        "Sign in"
                    )}
                </Button>

                {/*<div className="flex flex-col items-center mt-5 gap-3">*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={handleGoogleSignIn}*/}
                {/*        className="w-full flex justify-center items-center bg-white border border-gray-300 text-black py-2 rounded shadow-sm hover:bg-gray-100"*/}
                {/*    >*/}
                {/*        <img*/}
                {/*            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"*/}
                {/*            alt="Google Logo"*/}
                {/*            className="w-5 h-5 mr-3"*/}
                {/*        />*/}
                {/*        Sign in with Google*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={handleFacebookSignIn}*/}
                {/*        className="w-full flex justify-center items-center bg-blue-600 text-white py-2 rounded shadow-sm hover:bg-blue-700"*/}
                {/*    >*/}
                {/*        <img*/}
                {/*            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"*/}
                {/*            alt="Facebook Logo"*/}
                {/*            className="w-5 h-5 mr-3"*/}
                {/*        />*/}
                {/*        Sign in with Facebook*/}
                {/*    </button>*/}
                {/*</div>*/}


                <div className="w-full h-full r rounded-lg border border-[#5b86e5] mt-5 flex items-center justify-center">
                    <Link
                        to="/auth/sign-up"
                        className="text-[#5b86e5] text-base font-semibold font-['Poppins'] leading-6 tracking-wider transition-colors duration-200 px-6 py-3 rounded-md"
                    >
                        Register Now
                    </Link>

                </div>

                <div className="text-[#5b86e5] text-right text-base font-bold font-['Poppins'] leading-10 tracking-wider">
                    <Link
                        to="/auth/reset"
                    >
                        Forget Password?
                    </Link></div>


            </form>


        </LayoutAuthentication>
    );
};

export default SignInPage;
