import React from "react";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "../common/FormGroup";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import {Link, useNavigate} from "react-router-dom";

const schema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("This field is required"),
});

const ResetPasswordPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });
    const navigate = useNavigate();
    const handleResetPassword = (values) => {
        console.log("Reset password email sent to:", values.email);
        navigate('/auth/confirm');
    };

    return (
        <LayoutAuthentication heading="FASCO">
            {/* Đưa FASCO sát lên trên */}
            <div className="absolute top-0 left-0 right-0 flex justify-center mt-4">

            </div>

            {/* Nội dung chính */}
            <div className="flex flex-col items-center mt-20">
                <div className="text-black text-3xl font-normal font-['Volkhov'] leading-10 mb-5">
                    Forget Password
                </div>
                <form onSubmit={handleSubmit(handleResetPassword)} className="w-full max-w-sm">
                    <FormGroup>
                        <Label
                            htmlFor="email"
                            className="text-[#121018] text-xs font-normal"
                        >
                            Enter your email address
                        </Label>
                        <Input
                            control={control}
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            error={errors.email?.message}
                        />
                    </FormGroup>
                    <Button className="bg-black rounded-[10px] shadow-[0px_20px_35px_0px_rgba(0,0,0,0.15)] w-full mt-4" type="submit">

                        <span className="Send Confirmation Code">Send Confirmation Code</span>
                    </Button>
                </form>
                <div className="text-center mt-5">
                    <p className="text-sm text-gray-600">
                        Remember your password?{" "}
                        <Link
                            to="/auth/sign-in"
                            className="text-[#5b86e5] text-base font-normal font-['Poppins'] leading-10 tracking-wider"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </LayoutAuthentication>
    );
};

export default ResetPasswordPage;
