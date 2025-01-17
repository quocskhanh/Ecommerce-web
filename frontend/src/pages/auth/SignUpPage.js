import React from "react";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import FormGroup from "../../components/common/FormGroup";
import { Button } from "../../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggleValue from "../../components/hooks/useToogleValue";
import axios from "axios";

const schema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Invalid phone number"),
    birth: yup
        .date()
        .required("Date of birth is required")
        .typeError("Invalid date format"),
    gender: yup
        .string()
        .oneOf(["Male", "Female", "Other"], "Please select a valid gender")
        .required("Gender is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be no more than 20 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
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

    const navigate = useNavigate();
    const { value: showPassword, handleToggleValue: handleTogglePassword } =
        useToggleValue();


    const handleSignUp = async (values) => {
        try {
<<<<<<< HEAD
            const response = await axios.post("http://localhost:5000/signup", values);
            console.log("Response:", response.data);
            navigate("/auth/sign-in", { state: { message: "Đăng ký thành công!" } });
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
=======
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
                
                const token = response.data.access_token; // Lấy token từ phản hồi
                console.log("Tài khoản đã đăng ký thành công, token:", token);

                // Thiết lập token cho các yêu cầu tiếp theo
                const headers = { Authorization: `Bearer ${token}` };

                // Kiểm tra xem giỏ hàng đã tồn tại chưa
                try {
                    const cartResponse = await axios.get("https://testbe-1.onrender.com/carts/me", { headers });
                    console.log("Giỏ hàng hiện tại:", cartResponse.data);
                } catch (error) {
                    if (error.response?.status === 404) {
                        // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
                        const createCartResponse = await axios.post(
                            "https://testbe-1.onrender.com/carts/me",
                            {},
                            { headers }
                        );
                        console.log("Giỏ hàng mới được tạo:", createCartResponse.data);
                    } else {
                        console.error("Lỗi khi lấy giỏ hàng:", error);
                    }
                }
            
                
                
                alert(serverMessage);
                navigate("/login", { state: { message: serverMessage } });
            } else {
                alert("Không thể đăng ký. Vui lòng thử lại.");
            }
>>>>>>> 361b2a012c3c43d33ec9ebc2fdb563222f5a4a43
        } catch (error) {
            if (error.response && error.response.data) {
                alert(`Lỗi: ${error.response.data.message}`);
            } else {
                console.error("Error:", error.message);
                alert("Đăng ký thất bại. Vui lòng thử lại.");
            }
        }
    };


    return (
        <LayoutAuthentication heading="FASCO">
            <div className="text-black text-3xl font-normal font-['Volkhov'] leading-10 mb-5">
                Đăng Ký Tài Khoản
            </div>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <FormGroup>
                    <Label htmlFor="firstname"></Label>
                    <Input
                        control={control}
                        name="firstname"
                        type="text"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"

                        placeholder="Họ"
                        error={errors.firstname?.message}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastname"></Label>
                    <Input
                        control={control}
                        name="lastname"
                        type="text"
                        placeholder="Tên"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        error={errors.lastname?.message}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="phone"></Label>
                    <Input
                        control={control}
                        name="phone"
                        type="text"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Số điện thoại"
                        error={errors.phone?.message}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="birth"></Label>
                    <Input
                        control={control}
                        name="birth"
                        type="date"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        placeholder="Ngày sinh"
                        error={errors.birth?.message}
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
                    <p className="text-red-500">{errors.gender?.message}</p>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email"></Label>
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
                    <Label htmlFor="password"></Label>
                    <Input
                        control={control}
                        name="password"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        error={errors.password?.message}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="confirm"></Label>
                    <Input
                        control={control}
                        name="confirm"
                        className="text-[#9d9d9d] text-base font-normal font-['Poppins'] leading-10 tracking-wider w-full border-b border-gray-400 focus:border-[#9d9d9d] focus:outline-none"
                        type={showPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        error={errors.confirm?.message}
                    />
                </FormGroup>
                <Button type="submit" className="w-full bg-black text-white py-3">
                    Đăng ký
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
