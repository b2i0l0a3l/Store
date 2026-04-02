export default function GetImageFromBackEnd(imagePath: string) {
  if (!imagePath) return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/assets/images.png`;
  let normalizedImagePath = imagePath;
  if (normalizedImagePath && normalizedImagePath.includes("Assets/")) {
    normalizedImagePath = normalizedImagePath.substring(
      normalizedImagePath.indexOf("Assets/"),
    );
  }

  return normalizedImagePath
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${normalizedImagePath}`
    : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/assets/ProductImages/images.png`;

}
