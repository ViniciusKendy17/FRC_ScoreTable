import React from "react";

type ImageByIdProps = {
  id: string | number;
  alt?: string;
  style?: React.CSSProperties;
  pasta?: string;
};

export default function ImageById({ id, alt = "", style = {}, pasta = "" }: ImageByIdProps) {
  const src = `../../public/${pasta}/${id}.png`; // caminho relativo à pasta public
  return <img src={src} alt={alt || `Imagem ${id}`} style={style} />;
}
