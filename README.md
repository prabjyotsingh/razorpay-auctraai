# Auctra AI

<div align="center">

# AI-Powered Procurement & Supplier Management Platform

Transform supplier discovery into competitive sourcing, automate procurement workflows, and streamline purchasing decisions through a unified procurement platform.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8)
![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-02042B)
![Chrome Extension](https://img.shields.io/badge/Manifest-V3-success)

</div>

---

# Overview

Procurement teams often spend days collecting quotations, evaluating suppliers, negotiating prices, generating purchase orders, and coordinating payments across multiple systems.

**Auctra AI** centralizes the procurement lifecycle into a single platform that enables organizations to discover suppliers, run competitive sourcing events, manage procurement workflows, and monitor purchasing performance through a unified experience.

## Key Outcomes

- Reduce sourcing cycle time from days to minutes
- Increase supplier competition through reverse auctions
- Centralize procurement operations in one workspace
- Streamline supplier evaluation and purchase workflows
- Improve procurement visibility and auditability
- Capture supplier data directly from marketplaces using a Chrome Extension

---

# Why Auctra AI?

Traditional procurement workflows rely on spreadsheets, supplier directories, email threads, and manual negotiation processes.

Auctra AI transforms procurement into a structured workflow:

```text
Supplier Marketplace
        ↓
RFQ Creation
        ↓
Supplier Discovery
        ↓
Reverse Auction
        ↓
Supplier Selection
        ↓
Purchase Order
        ↓
Payment Workflow
        ↓
Procurement Analytics
```

This enables procurement teams to make faster, more informed purchasing decisions while maintaining transparency and operational control.

---

# Core Features

| Module | Description |
|----------|-------------|
| RFQ Management | Create and manage procurement requests |
| Supplier Discovery | Discover and evaluate suppliers |
| Reverse Auctions | Drive supplier competition |
| Contract Management | Generate purchase orders and procurement documents |
| Payment Workflows | Track procurement transactions and settlements |
| Analytics | Monitor spend, savings, and supplier performance |
| Chrome Extension | Create RFQs directly from supplier marketplaces |

---

# Key Features

## Procurement Management

Create and manage sourcing requests through a structured procurement workflow.

### Capabilities

- RFQ Creation
- Budget Management
- Quantity Management
- Procurement Lifecycle Tracking
- Category-Based Procurement

---

## Supplier Discovery

Discover and evaluate suppliers through centralized supplier intelligence.

### Capabilities

- Supplier Repository
- Vendor Qualification
- Supplier Comparison
- Supplier Profiles
- Supplier Performance Insights

---

## Reverse Auctions

Drive supplier competition and improve procurement outcomes.

### Capabilities

- Live Bidding Environment
- Bid Comparison
- Supplier Ranking
- Savings Tracking
- Supplier Competition Analysis

---

## Contract Management

Generate procurement documentation and maintain audit-ready records.

### Capabilities

- Purchase Order Generation
- Contract Creation
- Approval Workflows
- Audit Trails
- PDF Export

---

## Payment & Settlement

Manage procurement payment workflows.

### Capabilities

- Payment Tracking
- Settlement Monitoring
- Purchase Reconciliation
- Transaction History

---

## Spend Analytics

Gain visibility into procurement performance.

### Capabilities

- Spend Analysis
- Procurement Reporting
- Savings Tracking
- Supplier Performance Metrics
- Activity Monitoring

---

## Browser Extension

Capture supplier information directly from supplier marketplaces and instantly create procurement requests.

### Supported Platforms

- IndiaMART
- Amazon Business
- Alibaba
- TradeIndia

### Features

- One-Click RFQ Creation
- Supplier Information Capture
- Product Information Extraction
- Marketplace Integration
- Procurement Workflow Synchronization

---

# Architecture Overview

Auctra AI follows a modular procurement architecture consisting of:

- Procurement Intake Layer
- Supplier Discovery Layer
- Reverse Auction Engine
- Contract Management Layer
- Payment & Settlement Layer

The Chrome Extension acts as a procurement ingestion point, allowing supplier listings to be converted directly into sourcing workflows.

---

# System Architecture

```mermaid
graph TD

    subgraph S1["Requisition Ingestion"]
        EXT["Chrome Extension (Manifest V3)"]
        WEB["AI RFQ Creator"]
        EXT --> API_INGEST["RFQ Creation API"]
        WEB --> API_INTENT["Intent Processing Engine"]
    end

    subgraph S2["Supplier Discovery"]
        API_INGEST --> SUP_DB[("Supplier Repository")]
        API_INTENT --> SUP_DB
        SUP_DB --> VERIFY["Supplier Verification"]
        VERIFY --> PROFILE["Supplier Intelligence"]
    end

    subgraph S3["Competitive Sourcing"]
        PROFILE --> AUCTION["Reverse Auction Engine"]
        AUCTION --> RANKING["Bid Evaluation"]
        RANKING --> SLA["Delivery & Risk Scoring"]
        SLA --> WINNER["Winning Supplier Selection"]
    end

    subgraph S4["Contract Management"]
        WINNER --> PO["Purchase Order Generation"]
        PO --> APPROVAL["Approval Workflow"]
        APPROVAL --> CONTRACT["Contract Creation"]
        CONTRACT --> EXPORT["PDF Export"]
    end

    subgraph S5["Payment & Settlement"]
        CONTRACT --> PAYMENT["Payment Processing"]
        PAYMENT --> RECON["Purchase Reconciliation"]
        RECON --> AUDIT["Audit & Settlement Records"]
    end
```

---

# Procurement Workflow

```text
Supplier Marketplace
        │
        ▼
Chrome Extension
        │
        ▼
Create RFQ
        │
        ▼
Supplier Discovery
        │
        ▼
Reverse Auction
        │
        ▼
Supplier Selection
        │
        ▼
Purchase Order
        │
        ▼
Contract Generation
        │
        ▼
Payment & Settlement
```

---

# Technology Stack

## Frontend

- Next.js 15
- React 19
- Tailwind CSS
- JavaScript

## Backend

- Next.js API Routes
- REST APIs

## Database

- PostgreSQL
- Supabase

## Browser Extension

- Chrome Extension Manifest V3
- Service Workers
- Content Scripts
- Chrome Storage API

## Payments

- Razorpay Integration

## State Management

- Zustand

---

# Project Structure

```bash
auctra-ai/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── rfq/
│   └── layout/
│
├── components/
│   ├── procurement/
│   ├── suppliers/
│   ├── auctions/
│   ├── contracts/
│   ├── analytics/
│   └── ui/
│
├── extension/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
│
├── lib/
├── store/
├── public/
├── hooks/
└── prisma/
```

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/prabjyotsingh/razorpay-auctraai.git

cd razorpay-auctraai
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

GROQ_API_KEY=your_groq_api_key

DATABASE_URL=your_database_url

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Browser Extension Setup

## Load Extension in Chrome

1. Open Chrome
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `/extension` folder
6. Pin the extension to the toolbar

The extension is now available on supported supplier marketplaces.

---

# Demo Flow

1. Open a supplier listing on IndiaMART, Alibaba, Amazon Business, or TradeIndia.
2. Launch the Auctra AI Extension.
3. Capture supplier information.
4. Create an RFQ.
5. Discover alternative suppliers.
6. Launch a reverse auction.
7. Select a supplier.
8. Generate a purchase order.
9. Track payment and settlement workflows.

---

# Analytics Dashboard

Track procurement performance through:

- Total Spend
- Procurement Savings
- Active RFQs
- Supplier Performance
- Contract Status
- Procurement Activity
- Procurement Cycle Time

---

# Security

Auctra AI follows secure application practices:

- Secure API Communication
- Environment Variable Management
- Authentication Controls
- Audit Logging
- Transaction Monitoring
- Access Control Mechanisms

---

# Future Enhancements

- ERP Integrations
- Multi-User Procurement Workspaces
- Approval Chains
- Supplier Scorecards
- AI Procurement Recommendations
- Predictive Spend Intelligence
- Mobile Applications
- Advanced Reporting

---

# Use Cases

## Procurement Teams

- Reduce sourcing cycle time
- Improve supplier competition
- Centralize procurement operations

## Operations Teams

- Standardize procurement workflows
- Improve supplier visibility
- Monitor supplier activity

## Growing Businesses

- Expand supplier networks
- Optimize purchasing decisions
- Improve spend control

---

# License

MIT License

This project was developed as part of the Razorpay Buildathon and is intended for educational and demonstration purposes.

---

# About Auctra AI

Auctra AI is a modern procurement platform focused on supplier discovery, competitive sourcing, procurement automation, and payment workflow orchestration.

## Mission

Enable organizations to make faster, more informed purchasing decisions through streamlined procurement workflows and supplier intelligence.
