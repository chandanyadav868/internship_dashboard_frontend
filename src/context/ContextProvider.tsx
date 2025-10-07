import React, { createContext, useContext, useState, } from "react"
import { apiClass } from "../Api/Apiclass";

interface CreateContextProps {
    authUser: Record<string, any> | undefined;
    setAuthUser: React.Dispatch<React.SetStateAction<Record<string, any> | undefined>>
    authenticationUser: () => Promise<void>;
    imageKitUpload: ImageKitFetchedProps | undefined;
    setImageKitUpload: React.Dispatch<React.SetStateAction<ImageKitFetchedProps | undefined>>;
    imagekitSetup: () => Promise<ImageKitFetchedProps | undefined>;
    setUserPosts: React.Dispatch<React.SetStateAction<[] | userPostProps[]>>
    userPost: [] | userPostProps[];
    likesPosts: (postId: string) => void;
    disLikesPosts: (postId: string) => void;
    deletePost: (postId: string) => void;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formOpen: boolean;
    editPost: (postId: string) => void;
    formPreviousData: {} | userPostProps;
    setFormPreviousData: (value: React.SetStateAction<{} | Partial<Pick<userPostProps, "image" | "description" | "tags">>>) => void;
    logoutUser: () => Promise<void>;
    setFiltringData: React.Dispatch<React.SetStateAction<[] | userPostProps[]>>;
    filtringData: [] | userPostProps[]
}

export interface ImageKitFetchedProps {
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
}

export interface userPostProps {
    _id: string
    description: string;
    image: string | undefined;
    likeNumber: number
    disLikeNumber: number
    tags: string
    userLiked: boolean,
    userDisliked: boolean
}

export const store = createContext<CreateContextProps | null>(null);


export default function ContextProvider({ children }: { children: React.ReactNode }) {
    const [authUser, setAuthUser] = useState<Record<string, any> | undefined>();
    const [imageKitUpload, setImageKitUpload] = useState<ImageKitFetchedProps | undefined>(undefined);
    
    const [userPost, setUserPosts] = useState<userPostProps[] | []>([{
        _id: "1234",
        tags: "posts",
        description: "this is the best int he work of town",
        image: "https://ik.imagekit.io/o66qwandt/Screenshot_2025-07-21_151634_vfGaL-uE8n.png",
        disLikeNumber: 20,
        likeNumber: 0,
        userLiked: false,
        userDisliked: false
    }]);

    const [filtringData,setFiltringData] = useState<userPostProps[] | []>([]);

    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [formPreviousData, setFormPreviousData] = useState<Partial<Pick<userPostProps, "description" | "tags" | "image">> | {}>({})

    const likesAndDislikeApiCall = async (postId: string, likesDislikeData: Record<string, string>) => {
        try {
            const likesDislikeResponse = await apiClass.post(`/post/like-dislikes/${postId}`, likesDislikeData);
            console.log(likesDislikeResponse);
        } catch (error) {
            const err = error as Error
            console.log("Error in Data:- ", JSON.parse(err.message));
            const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number };
            console.log(errorMessageData);
        }
    }


    const likesPosts = async (postId: string) => {
        let likesDislikeData = {};
        const selectedUserPost = userPost.map((post) => {
            if (post._id === postId) {
                let disLikesData = post.userDisliked && { userDisliked: false, disLikeNumber: post.disLikeNumber - 1 };


                if (post.userLiked) {
                    likesDislikeData = { like: false, dislike: post.userDisliked &&  false  };
                    return { ...post, userLiked: false, likeNumber: post.likeNumber - 1, ...disLikesData ?? {} }
                } else {
                    likesDislikeData = { like: true, dislike: post.userDisliked && false  };
                    return { ...post, userLiked: true, likeNumber: post.likeNumber + 1, ...disLikesData ?? {} }
                }
            }
            return post
        });
        setUserPosts(selectedUserPost);
        setFiltringData(selectedUserPost);

        // likes
        await likesAndDislikeApiCall(postId, likesDislikeData)
    }

    const disLikesPosts = async (postId: string) => {
        let likesDislikeData = {};
        const selectedUserPost = userPost.map((post) => {
            if (post._id === postId) {
                
                let likesData = post.userLiked && { userLiked: false, likeNumber: post.likeNumber - 1 };

                if (post.userDisliked) {
                    likesDislikeData = { like: post.userLiked &&  false , dislike: false };
                    return { ...post, userDisliked: false, disLikeNumber: post.disLikeNumber - 1, ...likesData ?? {} }
                } else {
                    likesDislikeData = { like: post.userLiked &&  false , dislike: true };
                    return { ...post, userDisliked: true, disLikeNumber: post.disLikeNumber + 1, ...likesData ?? {} }
                }
            }
            return post
        });
        setUserPosts(selectedUserPost)
        setFiltringData(selectedUserPost)

        // dislikes
        await likesAndDislikeApiCall(postId, likesDislikeData)
    }

    const deletePost = async (postId: string) => {
        try {
            const existingPost = userPost.filter((post) => post._id !== postId);
            const deleteResponse = await apiClass.delete(`/post/delete/${postId}`);
            console.log(deleteResponse);
            setUserPosts(existingPost);
            setFiltringData(existingPost)
        } catch (error) {
            const err = error as Error
            console.log("Error in Data:- ", JSON.parse(err.message));
            const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number };
            console.log(errorMessageData);
        }

    }

    const editPost = async (postId: string) => {
        const existingPost = userPost.find((post) => post._id === postId);
        console.log("editPost:- ", existingPost);
        setFormPreviousData(existingPost ?? {})
        setFormOpen(true)
    }

    const authenticationUser = async () => {
        try {
            console.log("User is going to fetched");

            const response = await apiClass.get("/user/find");
            // console.log(response);
            setAuthUser(response.data)

        } catch (error) {
            const err = error as Error
            throw new Error(err.message);
        }
    }

    // user successfully logout from application
    const logoutUser = async () => {
        try {
            await apiClass.get("/user/logout");
            setAuthUser(undefined)
        } catch (error) {
            const err = error as Error
            console.log("Error in Data:- ", JSON.parse(err.message));
            const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number };
            console.log(errorMessageData);
        }
    }

    const imagekitSetup = async () => {
        try {
            document.body.style.overflow = "hidden";
            const response = await apiClass.get("/imagekit/authentication");
            const imageKit = response.data as ImageKitFetchedProps;

            return imageKit
        } catch (error) {
            const err = error as Error
            console.log("Error in Data:- ", JSON.parse(err.message));
            const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number };
            console.log(errorMessageData);
        }
    }

    return (
        <store.Provider value={{ authUser, setAuthUser, authenticationUser, imageKitUpload, setImageKitUpload, imagekitSetup, userPost, setUserPosts, disLikesPosts, likesPosts, deletePost, formOpen, setFormOpen, editPost, formPreviousData, setFormPreviousData, logoutUser, filtringData, setFiltringData }}>
            {children}
        </store.Provider>
    )
}


export const useContextProvider = () => {

    const storeValue = useContext(store);
    if (!storeValue) {
        console.log("Error in intialising the Store value:- ", storeValue);
        throw new Error("Error in intialising the Store value:- ")
    }
    return storeValue

}
