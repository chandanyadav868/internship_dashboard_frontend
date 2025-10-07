import { useForm, Controller } from "react-hook-form"
import Input from "./Input";
import EditIcon from '@mui/icons-material/Edit';
import Button from "./Button";
import { useEffect, useState, type ChangeEvent } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { apiClass } from "../Api/Apiclass";
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from "@imagekit/react";

interface UserProfileUpdateProps {
    avatar: string;
    username: string;
    email: string;
}

function UserProfileUpdate() {
    const [loading, setLoading] = useState<boolean>(false);
    const { authUser, imagekitSetup, setAuthUser } = useContextProvider()
    const { control, handleSubmit, setValue } = useForm<UserProfileUpdateProps>({
        defaultValues: {
            avatar: "",
            email: "",
            username: ""
        }
    });

    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(undefined);
    const [imageUploading, setImageUploading] = useState<boolean>(false);

    useEffect(() => {
        if (!authUser) return
        console.log(authUser);

        setValue("email", authUser.email ?? "");
        setValue("username", authUser.username ?? "");
        if (authUser.avatar) {
            setUploadedImageUrl(authUser.avatar)
        }
    }, [])

    const profileUpdateForm = async (data: UserProfileUpdateProps) => {
        try {
            console.log("data:- ", data);
            const updatingData = {...data, avatar:uploadedImageUrl}
            setLoading(true);
            const userUpdating = await apiClass.put("/user/update", updatingData);
            console.log(userUpdating);
            setAuthUser(userUpdating.data)

        } catch (error) {

        } finally {
            setLoading(false)
        }

    }

    const imageUploader = async (e: ChangeEvent<HTMLInputElement>) => {

        try {
            setImageUploading(true)
            console.log(e.target.files);
            if (!e.target.files) {
                throw new Error("No File Found!")
            }
            const imageKitUpload = await imagekitSetup();

            if (!imageKitUpload) throw new Error("Not get the expire, public, token etc.. from backend")
            const { expire, publicKey, signature, token } = imageKitUpload;

            console.log(`{ expire, publicKey, signature, token }`, { expire, publicKey, signature, token });


            const file = e.target.files[0]
            if (!imageKitUpload) return

            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name
            });

            console.log("Upload response:", uploadResponse);
            setUploadedImageUrl(uploadResponse.url);

        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        } finally {
            setImageUploading(false);
        }
    }

    console.log(uploadedImageUrl);


    return (
        <div>
            <form onSubmit={handleSubmit(profileUpdateForm)} className="w-[400px] flex gap-4 justify-center items-center flex-col marginCenter max-md:w-auto" >

                {/* imageShower */}
                {imageUploading ?
                    <div className='w-[100px] h-[100px] rounded-full bg-white relative animate-pulse'>

                    </div>
                    :
                    uploadedImageUrl &&
                    <div className='w-[100px] h-[100px] rounded-full bg-white relative'>
                        <label title="Change Profile" onClick={(e) => e.stopPropagation()} htmlFor="userImage" className="absolute cursor-pointer -right-4 -top-2"  >
                            <Input
                                onChange={(e) => {
                                    e.stopPropagation()
                                    imageUploader(e)
                                }
                                }
                                requiredField={false}
                                id="userImage"
                                text=""
                                accept="image/*"   // 👈 accept image files
                                type="file"
                                className="hidden"
                            />
                            <EditIcon />
                        </label>
                        <img src={`${uploadedImageUrl}`} alt="" className='w-full h-full object-cover rounded-full' />
                    </div>
                }

                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <>
                            <Input {...field} text="Email" type="email" className="bg-gray-900 text-white font-semibold" />
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <>
                            <Input {...field} requiredField={false} text="Username" type="text" className="bg-gray-900 text-white font-semibold" />
                        </>
                    )}
                />

                {/* {errorMessage && <p className="font-bold text-center text-xl text-red-500">{errorMessage}</p>} */}
                <Button style={{ margin: "auto" }} text={`${loading ? "Updating..." : "Update"}`} type="submit" />
            </form>
        </div>
    )
}

export default UserProfileUpdate