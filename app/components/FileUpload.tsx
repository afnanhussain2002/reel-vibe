"use client";
import React, { useRef, useState } from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";


interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video";
}

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;



export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null)


  const onError = (err:{message:string}) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };
  
  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };
  
  const handleUploadProgress = (progress) => {
    console.log("Progress", progress);
    
  };
  
  const handleUploadStart = (evt: ProgressEvent) => {
    console.log("Start", evt);
    setUploading(true);
    setError(null);
  };

  const validateFile = (file : File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please select a video file");
        return false
      }
      if (file.size > 100 * 1024 * 1024) {
          setError("Please select a file less than 100MB");
          return false
      }
    }else{
        const validTypes = ["image/png", "image/jpeg", "image/webp"];
        if (!validTypes.includes(file.type)) {
            setError("Please select a valid image file(png, jpeg, webp)");
            return false
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Please select a Image less than 5MB");
            return false
        }
    }
  }

  return (
    <div className="space-y-2">
     
        <IKUpload
          fileName={fileType === "image" ? "image" : "video"}
          useUniqueFileName={true}
          validateFile={validateFile}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleUploadProgress}
          onUploadStart={handleUploadStart}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}
          style={{display: 'none'}} // hide the default input and use the custom upload button
          ref={ikUploadRefTest}
        />
        <p>Custom Upload Button</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>}
     
      {/* ...other SDK components added previously */}
    </div>
  );
}