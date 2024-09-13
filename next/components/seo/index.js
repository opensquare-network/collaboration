import { NextSeo } from "next-seo";
import { getOpenGraphImages } from "./getOpenGraphImages";

export default function Seo({ space, title, desc, banner }) {
  const ogImage = getOpenGraphImages(space?.seoCoverFilename);
  const images = [
    {
      url: banner ?? ogImage.large,
      width: 1200,
      height: 628,
    },
  ];

  const finalTitle = title ?? "OpenSquare off-chain voting";
  return (
    <NextSeo
      title={finalTitle}
      description={desc}
      openGraph={{
        url: "https://www.opensquare.io/",
        title: finalTitle,
        description: desc,
        images,
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
}
