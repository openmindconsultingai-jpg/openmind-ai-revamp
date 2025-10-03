const Footer = () => {
  return (
    <footer className="border-t border-border py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground">
            © 2025 OpenMind AI Consulting. Wszystkie prawa zastrzeżone.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Prywatność i dane
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
