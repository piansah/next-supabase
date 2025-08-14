import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function MenuImage({ src, alt }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={1080}
      className="w-full h-[70vh] object-cover rounded-lg"
    />
  );
}
