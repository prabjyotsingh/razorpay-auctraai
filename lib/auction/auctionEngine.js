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

  // Initial opening bids from all participating suppliers near the ceiling
  const initialBids = participants.map((vendor, index) => {
    const discountFactor = 0.01 + index * 0.014;
    const amountPerUnit = Math.round(startPrice * (1 - discountFactor));
    const nowMinutes = 10 + index * 2;
    return {
      bidId: `bid_init_${index + 1}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      trustScore: vendor.trustScore,
      city: vendor.city,
      amount: amountPerUnit,
      amountPerUnit,
      price: amountPerUnit,
      totalAmount: amountPerUnit * quantity,
      deliveryCommitment: index === 0 ? "24 Hours Guaranteed" : `${vendor.slaHours}h Delivery SLA`,
      timestamp: `10:${nowMinutes < 10 ? "0" + nowMinutes : nowMinutes}:00 AM`,
      savingsVsCeiling: (startPrice - amountPerUnit) * quantity,
      rank: index + 1
    };
  }).sort((a, b) => a.amountPerUnit - b.amountPerUnit);

  const initialWinning = initialBids[0];

  // Initial Chart Deflation Curve
  const initialChartData = [
    { time: "Start", round: "R0", price: startPrice, lowestBid: startPrice, ceiling: startPrice, vendor: "Opening Ceiling" },
    { time: "10:10", round: "R1", price: Math.round(startPrice * 0.98), lowestBid: Math.round(startPrice * 0.98), ceiling: startPrice, vendor: initialBids[Math.min(3, initialBids.length - 1)].vendorName },
    { time: "10:15", round: "R2", price: Math.round(startPrice * 0.95), lowestBid: Math.round(startPrice * 0.95), ceiling: startPrice, vendor: initialBids[Math.min(1, initialBids.length - 1)].vendorName },
    { time: "10:20", round: "R3", price: initialWinning.amountPerUnit, lowestBid: initialWinning.amountPerUnit, ceiling: startPrice, vendor: initialWinning.vendorName }
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
    currentRound: 1,
    currentLowestBid: initialWinning.amountPerUnit,
    winningVendor: initialWinning.vendorName,
    winningVendorId: initialWinning.vendorId,
    totalBidsCount: initialBids.length,
    savingsAmount: (startPrice - initialWinning.amountPerUnit) * quantity,
    savingsPercent: parseFloat((((startPrice - initialWinning.amountPerUnit) / startPrice) * 100).toFixed(1)),
    participants,
    bids: initialBids,
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
  const savingsPercent = parseFloat((((baseCeiling - newAmount) / baseCeiling) * 100).toFixed(1));
  const nextRound = Math.min(5, (auctionState.currentRound || 1) + 1);

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
