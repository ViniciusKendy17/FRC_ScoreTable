import styles from "../Styles/Footer.module.css"; 

interface FooterProps {
  text?: string; 
}

export default function Footer({ text = "FRC Score Table" }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>{text}</p>
      </div>
    </footer>
  );
}
