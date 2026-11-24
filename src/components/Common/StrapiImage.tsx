import { StrapiMedia, StrapiMediaSize } from "models/strapi";
import { getImageUrl } from "utils";

type StrapiImageProps = {
  image: StrapiMedia | null | undefined;
  size?: StrapiMediaSize;
  className?: string;
};

export const StrapiImage: React.FC<StrapiImageProps> = ({
  image,
  size,
  className,
}) => {
  const imageUrl = getImageUrl(image, size);

  if (!imageUrl) return null;

  return (
    <img
      alt={image?.alternativeText ?? ""}
      src={imageUrl}
      className={className}
    />
  );
};
