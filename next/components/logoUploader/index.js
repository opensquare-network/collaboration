import styled from "styled-components";
import { ReactComponent as UploadSVG } from "./upload.svg";
import { useRef, useState } from "react";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 80px;
  left: 0px;
  top: 0px;

  background: #fbfcfe;

  border: 1px solid #e2e8f0;
  border-radius: 50%;
  overflow: hidden;
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border-radius: 50%;
`;

export default function LogoUploader({ imageFile, setImageFile }) {
  const inputEl = useRef();
  const [imageDataUrl, setImageDataUrl] = useState(imageFile);

  const handleSelectFile = () => {
    inputEl.current.vaule = "";
    inputEl.current?.click();
  };

  const onSelectFile = (e) => {
    e.preventDefault();
    const { files } = e.target;
    uploadImage(files);
  };

  const uploadImage = (files) => {
    if (files && files.length) {
      const image = files[0];
      if (!/image\/\w+/.exec(image.type)) {
        return;
      }

      if (FileReader && files && files.length) {
        const image = files[0];
        if (!/image\/\w+/.exec(image.type)) {
          return;
        }

        setImageFile(image);

        var fr = new FileReader();
        fr.onload = function () {
          setImageDataUrl(fr.result);
        };
        fr.readAsDataURL(image);
      }
    }
  };

  return (
    <Wrapper>
      {imageDataUrl && (
        <Layer>
          <img
            style={{ objectFit: "cover" }}
            width="100%"
            height="100%"
            src={imageDataUrl}
            alt=""
          />
        </Layer>
      )}
      <Layer onClick={handleSelectFile}>
        <UploadSVG />
      </Layer>
      <input
        style={{ display: "none" }}
        type="file"
        ref={inputEl}
        accept="image/*"
        onChange={onSelectFile}
      />
    </Wrapper>
  );
}
