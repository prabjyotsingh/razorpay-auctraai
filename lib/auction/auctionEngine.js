// Auctra AI - Real-Time Autonomous Reverse Auction Simulation Engine
import { SEED_VENDORS } from "@/prisma/seed";

export function createReverseAuctionSession(procurementIntent, vendors, customAuctionId) {
  const quantity = procurementIntent.quantity || 50;
  const startPrice = procurementIntent.budget || 900;
  const ceilingPrice = startPrice;
  const reserveTarget = Math.round(startPrice * 0.81); // ~19% optimal discount target
  const auctionId = customAuctionId || `AUC-${Date.now().toString().slice(-5) || "98421"}`;
  const procurementId = procurementIntent.id || `PR-${Date.now().toString().slice(-5) || "09842"}`;

  // Default participating vendors: TechHub Direct, VoltMart Electronics, SwiftProcure Systems, GadgetZone Prime, Nexus Industrial
  const participants = (vendors && vendors.length > 0) ? vendors.map(v => ({
    id: v.id,
    name: v.name,
    trustScore: v.trustScore || 95,
    slaHours: v.slaHours || 24,
    currentBid: v.currentBid || startPrice,
    city: v.city || "Bengaluru"
  })) : SEED_VENDORS.map(v => ({
    id: v.id,
    name: v.name,
    trustScore: v.trustScore,
    slaHours: v.slaHours,
    currentBid: v.currentBid,
    city: v.city
  }));

  // Initial opening bids from suppliers near the ceiling
  const initialBids = participants.map((vendor, index) => {
    const discount = Math.round(startPrice * (0.01 + index * 0.015));
    const amountPerUnit = startPrice - discount;
    return {
      bidId: `bid_init_${index + 1}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      trustScore: vendor.trustScore,
      city: vendor.city,
      amountPerUnit,
      totalAmount: amountPerUnit * quantity,
      deliveryCommitment: index === 0 ? "24 Hours Guaranteed" : "48 Hours Standard",
      timestamp: `10:${10 + index * 2}:00 AM`,
      savingsVsCeiling: (startPrice - amountPerUnit) * quantity,
      rank: index + 1
    };
  }).sort((a, b) => a.amountPerUnit - b.amountPerUnit);

  const initialWinning = initialBids[0];

  return {
    id: auctionId,
    auctionId,
    procurementId,
    status: "scheduled", // scheduled | running | completed
    productName: procurementIntent.product || "Ergonomic Wrist Rest",
    quantity,
    startPrice,
    ceilingPrice: startPrice,
    reserveTarget,
    currentLowestBid: initialWinning.amountPerUnit,
    winningVendor: initialWinning.vendorName,
    winningVendorId: initialWinning.vendorId,
    totalBidsCount: initialBids.length,
    savingsAmount: (startPrice - initialWinning.amountPerUnit) * quantity,
    savingsPercent: parseFloat((((startPrice - initialWinning.amountPerUnit) / startPrice) * 100).toFixed(1)),
    participants,
    bids: initialBids,
    priceTrajectory: [
      { time: "00:00", ceiling: startPrice, lowestBid: startPrice },
      { time: "00:10", ceiling: startPrice, lowestBid: initialBids[initialBids.length - 1].amountPerUnit },
      { time: "00:20", ceiling: startPrice, lowestBid: initialWinning.amountPerUnit }
    ],
    timeRemaining: 45,
    isLive: false,
    isFinished: false
  };
}

// Generate the next simulated competitive undercut bid
export function generateNextBid(auctionState) {
  const { startPrice, ceilingPrice, reserveTarget, quantity, bids, participants, priceTrajectory } = auctionState;
  const baseCeiling = startPrice || ceilingPrice || 900;
  const currentLowest = auctionState.currentLowestBid;

  // If already at or below floor, auction is mature
  if (currentLowest <= reserveTarget) {
    return {
      ...auctionState,
      status: "completed",
      isLive: false,
      isFinished: true
    };
  }

  // Pick a random participant who isn't currently winning, or pick the top aggressive bidder
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
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const newBid = {
    bidId: newBidId,
    vendorId: bidder.id,
    vendorName: bidder.name,
    trustScore: bidder.trustScore,
    city: bidder.city,
    amountPerUnit: newAmount,
    totalAmount: newAmount * quantity,
    deliveryCommitment: newAmount <= reserveTarget + 20 ? "Express Priority (24h) Included" : "Standard SLA (36h)",
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

  const newTrajectory = [
    ...priceTrajectory,
    {
      time: nowTime.slice(-5),
      ceiling: baseCeiling,
      lowestBid: newAmount
    }
  ];

  const isFinished = newAmount <= reserveTarget;

  return {
    ...auctionState,
    currentLowestBid: newAmount,
    winningVendor: bidder.name,
    winningVendorId: bidder.id,
    totalBidsCount: updatedBids.length,
    savingsAmount,
    savingsPercent,
    bids: updatedBids,
    priceTrajectory: newTrajectory,
    status: isFinished ? "completed" : "running",
    isLive: !isFinished,
    isFinished
  };
}
