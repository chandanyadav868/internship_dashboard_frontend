import { useForm } from "react-hook-form"
import Input from "./components/Input";
import Button from "./components/Button";
import { useCallback, useEffect, useState } from "react";
import { apiClass } from "./Api/Apiclass";
import { Link, useNavigate, useParams } from "react-router";

interface formSubmissionProps {
    email: string,
    password: string
}

function Authentication() {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { type } = useParams();
    const navigation  = useNavigate()
    const { register, handleSubmit, watch } = useForm<formSubmissionProps>({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const email = watch("email");

    useEffect(() => {
        setErrorMessage(null);
    }, [email, type])

    const formSubmission = useCallback(async (data: formSubmissionProps) => {
        try {
            setLoading(true)

            if (type === "signup") {
                const response = await apiClass.post("/user/register", data);
                console.log("Response in FormSubmission:- ", response);
            } else if (type === "login") {
                const response = await apiClass.post("/user/login", data);
                console.log("Response in FormSubmission:- ", response);
                navigation("/")
            }

        } catch (error) {
            const err = error as Error
            console.log("Error in Data:- ", JSON.parse(err.message));
            const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number }

            setErrorMessage(errorMessageData.message)
        } finally {
            setLoading(false)
        }
    }, [type]);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            {/* form */}
            <div className="w-[30%] max-md:w-[95%] flex flex-col bg-[#353535]/100 text-white rounded-md backdrop-blur-3xl">
                <h1 className="font-bold text-2xl text-center">Form Submission</h1>
                <form className="commonflex flex flex-col w-full commanMargin commanPadding" onSubmit={handleSubmit(formSubmission)}>
                    <Input text="email"  {...register("email", { required: true })} placeholder="Enter your email..." />
                    <Input text="password" {...register("password", { required: true })} placeholder="Enter your password..." />
                    {errorMessage && <p className="font-bold text-center text-xl text-red-500">{errorMessage}</p>}
                    <Button style={{margin:"auto"}} text={`${loading ? "Loading" : "Submit"}`} type="submit" />

                    {
                        type === "signup" ?
                            <p className="font-bold text-lg marginCenter text-white">If you have already account <Link to={"/auth/login"} className="text-blue-500 font-bold hover:underline hover:decoration-blue-600 cursor-pointer">Login</Link></p> :
                            <p className="font-bold text-lg marginCenter text-white">If you have not account <Link to={"/auth/signup"} className="text-blue-500 font-bold hover:underline hover:decoration-blue-600 cursor-pointer">Signup</Link></p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Authentication