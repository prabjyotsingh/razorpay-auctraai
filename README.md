# Auctra AI

### AI-Powered Procurement & Supplier Management Platform

Auctra AI transforms how organizations discover suppliers, run sourcing events, negotiate pricing, and manage procurement operations. By combining supplier intelligence, competitive bidding, contract management, and payment workflows into a unified platform, Auctra helps businesses reduce procurement costs and accelerate purchasing decisions.

---

## Overview

Procurement teams often spend significant time searching supplier directories, collecting quotations, comparing vendors, negotiating prices, generating purchase orders, and managing payment processes.

Auctra AI streamlines this workflow by providing a centralized procurement workspace where buyers can:

* Create procurement requests (RFQs)
* Discover and evaluate suppliers
* Launch competitive reverse auctions
* Generate purchase orders and contracts
* Manage payment and settlement workflows
* Monitor procurement performance through analytics

---

## Core Features

### Procurement Management

Create and manage sourcing requests through a structured procurement workflow.

**Capabilities**

* RFQ creation
* Budget management
* Quantity management
* Category-based sourcing
* Procurement lifecycle tracking

---

### Supplier Discovery

Identify and evaluate suppliers from multiple sourcing channels.

**Capabilities**

* Supplier database
* Vendor qualification
* Supplier comparison
* Trust and performance scoring
* Supplier profiles

---

### Reverse Auctions

Drive supplier competition and improve procurement outcomes.

**Capabilities**

* Live bidding environment
* Bid comparison
* Dynamic ranking
* Savings calculation
* Supplier competition analysis

---

### Contract & Purchase Order Management

Generate procurement documentation and maintain audit-ready records.

**Capabilities**

* Purchase order generation
* Contract management
* Approval workflows
* Procurement audit trails

---

### Payment & Settlement

Manage procurement transactions and payment workflows.

**Capabilities**

* Payment tracking
* Settlement monitoring
* Purchase reconciliation
* Transaction history

---

### Spend Analytics

Gain visibility into procurement performance and cost optimization opportunities.

**Capabilities**

* Spend analysis
* Savings tracking
* Supplier performance reporting
* Procurement activity dashboards
* Contract analytics

---

## Browser Extension

The Auctra AI Browser Extension allows buyers to capture supplier and product information directly from supplier marketplaces and instantly convert them into procurement requests.

### Supported Platforms

* IndiaMART
* Amazon Business
* Alibaba
* TradeIndia

### Extension Features

* One-click supplier capture
* Product information extraction
* RFQ creation
* Marketplace integration
* Procurement workflow synchronization

---

## Procurement Workflow

```text
Supplier Marketplace
        ↓
Browser Extension
        ↓
Create RFQ
        ↓
Supplier Discovery
        ↓
Reverse Auction
        ↓
Purchase Order
        ↓
Payment & Settlement
```

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* REST APIs

### Database

* PostgreSQL
* Supabase

### Browser Extension

* Chrome Extension Manifest V3
* Service Workers
* Content Scripts
* Chrome Storage API

### Payments

* Razorpay Integration

### State Management

* Zustand

---

## Project Architecture

```text
┌──────────────────────┐
│ Chrome Extension     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ RFQ Creation Engine  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Supplier Discovery   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Reverse Auctions     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Contracts & POs      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Razorpay Settlement  │
└──────────────────────┘
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/prabjyotsingh/razorpay-auctraai.git
cd razorpay-auctraai
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Browser Extension Setup

### Load Extension

1. Open Chrome
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `extension` directory
6. Pin the extension to the toolbar

The extension is now ready to use on supported supplier marketplaces.

---

## Use Cases

### Procurement Teams

* Reduce sourcing cycle time
* Improve supplier competition
* Centralize procurement operations

### Operations Teams

* Standardize purchasing workflows
* Monitor procurement activity
* Improve visibility across procurement processes

### Growing Businesses

* Expand supplier networks
* Optimize purchasing decisions
* Improve spend control

---

## Project Structure

```text
auctra-ai/
│
├── app/
│   ├── api/
│   ├── rfq/
│   └── dashboard/
│
├── components/
│   ├── procurement/
│   ├── suppliers/
│   ├── auctions/
│   ├── contracts/
│   └── analytics/
│
├── extension/
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│   ├── popup.html
│   └── popup.js
│
├── lib/
├── store/
├── public/
└── prisma/
```

---

## Future Roadmap

* Multi-user collaboration
* Approval workflows
* ERP integrations
* Supplier scorecards
* Advanced spend analytics
* Procurement recommendations
* Mobile support

---

## License

This project is intended for educational, demonstration, and research purposes.

---

## About Auctra AI

**Auctra AI** is a modern procurement platform focused on supplier discovery, competitive sourcing, procurement automation, and payment orchestration.

**Mission:** Simplify procurement workflows and help organizations make faster, more informed purchasing decisions.
