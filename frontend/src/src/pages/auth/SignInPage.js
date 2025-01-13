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

    const [errorMessage, setErrorMessage] = useState(""); // State lưu thông báo lỗi

    const handleSignIn = async (values) => {
        setLoading(true);
        setErrorMessage(""); // Reset lỗi trước khi gửi yêu cầu mới
        try {
            const response = await axios.post("http://localhost:5000/login", values);
            console.log(response.data);
            navigate("/admin");
            if (response.status === 200) {
                const userData = response.data;
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                setErrorMessage("Thông tin đăng nhập không chính xác."); // Cập nhật lỗi
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                setErrorMessage(`Lỗi: ${error.response.data.message || "Đăng nhập thất bại"}`);
            } else {
                setErrorMessage("Không thể kết nối tới server. Vui lòng thử lại.");
            }
        }
        setLoading(false);
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
            <div className="flex justify-center gap-4">
                <div className="w-[294px] h-[55px] bg-white rounded-lg border border-[#5b86e5] flex items-center justify-center">
                    <img src="/Google__G__logo.svg.webp" alt="Google Logo" className="w-6 h-6 mr-2" />
                    <div className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider whitespace-nowrap">
                        Đăng nhập với Google
                    </div>
                </div>

                <div className="w-[310px] h-[55px] bg-white rounded-lg border border-[#5b86e5] flex items-center justify-center">
                    <img src="/fb.png" alt="Facebook Logo" className="w-6 h-6 mr-2" />
                    <div className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider whitespace-nowrap">
                        Đăng nhập với Facebook
                    </div>
                </div>
            </div>


            <div className="flex flex-col items-center mt-20 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-[30px] h-[5px] bg-[#828282]"></div>
                    <div className="text-[#828282] text-3xl font-bold font-['Poppins'] leading-10 tracking-widest">Hoặc</div>
                    <div className="w-[30px] h-[5px] bg-[#828282]"></div>
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
