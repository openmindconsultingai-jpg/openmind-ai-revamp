const Footer = () => {
  const scrollToPrivacy = () => {
    const element = document.getElementById('privacy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground">
            © 2025 OpenMind AI Consulting. Wszystkie prawa zastrzeżone.
          </p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToPrivacy}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Polityka prywatności
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
