// Auctra AI - Real-Time Autonomous Reverse Auction Simulation Engine
import { VERIFIED_VENDORS } from "@/lib/mockData";

export function createReverseAuctionSession(procurementIntent, vendors, customAuctionId) {
  const quantity = Number(procurementIntent.quantity || procurementIntent.moq || 50);
  const startPrice = Number(procurementIntent.budget || procurementIntent.price || 900);
  const ceilingPrice = startPrice;
  const reserveTarget = Math.round(startPrice * 0.81); // ~19% optimal discount target
  const auctionId = customAuctionId || `AUC-${Date.now().toString().slice(-5) || "98421"}`;
  const procurementId = procurementIntent.id || `PR-${Date.now().toString().slice(-5) || "09842"}`;

  // Default participating vendors: 10 active auctioneers
  const candidateVendors = (vendors && vendors.length >= 8) ? vendors : VERIFIED_VENDORS;
  const participants = candidateVendors.map((v, i) => ({
    id: v.id,
    name: v.name,
    trustScore: v.trustScore || (90 + (i % 9)),
    slaHours: v.slaHours || (i % 2 === 0 ? 24 : 48),
    currentBid: v.currentBid || startPrice,
    city: v.city || "Bengaluru"
  }));

  // Clean initial chart starting at the opening ceiling
  const initialChartData = [
    { time: "Start", round: "R0", price: startPrice, lowestBid: startPrice, ceiling: startPrice, vendor: "Opening Ceiling" }
  ];

  return {
    id: auctionId,
    auctionId,
    procurementId,
    status: "scheduled", // scheduled | running | completed
    productName: procurementIntent.product || "Commercial Sourcing Item",
    quantity,
    startPrice,
    ceilingPrice,
    reserveTarget,
    currentRound: 0,
    currentLowestBid: startPrice,
    winningVendor: "Awaiting Live Bidding",
    winningVendorId: null,
    totalBidsCount: 0,
    savingsAmount: 0,
    savingsPercent: 0,
    participants,
    bids: [],
    chartData: initialChartData,
    priceTrajectory: initialChartData,
    timeRemaining: 45,
    isLive: false,
    isFinished: false
  };
}

// Generate the next simulated competitive undercut bid
export function generateNextBid(auctionState) {
  const { startPrice, ceilingPrice, reserveTarget, quantity, bids, participants, chartData, priceTrajectory } = auctionState;
  const baseCeiling = startPrice || ceilingPrice || 900;
  const currentLowest = auctionState.currentLowestBid;

  // If already at or below floor, auction is mature
  if (currentLowest <= reserveTarget) {
    return {
      ...auctionState,
      status: "completed",
      isLive: false,
      isFinished: true,
      currentRound: 5
    };
  }

  // Pick an active participant who isn't currently winning
  const losingVendors = participants.filter(p => p.id !== auctionState.winningVendorId);
  const bidder = losingVendors.length > 0 
    ? losingVendors[Math.floor(Math.random() * losingVendors.length)] 
    : participants[0];

  // Undercut by 1.5% to 3.5%
  const stepReduction = Math.max(5, Math.round(currentLowest * (0.015 + Math.random() * 0.02)));
  let newAmount = currentLowest - stepReduction;
  if (newAmount < reserveTarget) {
    newAmount = reserveTarget;
  }

  const newBidId = `bid_${Date.now()}`;
  const now = new Date();
  const nowTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const newBid = {
    bidId: newBidId,
    vendorId: bidder.id,
    vendorName: bidder.name,
    trustScore: bidder.trustScore,
    city: bidder.city,
    amount: newAmount,
    amountPerUnit: newAmount,
    price: newAmount,
    totalAmount: newAmount * quantity,
    deliveryCommitment: newAmount <= reserveTarget + 20 ? "Express Priority (24h) Included" : `${bidder.slaHours}h Delivery Commitment`,
    timestamp: nowTime,
    savingsVsCeiling: (baseCeiling - newAmount) * quantity,
    rank: 1
  };

  const updatedBids = [newBid, ...bids].map((b, idx) => ({
    ...b,
    rank: idx + 1
  }));

  const savingsAmount = (baseCeiling - newAmount) * quantity;
  const savingsPercent = baseCeiling > 0 
    ? parseFloat((((baseCeiling - newAmount) / baseCeiling) * 100).toFixed(1)) 
    : 0;
  const currentRoundNum = Number.isInteger(auctionState.currentRound) ? auctionState.currentRound : 0;
  const nextRound = Math.min(5, currentRoundNum + 1);

  const newChartPoint = {
    time: nowTime.slice(-5),
    round: `R${nextRound}`,
    price: newAmount,
    lowestBid: newAmount,
    ceiling: baseCeiling,
    vendor: bidder.name
  };

  const currentChart = (chartData && chartData.length > 0) ? chartData : (priceTrajectory || []);
  const updatedChartData = [...currentChart, newChartPoint];

  const isFinished = newAmount <= reserveTarget || nextRound >= 5;

  return {
    ...auctionState,
    currentLowestBid: newAmount,
    winningVendor: bidder.name,
    winningVendorId: bidder.id,
    totalBidsCount: updatedBids.length,
    savingsAmount,
    savingsPercent,
    currentRound: nextRound,
    bids: updatedBids,
    chartData: updatedChartData,
    priceTrajectory: updatedChartData,
    status: isFinished ? "completed" : "running",
    isLive: !isFinished,
    isFinished
  };
}
