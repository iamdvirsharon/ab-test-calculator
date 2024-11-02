import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SampleSizeCalculator } from '@/components/calculator/SampleSizeCalculator';
import { SignificanceCalculator } from '@/components/calculator/SignificanceCalculator';
import { Calculator, ChartBar } from 'lucide-react';
import { LeadGeneration } from '@/components/LeadGeneration';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">A/B Test Calculator</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Optimize your experiments with statistical confidence
            </p>
          </div>

          <Tabs defaultValue="significance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="significance" className="space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Significance Calculator</span>
              </TabsTrigger>
              <TabsTrigger value="duration" className="space-x-2">
                <ChartBar className="h-4 w-4" />
                <span>Duration Calculator</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="significance" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Analyze your test results and calculate statistical significance
              </div>
              <SignificanceCalculator />
            </TabsContent>

            <TabsContent value="duration" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Calculate the required sample size and test duration for your A/B test
              </div>
              <SampleSizeCalculator />
            </TabsContent>
          </Tabs>

          <LeadGeneration />
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <a 
          href="https://linktr.ee/dvirsharon" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Made by Dvir Sharon
        </a>
      </footer>
    </div>
  );
}

export default App;