import { memo } from "react";

function Caret({ down = true, isHover = false }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${down ? 0 : 180})`}
    >
      <g clipPath="url(#clip0_8668_42171)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.84315 9.15685L6.34315 10.6569L12 16.3137L17.6569 10.6569L16.1569 9.15685L12 13.3137L7.84315 9.15685Z"
          fill={isHover ? "#506176" : "#A1A8B3"}
        />
      </g>
      <defs>
        <clipPath id="clip0_8668_42171">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default memo(Caret);
