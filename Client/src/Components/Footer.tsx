import "../styles/Footer.css";

interface FooterProps {
  text?: string; 
}

export default function Footer({ text = "FRC Score Table" }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footerContent">
        <p className="footerText">{text}</p>
      </div>
    </footer>
  );
}
