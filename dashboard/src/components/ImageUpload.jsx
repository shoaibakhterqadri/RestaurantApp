import { useState } from "react";

const ImageUpload = ({ name, value, onBlur, setField, image, setImage }) => {
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    convertImageIntoBase64(file);
  };
  const convertImageIntoBase64 = (file) => {
    const imageReader = new FileReader();
    if (file) {
      imageReader.readAsDataURL(file);
      setImage();
      imageReader.onloadend = () => {
        setImage(imageReader.result);
        setField("image", imageReader.result);
      };
    }
  };
  return (
    <div>
      <div className="p-4 bg-white w-max bg-whtie m-auto rounded-lg">
        <div
          className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
          style={{ width: "450px" }}
        >
          <img src={image} alt="dish" style={{ width: "100%", height: 250 }} />
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input
                className="text-sm cursor-pointer w-36 hidden"
                type="file"
                accept="image/"
                name={name}
                onChange={handleProductImageUpload}
                onBlur={onBlur}
              />
              <div className="text bg-indigo-600 text-white border border-gray-300 rounded cursor-pointer p-1 px-3 hover:bg-indigo-500">
                Select
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
