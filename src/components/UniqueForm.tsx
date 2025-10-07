import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';
import { Controller, useForm } from 'react-hook-form';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { apiClass } from '../Api/Apiclass';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useContextProvider } from '../context/ContextProvider';
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from "@imagekit/react"
import CloseIconComponents from './CloseIconComponent';

interface FormSubmissionProps {
  description: string;
  tags: string,
  image?: string | undefined
}

function UniqueForm({ description = "", tags = "", image }: Partial<FormSubmissionProps>) {
  const { register, handleSubmit, watch, setValue, control } = useForm<FormSubmissionProps>({
    defaultValues: {
      description: "",
      tags: ""
    }
  });

  console.log(description, tags, image);


  const [descriptionNumber, setDescriptionNumber] = useState<number>(2000);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const descriptionValue = watch("description");
  const { imagekitSetup, setFormPreviousData, setFormOpen, formPreviousData, setUserPosts, setFiltringData } = useContextProvider();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const imagekitSetupFunCalling = async () => {
      document.body.style.overflow = "hidden";
      setValue("description", description)
      if (image) {
        setUploadedImageUrl(image)
      }
      setValue("tags", tags)
    }
    imagekitSetupFunCalling();
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    setDescriptionNumber((2000 - (descriptionValue ? descriptionValue.length : 0)))
  }, [descriptionValue])


  const formSubmissionPost = useCallback(async (data: FormSubmissionProps) => {
    try {
      console.log(data);
      console.log({ ...data, image: uploadedImageUrl });
      const updatingData = { ...data, image: uploadedImageUrl }

      setLoading(true);
      if ("_id" in formPreviousData) {

        const resposneUpdating = await apiClass.post(`/post/update/${formPreviousData?._id}`, { ...updatingData });

        setUserPosts((prev) => {
          const updatedData = prev.map((post) => post._id === formPreviousData?._id ? ({ ...post, ...updatingData }) : post)
          return updatedData
        })
        setFiltringData((prev) => {
          const updatedData = prev.map((post) => post._id === formPreviousData?._id ? ({ ...post, ...updatingData }) : post)
          return updatedData
        })

        console.log(resposneUpdating);
      } else {
        const resposne = await apiClass.post("/post/create", { ...updatingData });
        console.log(resposne);
        setUserPosts((prev) => [{...resposne.data??{}},...prev])
        setFiltringData((prev) => [{...resposne.data??{}},...prev])
      }

    } catch (error) {
      const err = error as Error
      console.log("Error in Data:- ", JSON.parse(err.message));
      const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number }
      console.log(errorMessageData);
    } finally {
      setLoading(false)
    }
  }, [uploadedImageUrl]);


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

  return (
    <div className='flex bg-black/5 backdrop-blur-sm h-screen w-svw fixed top-0 justify-center items-center' style={{ zIndex: 50 }}>
      <div className="max-md:w-full w-[600px] bg-gray-900 rounded-md h-fit my-auto">
        <div className='commanPadding'>
          <form onSubmit={handleSubmit(formSubmissionPost)}>
            <div className="text-white cursor-pointer font-bold rounded-full commanPadding flex justify-between">
              <Button text={loading ? "Posting..." : "Post"} type='submit' className='bg-green-700 hover:bg-green-800' />
              <CloseIcon className='w-[40px] h-[40px] bg-gray-600 rounded-full' onClick={() => {
                setFormPreviousData({})
                setFormOpen(false)
              }} style={{ padding: "4px" }} />
            </div>

            {/* this is the  select drop down, controller is used if you are using other library components to controller otherwise you can use register for your own components control*/}
            <Controller
              name='tags'
              control={control}
              defaultValue=''
              rules={{ required: true }}
              render={({ field}) => (

                <FormControl sx={{ m: 1, minWidth: 120, border: "none" }} className='bg-gray-600 rounded-md outline-0'>
                  <InputLabel id="demo-simple-select-helper-label" sx={{ color: "white" }}>Tags</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Age"
                    sx={{
                      color: "white",                  // text color
                      backgroundColor: "#374151",      // Tailwind gray-700
                      "& .MuiSelect-icon": {
                        color: "white",                // dropdown arrow color
                      },
                    }}
                    {...field}
                  >
                    {/* comming soon Features */}
                    {/* <MenuItem value={"tasks"}>Tasks</MenuItem>
                    <MenuItem value={"notes"}>Notes</MenuItem> */}
                    <MenuItem value={"posts"}>Posts</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <textarea className=' textAreaOverflow w-full min-h-[250px] commanPadding text-white placeholder:text-gray-300 outline-0 focus:outline-1 resize-none bg-gray-800 rounded-md focus:outline-gray-300' placeholder='Describe your thoughts...' {...register("description", { required: true })} />

            {/* imageShower */}
            {imageUploading ?
              <div className='w-[100px] h-[100px] rounded-md bg-white relative animate-pulse'>

              </div>
              :
              uploadedImageUrl &&
              <div className='w-[100px] h-[100px] rounded-md bg-white relative'>
                <CloseIconComponents funCall={() => setUploadedImageUrl(undefined)} />
                <img src={`${uploadedImageUrl}`} alt="" className='w-full h-full object-cover' />
              </div>
            }

            <div className='flex items-center gap-2'>
              <div className='w-full h-0.5 bg-gray-700 rounded-full'></div>
              <span className='text-white'>{descriptionNumber}</span>
            </div>

          </form>
          <div className="text-white font-bold rounded-md commanPadding flex justify-between items-center">
            <label htmlFor="image" className='cursor-pointer'>
              <AddPhotoAlternateIcon />
            </label>
            <input onChange={(e) => imageUploader(e)} id='image' accept='image/*' type='file' alt='image' className='hidden' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniqueForm