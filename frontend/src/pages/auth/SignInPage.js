import React, { useState } from "react";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import FormGroup from "../../components/common/FormGroup";
import useToggleValue from "../../components/hooks/useToogleValue";
import { Button } from "../../components/button";
import IconEyeToggle from "../../components/icons/IconEyeToggle";
import axios from "axios";
// import GoogleLogin from "react-google-login";

const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});


const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(""); // State lưu thông báo lỗi

    const handleSignIn = async (values) => {
        setLoading(true);
        setErrorMessage(""); // Reset lỗi trước khi gửi yêu cầu mới

        try {
            // Chuyển payload sang định dạng application/x-www-form-urlencoded
            const payload = new URLSearchParams();
            payload.append("username", values.username);
            payload.append("password", values.password);

            const response = await axios.post("https://testbe-1.onrender.com/login", payload, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.status === 200) {
                const userData = response.data;

                // Kiểm tra access_token
                if (!userData.access_token) {
                    throw new Error("Access token không tồn tại trong phản hồi từ server.");
                }
                console.log(response)
                // Lưu token vào localStorage
                localStorage.setItem("access_token", userData.access_token);
                localStorage.setItem("user", JSON.stringify(userData));

                // Chuyển hướng đến trang admin
                navigate("/admin");
            } else {
                setErrorMessage("Thông tin đăng nhập không chính xác.");
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                // Log chi tiết lỗi từ server
                console.error("Chi tiết lỗi từ server:", error.response.data);
                const serverError = error.response.data.detail || error.response.data.message;
            } else {
                setErrorMessage("Không thể kết nối tới server. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };







    return (
        <LayoutAuthentication heading="FASCO">
            <div className="flex justify-center gap-4">

            </div>


            <div className="flex flex-col items-center mt-20 mb-10">
                <div className="flex items-center gap-4">
                </div>
            </div>




            <form onSubmit={handleSubmit(handleSignIn)}>
                {errorMessage && (
                    <div className="bg-red-500 text-white text-center py-2 mb-4">
                        {errorMessage}
                    </div>
                )}
                <FormGroup>
                    <Label
                        className="text-[#121018] text-xs font-normal font-['Jost']"
                        htmlFor="email"
                    >
                    </Label>
                    <Input
                        control={control}
                        name="username"
                        type="email"
                        className="text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
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
                        className=" text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Mật khẩu"
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
                        "Đăng nhập"
                    )}
                </Button>


                <div className="w-full h-full r rounded-lg border border-[#5b86e5] mt-5 flex items-center justify-center">
                    <Link
                        to="/auth/sign-up"
                        className="text-[#5b86e5] text-base font-semibold font-['Poppins'] leading-6 tracking-wider transition-colors duration-200 px-6 py-3 rounded-md"
                    >
                        Đăng ký
                    </Link>

                </div>

                <div className="text-[#5b86e5] text-right text-base font-bold font-['Poppins'] leading-10 tracking-wider">
                    <Link
                        to="/auth/reset"
                    >
                        Quên mật khẩu?
                    </Link></div>


            </form>


        </LayoutAuthentication>
    );
};

export default SignInPage;