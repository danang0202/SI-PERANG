import { Avatar } from "@mantine/core";
const AvatarImage= ({
  src,
  alt,
  name,
  colorIfRandom,
  backgroundColorIfRandom,
  size,
  ...others
}) => {
  const random = `https://ui-avatars.com/api/?background=${backgroundColorIfRandom?.replace("#", "") || "random"}&name=${name || alt}&size=128${colorIfRandom ? "&color=" + colorIfRandom.replace("#", "") : ""}`;

  return (
    <Avatar src={src || random} alt={alt || name} {...others} size={size ? size : "md"} />
  );
};

export default AvatarImage;
