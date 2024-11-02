// Statistical utility functions for A/B testing calculations
export function calculateSampleSize(
  baselineConversion: number,
  mde: number,
  _power: number = 0.8
): number {
  const z_alpha = 1.96; // For 95% confidence
  const z_beta = 1.28; // For 80% power

  const p1 = baselineConversion / 100;
  const p2 = p1 * (1 + mde / 100);
  const p_avg = (p1 + p2) / 2;

  const sample_size =
    Math.pow(
      (z_alpha * Math.sqrt(2 * p_avg * (1 - p_avg)) +
        z_beta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) /
        (p2 - p1),
      2
    );

  return Math.ceil(sample_size);
}

export function calculateTestDuration(
  sampleSize: number,
  dailyTraffic: number
): number {
  return Math.ceil((sampleSize * 2) / dailyTraffic); // Multiply by 2 for both variants
}

export function calculatePValue(
  controlSize: number,
  controlConversions: number,
  variantSize: number,
  variantConversions: number
): number {
  const p1 = controlConversions / controlSize;
  const p2 = variantConversions / variantSize;
  const p_pooled =
    (controlConversions + variantConversions) / (controlSize + variantSize);
  const se = Math.sqrt(
    p_pooled * (1 - p_pooled) * (1 / controlSize + 1 / variantSize)
  );
  const z = Math.abs(p1 - p2) / se;
  
  // Approximate p-value using normal distribution
  const p_value = 2 * (1 - normalCDF(z));
  return p_value;
}

function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const probability =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - probability : probability;
}
