import styled, { css } from "styled-components";
import { ReactComponent as UploadSVG } from "./upload.svg";
import { useRef } from "react";

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

const BlendUploadSvg = styled(UploadSVG)`
  mix-blend-mode: multiply;
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

  ${({ hide }) =>
    hide &&
    css`
      opacity: 0;
    `}
  :hover {
    opacity: 1;
  }
`;

export default function LogoUploader({ imageFile, setImageFile }) {
  const inputEl = useRef();

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

        var fr = new FileReader();
        fr.onload = function () {
          setImageFile(fr.result);
        };
        fr.readAsDataURL(image);
      }
    }
  };

  return (
    <Wrapper>
      {imageFile && (
        <Layer>
          <img
            style={{ objectFit: "cover" }}
            width="100%"
            height="100%"
            src={imageFile}
            alt=""
          />
        </Layer>
      )}
      <Layer hide={!!imageFile} onClick={handleSelectFile}>
        <BlendUploadSvg />
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
