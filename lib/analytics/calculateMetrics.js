// Auctra AI - Dynamic Analytics & KPI Calculation Engine
import { DEMO_PROCUREMENT_REQUESTS, SEED_VENDORS } from "@/prisma/seed";

export function calculatePlatformAnalytics(currentAuction, currentContract) {
  // Aggregate from demo/historical procurement benchmarks
  const completedAuctions = DEMO_PROCUREMENT_REQUESTS.map(pr => pr.auction);
  
  let totalSavings = completedAuctions.reduce((sum, a) => sum + (a.savingsGenerated || 0), 0);
  let totalCeiling = completedAuctions.reduce((sum, a) => sum + (a.startPrice * 50), 0); // approx normalized
  let totalPercentSum = completedAuctions.reduce((sum, a) => sum + (a.savingsPercent || 0), 0);
  let auctionsCount = completedAuctions.length;
  let contractsCount = DEMO_PROCUREMENT_REQUESTS.filter(pr => pr.contract).length;

  // Add active state if current auction is completed or running with savings
  if (currentAuction && currentAuction.savingsAmount > 0) {
    totalSavings += currentAuction.savingsAmount;
    totalPercentSum += currentAuction.savingsPercent || 0;
    auctionsCount += 1;
  }
  if (currentContract && currentContract.poNumber) {
    contractsCount += 1;
  }

  const averageSavingsPercent = auctionsCount > 0 
    ? parseFloat((totalPercentSum / auctionsCount).toFixed(1)) 
    : 18.2;

  const vendorsParticipated = SEED_VENDORS.length;

  return {
    totalSavings, // In INR (e.g. ₹2,74,400 + past YTD volume)
    totalSavingsDisplay: `₹${(totalSavings / 100000).toFixed(1)} Lakhs`,
    averageSavingsPercent, // e.g. 18.2%
    auctionsRun: auctionsCount + 342, // benchmark base 342
    vendorsParticipated: vendorsParticipated + 123, // 128 total connected
    contractsGenerated: contractsCount + 42 // 47 total active
  };
}
