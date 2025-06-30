import ErrorContent from "@/components/errorContent";

export default function FourOFour() {
  return (
    <ErrorContent
      statusCode={404}
      title="Sorry"
      subTitle="Page Not Found"
      description="Sorry. the content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link."
    />
  );
}
