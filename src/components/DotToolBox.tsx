import { useEffect, useRef } from "react"

interface DotToolBoxProps {
    viewToolBox: boolean;
    setToolBoxView: React.Dispatch<React.SetStateAction<boolean>>;
    deletePost:(postId: string) => void;
    id:string;
    editPost: (postId: string) => void
}

function DotToolBox({ viewToolBox, setToolBoxView, deletePost, id, editPost }: DotToolBoxProps) {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const closingToolBox = (e: MouseEvent) => {
            const target = e.target as Node;
            if (divRef.current && !divRef.current.contains(target)) {                
                setToolBoxView(false);
            }
        };

        document.addEventListener("click", closingToolBox);

        return () => {
            document.removeEventListener("click", closingToolBox);
        };
    }, [viewToolBox]);

    return (
        <>
            {viewToolBox &&
                <div ref={divRef} className="bg-black text-white rounded-md absolute right-0 top-10 flex flex-col gap-1 w-[200px]" style={{ padding: "4px" }}>                  
                        <span onClick={()=> {
                            setToolBoxView(false);
                            editPost(id);
                        }} className="hover:bg-gray-700 rounded-md commanPadding cursor-pointer">
                            Edit
                        </span>
                        <span onClick={()=> {
                            setToolBoxView(false);
                            deletePost(id);
                        }} className="hover:bg-gray-700 rounded-md commanPadding cursor-pointer">
                            Delete
                        </span>
                 
                </div>
            }
        </>
    )
}

export default DotToolBox