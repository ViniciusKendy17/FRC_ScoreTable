import styles from "../Styles/Header.module.css";
import ImageById from "./ImageById";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Qualificatória" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.tipografia}>{title}</h1>
      <ImageById
        alt="Logo Evento"
        id={61}
        style={{ width: "250px", height: "100%", aspectRatio: "2213 / 739" }}
        pasta="Logo"
        formato="svg"
      />
    </header>
  );
}
