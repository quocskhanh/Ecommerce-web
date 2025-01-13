import React from "react";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import {useNavigate} from "react-router-dom";

const schema = yup.object({
    code: yup
        .string()
        .length(6, "Code must be 6 digits")
        .required("This field is required"),
});

const ConfirmCodePage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const navigate = useNavigate();

    const handleConfirmCode = (values) => {
        console.log("Code entered:", values.code);

        navigate("/auth/create")
        // Xử lý logic xác thực mã xác nhận (ví dụ: gửi API)
    };

    return (
        <LayoutAuthentication heading="FASCO">
            <div className="flex flex-col items-center mt-20">
                <div className="text-black text-3xl font-normal font-['Volkhov'] leading-10 mb-5">
                    Nhập mã xác nhận
                </div>
                <form onSubmit={handleSubmit(handleConfirmCode)} className="w-full max-w-sm">
                    <FormGroup>
                        <Label
                            htmlFor="code"
                            className="text-[#121018] text-xs font-normal"
                        >
                            Nhập mã 6 chữ số được gửi đến email của bạn
                        </Label>
                        <Input
                            control={control}
                            name="code"
                            type="text"
                            placeholder="123456"
                            error={errors.code?.message}
                        />
                    </FormGroup>
                    <Button
                        className="bg-black rounded-[10px] shadow-[0px_20px_35px_0px_rgba(0,0,0,0.15)] w-full mt-4"
                        type="submit"
                    >
                        Xác nhận
                    </Button>
                </form>
                <div className="text-center mt-5">
                    <p className="text-black text-base font-normal font-['Poppins'] leading-10 tracking-wider">
                        Bạn không nhận được mã?{" "}
                        <button
                            onClick={() => console.log("Resend Code")}
                            className="text-[#5b86e5] text-base font-normal font-['Poppins'] leading-10 tracking-wider"
                        >
                            Gửi lại
                        </button>
                    </p>
                </div>
            </div>
        </LayoutAuthentication>
    );
};

export default ConfirmCodePage;
