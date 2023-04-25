import { defaultSeoImage } from "frontedUtils/consts/spaces/sns";
import { NextSeo } from "next-seo";

export default function Seo({ space, title, desc, banner }) {
  const imageCid = space?.seoImage || defaultSeoImage;
  const images = [
    {
      url: banner ?? `https://ipfs.fleek.co/ipfs/${imageCid}`,
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
