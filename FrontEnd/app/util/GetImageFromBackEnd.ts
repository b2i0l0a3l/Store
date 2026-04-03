export default function GetImageFromBackEnd(imagePath: string) {
  if (!imagePath) return ``;
  let normalizedImagePath = imagePath;
  const backend = `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "").replace("/v1","")}/${normalizedImagePath}`;
  return backend;
}
