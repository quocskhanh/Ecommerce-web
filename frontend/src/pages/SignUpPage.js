import React, {useState} from 'react';
import LayoutAuthentication from "../layout/LayoutAuthentication";
import {Link, useFormAction} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Label} from "../components/label";
import {Input} from "../components/input";
import FormGroup from "../components/common/FormGroup";
import {Button} from "../components/button";
import Checkbox from "../components/checkbox/Checkbox";

const SignUpPage = () => {
    const {handleSubmit,
        control,
        formState: {isValid,isSubmitting}

    } = useForm({

    })
    const handleSignUp = (values) => {
        console.log(values)
    }
    const [acceptTerm,setAcceptTerm] = useState(false)
    const handleToggleTerm = () => {
        setAcceptTerm(!acceptTerm)
    }
    return (
        <LayoutAuthentication heading="Create an Account">
            {/* Text for existing account */}
            <p className="text-center text-sm lg:text-base font-normal text-gray-600 lg:mb-6 mb-4">
                Already have an account?{" "}
                <Link
                    to="/sign-in"
                    className="text-primary font-medium underline hover:text-primary-dark"
                >
                    Sign in
                </Link>
            </p>

            {/* Google Sign-Up Button */}
            <button className="flex items-center gap-x-3 w-full justify-center py-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all bg-white">
                <img srcSet="/ggicon.png 2x" alt="icon-google" className="w-6 h-6" />
                <span className="text-gray-700 font-medium">Sign up with Google</span>
            </button>

            {/* Divider */}
            <p className="text-center text-sm font-normal my-4 lg:my-6 text-text2">
                Or sign up with email
            </p>
            <form  onSubmit={handleSubmit(handleSignUp)}>
                <FormGroup>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input control = {control}
                           name = "name"
                           type="text"
                           placeholder = "TrungKien"></Input>
                </FormGroup>


                <FormGroup>
                    <Label htmlFor="email">Email *</Label>
                    <Input control = {control}
                           name = "email"
                           type="email"
                           placeholder = "example@gmail.com"></Input>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">Password *</Label>
                    <Input control = {control}
                           name = "password"
                           type="password"
                           placeholder = "Create a password"></Input>
                </FormGroup>
                <div className="flex items-start gap-x-5 mb-5">
                    <Checkbox name ="term" checked={acceptTerm} onClick={handleToggleTerm} ></Checkbox>

                        <p className="flex-1 font-semibold text-sm text-text2">I agree to the <span className="font-normal text-secondary underline">Terms of Use</span> and have read and understand the <span className="underline text-secondary">Privacy policy.</span></p>


                </div>
                <Button className="bg-primary w-full" type="submit" >
                    Create my account
                </Button>
            </form>
        </LayoutAuthentication>
    );
};

export default SignUpPage;
