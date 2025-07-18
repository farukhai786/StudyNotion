import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({
  name,
  label,
  register,
  setValue,
  getValues,
  errors,
  video = false,
  viewData = null,
  editData = null,
  isRequired = true,
}) => {
 
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const MAX_FILE_SIZE = video ? 12 * 1024 * 1024 : 6 * 1024 * 1024;


  useEffect(() => {
    let revoke;
    const stored = getValues(name) || viewData || editData;

    if (stored) {
      if (typeof stored === "string") {
        setPreview(stored);
        setValue(name, stored);
      } else if (stored instanceof FileList && stored.length) {
        revoke = URL.createObjectURL(stored[0]);
        setPreview(revoke);
      } else if (stored instanceof File) {
        revoke = URL.createObjectURL(stored);
        setPreview(revoke);
      }
    }

    return () => revoke && URL.revokeObjectURL(revoke);
  }, [getValues, name, setValue, viewData, editData]);


  const loadFile = (file) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE)
      return alert(`File must be under ${video ? "12 MB" : "6 MB"}.`);

    const url = URL.createObjectURL(file);
    setPreview(url);
    setValue(name, file, { shouldValidate: true });
  };

  
  const {
    ref: rhfRef,
    ...restRegister
  } = register(name, {
    validate: (v) =>
      !isRequired ||
      (v &&
        (typeof v === "string" ||
          v instanceof File ||
          (v instanceof FileList ? v.length > 0 : v?.length > 0))) ||
      `${label} is required`,
  });


  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-[#E5E7EB]">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <div
        className="
          relative flex h-[200px] w-full cursor-pointer select-none
          flex-col items-center justify-center
          rounded-md border border-dashed border-[#525C6C] bg-[#2C333F]
          transition hover:border-[#FFD60A]/70
        "
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          loadFile(e.dataTransfer.files[0]);
        }}
      >
     
        {preview ? (
          video ? (
            <video
              src={preview}
              controls
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="h-full w-full rounded-md object-cover"
            />
          )
        ) : (
        
          <>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2C333F]">
              <FiUploadCloud size={20} className="text-[#FFD60A]" />
            </div>
            <p className="text-center text-sm text-[#C4CBD2]">
              Drag and drop {video ? "a video" : "an image"}, or{" "}
              <span className="cursor-pointer font-medium text-[#FFD60A] underline">
                Browse
              </span>
            </p>
            <p className="mt-1 text-xs text-[#707882]">
              Max {video ? "12 MB each (1280×720 or less)" : "6MB each (1280×720 or less)"}
            </p>

            {/* bullet hints */}
            {!video && (
              <p className="mt-1 flex gap-2 text-[10px] text-[#707882]">
                <span>• Aspect ratio&nbsp;16:9</span>
                <span className="hidden sm:inline">• Recommended size&nbsp;1024×576</span>
              </p>
            )}
          </>
        )}

        <input
          type="file"
          accept={video ? "video/*" : "image/*"}
          hidden
          {...restRegister}
          ref={(el) => {
            rhfRef(el);
            fileRef.current = el;
          }}
          onChange={(e) => loadFile(e.target.files[0])}
        />
      </div>

      {errors[name] && (
        <span className="text-xs text-[#FF5E5E]">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Upload;
