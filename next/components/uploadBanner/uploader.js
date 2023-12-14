import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Flex } from "@osn/common-ui";
import nextApi from "services/nextApi";
import { LoadingIcon } from "@osn/common-ui";
import { ReactComponent as Upload } from "../../public/imgs/icons/upload.svg";

const UploadIcon = styled(Upload)`
  flex-basis: 100%;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;

  .hidden {
    display: none;
  }
`;

const UploadArea = styled(Flex)`
  padding-top: 16px;
  padding-bottom: 16px;
  justify-content: center;
  border: 1px dashed;
  border-color: ${(props) => props.theme.neutralGrey300};
`;

const Tips = styled.ul`
  padding: 0;
  list-style: none;
  margin: 8px 0;

  li {
    color: ${(props) => props.theme.darkMinor};
    font-size: 14px;
    line-height: 24px;

    &::before {
      content: "\\2022";
      padding: 0 8px;
    }
  }
`;
const Hint = styled.span`
  margin-top: 8px;
  display: flex;
  color: ${(props) => props.theme.textTertiary};
  line-height: 24px;
`;

const Button = styled.button`
  all: unset;
  color: ${(props) => props.theme.primaryTurquoise500};
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 19.6px;
`;

const SelectFile = styled(Button)`
  margin-left: 8px;
`;

const Delete = styled(Button)`
  margin-top: 8px;
  flex-basis: 100%;
  margin-left: calc(50% - 20px);
`;
const UploadTip = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const BannerPreview = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    height: 115px;
  }
`;

function Uploader({ setBannerUrl }) {
  const inputEl = useRef();
  const [dragging, setDragging] = useState(false);
  const [currentBanner, setCurrentBanner] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSelectFile = () => {
    inputEl.current?.click();
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const { files } = e.dataTransfer;
    uploadImage(files);
  };

  const onSelectFile = (e) => {
    e.preventDefault();
    const { files } = e.target;
    uploadImage(files);
  };

  const resetSelectedFile = () => {
    if (inputEl.current) {
      inputEl.current.value = "";
    }
  };

  const uploadImage = (files) => {
    if (files && files.length) {
      const image = files[0];
      if (!/image\/\w+/.exec(image.type)) {
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("banner", image, image.name);
      nextApi
        .postFormData("ipfs/files", formData)
        .then(({ result, error }) => {
          if (result) {
            setCurrentBanner(result.url);
            setBannerUrl(result.hash);
          }
          if (error) {
            // dispatch(newErrorToast(error.message));
          }
        })
        .finally(() => {
          setUploading(false);
          resetSelectedFile();
        });
    }
  };

  const handleRemoveBanner = () => {
    setCurrentBanner(null);
    setBannerUrl("");
    resetSelectedFile();
  };

  return (
    <Wrapper>
      <UploadArea
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        active={dragging}
      >
        {uploading ? (
          <LoadingIcon />
        ) : (
          <>
            {currentBanner ? (
              <BannerPreview>
                <img src={currentBanner} alt="" />
                <Delete onClick={handleRemoveBanner}>Delete</Delete>
              </BannerPreview>
            ) : (
              <UploadTip>
                <UploadIcon onClick={handleSelectFile} />
                <Hint>
                  <span>Drop image or</span>
                  <SelectFile onClick={handleSelectFile}>Upload</SelectFile>
                </Hint>
              </UploadTip>
            )}
          </>
        )}
      </UploadArea>
      <Tips>
        <li>We recommend a 16:9 image.</li>
        <li>The banner will be a shared preview on social media.</li>
      </Tips>

      <input
        className="hidden"
        type="file"
        ref={inputEl}
        accept="image/*"
        onChange={onSelectFile}
      />
    </Wrapper>
  );
}

export default Uploader;
