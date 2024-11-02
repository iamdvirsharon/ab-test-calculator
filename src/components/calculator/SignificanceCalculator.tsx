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
import { calculatePValue } from '@/lib/statistics';
import { cn } from '@/lib/utils';

export function SignificanceCalculator() {
  const [controlVisitors, setControlVisitors] = useState<number>(1000);
  const [controlConversions, setControlConversions] = useState<number>(100);
  const [variantVisitors, setVariantVisitors] = useState<number>(1000);
  const [variantConversions, setVariantConversions] = useState<number>(120);

  const controlRate = (controlConversions / controlVisitors) * 100;
  const variantRate = (variantConversions / variantVisitors) * 100;
  const relativeChange = ((variantRate - controlRate) / controlRate) * 100;
  const pValue = calculatePValue(
    controlVisitors,
    controlConversions,
    variantVisitors,
    variantConversions
  );
  
  const isSignificant = pValue < 0.05;
  const variantWins = isSignificant && variantRate > controlRate;
  const controlWins = isSignificant && controlRate > variantRate;

  return (
    <Card className="p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className={cn(
          "space-y-4 rounded-lg transition-colors",
          controlWins && "bg-green-50/50 p-4 dark:bg-green-950/20"
        )}>
          <h3 className="font-semibold">Control (A)</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Visitors</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Total number of visitors in the control group
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="number"
              value={controlVisitors}
              onChange={(e) => setControlVisitors(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Conversions</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Number of successful conversions in the control group
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="number"
              value={controlConversions}
              onChange={(e) => setControlConversions(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Conversion Rate: {controlRate.toFixed(2)}%
          </div>
        </div>

        <div className={cn(
          "space-y-4 rounded-lg transition-colors",
          variantWins && "bg-green-50/50 p-4 dark:bg-green-950/20"
        )}>
          <h3 className="font-semibold">Variant (B)</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Visitors</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Total number of visitors in the variant group
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="number"
              value={variantVisitors}
              onChange={(e) => setVariantVisitors(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Conversions</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Number of successful conversions in the variant group
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="number"
              value={variantConversions}
              onChange={(e) => setVariantConversions(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Conversion Rate: {variantRate.toFixed(2)}%
          </div>
        </div>

        <div className="md:col-span-2 mt-6 space-y-4 rounded-lg bg-muted p-4">
          <div>
            <div className="text-sm font-medium">Relative Change</div>
            <div className={cn(
              "text-2xl font-bold transition-colors",
              relativeChange > 0 ? "text-green-600 dark:text-green-400" : 
              relativeChange < 0 ? "text-red-600 dark:text-red-400" : ""
            )}>
              {relativeChange > 0 ? '+' : ''}{relativeChange.toFixed(2)}%
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {`Variant ${variantRate > controlRate ? 'B' : 'A'}'s conversion rate (${
                variantRate > controlRate ? variantRate : controlRate
              }%) was ${Math.abs(relativeChange).toFixed(1)}% ${
                variantRate > controlRate ? 'higher' : 'lower'
              } than variant ${variantRate > controlRate ? 'A' : 'B'}'s conversion rate (${
                variantRate > controlRate ? controlRate : variantRate
              }%).`}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Statistical Significance</div>
            <div className="text-2xl font-bold">
              {((1 - pValue) * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-muted-foreground">
              p-value: {pValue.toFixed(4)}
            </div>
            {isSignificant && (
              <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                {variantWins ? "Variant B wins!" : "Control A wins!"}
                <div className="mt-1 font-normal text-muted-foreground">
                  You can be {((1 - pValue) * 100).toFixed(0)}% confident that this result is not due to chance.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}