import { ReactComponent as LoadingSvg } from "public/imgs/icons/loading.svg";

export default function LoadingField({ children, isLoading }) {
  return isLoading ? <LoadingSvg /> : children;
}
