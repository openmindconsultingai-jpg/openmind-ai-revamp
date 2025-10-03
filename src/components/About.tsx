import { Brain, Target, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">O nas</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Jesteśmy zespołem pasjonatów technologii AI, którzy wierzą w demokratyzację dostępu do innowacyjnych narzędzi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Ekspertyza</h3>
              <p className="text-muted-foreground">
                Głęboka wiedza o możliwościach AI i jej praktycznym zastosowaniu
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Precyzja</h3>
              <p className="text-muted-foreground">
                Dopasowane rozwiązania, które rzeczywiście odpowiadają na Twoje potrzeby
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Innowacja</h3>
              <p className="text-muted-foreground">
                Najnowsze technologie w służbie praktycznych zastosowań
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
