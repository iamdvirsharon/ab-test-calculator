import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { calculateSampleSize, calculateTestDuration } from '@/lib/statistics';

export function SampleSizeCalculator() {
  const [baselineConversion, setBaselineConversion] = useState<number>(5);
  const [mde, setMde] = useState<number>(10);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(95);
  const [dailyTraffic, setDailyTraffic] = useState<number>(1000);

  const sampleSize = calculateSampleSize(baselineConversion, mde, confidenceLevel);
  const testDuration = calculateTestDuration(sampleSize, dailyTraffic);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Baseline Conversion Rate (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Your current conversion rate before running the test
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={baselineConversion}
            onChange={(e) => setBaselineConversion(Number(e.target.value))}
            min={0}
            max={100}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Minimum Detectable Effect (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  The smallest improvement you want to be able to detect
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={mde}
            onChange={(e) => setMde(Number(e.target.value))}
            min={1}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Confidence Level (%)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  How confident you want to be in your results (typically 95%)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(Number(e.target.value))}
            min={80}
            max={99}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Daily Traffic</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Average number of visitors per day to the test page
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            value={dailyTraffic}
            onChange={(e) => setDailyTraffic(Number(e.target.value))}
            min={1}
            step={1}
          />
        </div>

        <div className="mt-6 space-y-4 rounded-lg bg-muted p-4">
          <div>
            <div className="text-sm font-medium">Required Sample Size</div>
            <div className="text-2xl font-bold">{sampleSize.toLocaleString()} visitors per variant</div>
            <div className="mt-1 text-sm text-muted-foreground">
              This is the minimum number of visitors needed for each variant to detect a {mde}% change with {confidenceLevel}% confidence.
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Estimated Test Duration</div>
            <div className="text-2xl font-bold">{testDuration} days</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Based on your daily traffic of {dailyTraffic.toLocaleString()} visitors.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}