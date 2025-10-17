import React from "react";

type ImageByIdProps = {
  id: string | number;
  alt?: string;
  style?: React.CSSProperties;
  pasta?: string;
  formato?: string;
};

export default function ImageById({ id, alt = "", style = {}, pasta = "", formato = "png" }: ImageByIdProps) {
  const src = `../../public/${pasta}/${id}.${formato}`;
  return <img src={src} alt={alt || `Imagem ${id}`} style={style} />;
}
