import React, { useState } from "react";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import FormGroup from "../../components/common/FormGroup";
import { Button } from "../../components/button";
import useToggleValue from "../../components/hooks/useToogleValue";
import axios from "axios";

const SignUpPage = () => {
    const { handleSubmit, control } = useForm();
    const navigate = useNavigate();
    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (values) => {
        setLoading(true);

        try {
            const payload = {
                first_name: values.firstname,
                last_name: values.lastname,
                email: values.email,
                phone_number: values.phone_number,
                address: values.address,
                date_of_birth: values.date_of_birth,
                gender: values.gender,
                password: values.password,
                role: false, // Giá trị mặc định cho role
            };

            console.log("Payload gửi lên server:", payload); // Kiểm tra dữ liệu gửi lên

            const response = await axios.post("https://testbe-1.onrender.com/signup", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const serverMessage = response.data.message || "Đăng ký thành công!";
                alert(serverMessage);
                navigate("/auth/sign-in", { state: { message: serverMessage } });
            } else {
                alert("Không thể đăng ký. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <LayoutAuthentication heading="FASCO">
            <div className="text-black text-3xl font-normal font-['Volkhov'] leading-10 mb-5">
            </div>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <FormGroup>
                    <Label htmlFor="firstname"></Label>
                    <Input
                        control={control}
                        name="firstname"
                        type="text"
                        className=" text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"

                        placeholder="Họ"
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastname"></Label>
                    <Input
                        control={control}
                        name="lastname"
                        type="text"
                        placeholder="Tên"
                        className=" text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="email"></Label>
                    <Input
                        control={control}
                        name="email"
                        type="email"
                        className=" text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="phone_number"></Label>
                    <Input
                        control={control}
                        name="phone_number"
                        type="text"
                        className="text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Số điện thoại"
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="adresss"></Label>
                    <Input
                        control={control}
                        name="adresss"
                        type="text"
                        className="text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Địa chỉ    "
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="date_of_birth"></Label>
                    <Input
                        control={control}
                        name="date_of_birth"
                        type="date"
                        className=" text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Ngày sinh"
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="gender"></Label>
                    <select
                        className="border rounded p-2 w-full"
                        {...control.register("gender")}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                    </select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password"></Label>
                    <Input
                        control={control}
                        name="password"
                        className="text-base font-normal leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="confirm_password"></Label>
                    <Input
                        control={control}
                        name="confirm_password"
                        className=" text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        type={showPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                    />
                </FormGroup>
                <Button type="submit" className="w-full bg-black text-white py-3">
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
            </form>

            <p className="text-center mt-5">
                Bạn đã có tài khoản?{" "}
                <Link to="/auth/sign-in" className="text-blue-500">
                    Đăng nhập
                </Link>
            </p>
        </LayoutAuthentication>
    );
};

export default SignUpPage;
