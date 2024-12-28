import { getImageUrl } from "utils";

type StrapiImageProps = {
  image: any;
  size?: "large" | "medium" | "small" | "thumbnail";
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
    <img alt={image.alternativeText} src={imageUrl} className={className} />
  );
};
