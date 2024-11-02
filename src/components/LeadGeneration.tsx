import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function LeadGeneration() {
  return (
    <Card className="mt-8 p-6">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Need A/B test guidance?</h2>
        <p className="text-muted-foreground">Let's optimize your experiments.</p>
        
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Tests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">+45%</div>
            <div className="text-sm text-muted-foreground">Avg. Lift</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">$50M+</div>
            <div className="text-sm text-muted-foreground">Impact</div>
          </div>
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          asChild
        >
          <a
            href="https://zcal.co/dvirsharon/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule a Free Strategy Session
          </a>
        </Button>
      </div>
    </Card>
  );
}