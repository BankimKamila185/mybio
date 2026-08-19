import React, { useState, useEffect } from 'react';

const ARCHITECTURE_SCENARIOS = [
  {
    id: 'realtime',
    name: 'Real-Time WebSocket Polling (Reactify)',
    badge: 'MERN + WebSockets',
    tagline: 'Sub-15ms broadcast latency for high-concurrency anonymous voting rooms',
    activeFlow: ['client', 'websocket', 'broadcast', 'cache', 'mongodb'],
    metrics: { latency: '12 ms', throughput: '10k events/s', protocol: 'WSS (Bidirectional)' },
    highlightText: 'Packets bypass HTTP overhead using persistent TCP WebSocket connections with room-based pub/sub broadcasting.'
  },
  {
    id: 'ai-pipeline',
    name: 'AI Image Processing (Pixora)',
    badge: 'FastAPI + Computer Vision',
    tagline: 'Automated K-Means color clustering and neural image processing pipeline',
    activeFlow: ['client', 'gateway', 'ai-worker', 'mongodb'],
    metrics: { latency: '180 ms', throughput: 'Async Batch', protocol: 'REST / Binary Multipart' },
    highlightText: 'High-resolution images stream to async Python FastAPI workers where K-Means clustering extracts dominant HEX palettes in memory.'
  },
  {
    id: 'fintech',
    name: 'Fintech Invoicing & Ledger (PayIt)',
    badge: 'Python REST + PostgreSQL',
    tagline: 'ACID-compliant transaction processing with automated PDF rendering',
    activeFlow: ['client', 'gateway', 'billing-engine', 'postgres'],
    metrics: { latency: '45 ms', throughput: 'ACID Strict', protocol: 'HTTPS / TLS 1.3' },
    highlightText: 'Calculations run in isolated Python financial microservices before committing immutable ledger rows to relational PostgreSQL.'
  }
];

const NODES = {
  client: {
    id: 'client',
    title: 'Client Web Apps',
    tech: 'React / Vite / Tailwind',
    type: 'Edge & Frontend',
    desc: 'Optimistic UI state, WebSocket client listeners, and responsive token design systems.',
    specs: '0ms Latency · Browser Cache · Event Dispatcher'
  },
  websocket: {
    id: 'websocket',
    title: 'Socket.io Cluster',
    tech: 'Node.js / WebSockets',
    type: 'Real-Time Gateway',
    desc: 'Room-isolated pub/sub connection multiplexer for sub-15ms client state broadcasting.',
    specs: 'Stateful WSS · Auto-Reconnect · Heartbeat Sync'
  },
  gateway: {
    id: 'gateway',
    title: 'API Gateway & Auth',
    tech: 'Python FastAPI / REST',
    type: 'Service Mesh',
    desc: 'Async non-blocking router with JWT verification, CORS control, and payload validation.',
    specs: 'Non-Blocking I/O · Rate Limiter · OpenAPI 3.0'
  },
  broadcast: {
    id: 'broadcast',
    title: 'Room State Engine',
    tech: 'In-Memory Pub/Sub',
    type: 'Event Router',
    desc: 'Instant tally recalculations broadcasted to all connected room participants simultaneously.',
    specs: 'Zero Lock Contention · O(1) Lookups'
  },
  'ai-worker': {
    id: 'ai-worker',
    title: 'AI / CV Worker',
    tech: 'Python / NumPy / OpenCV',
    type: 'Machine Learning',
    desc: 'Unsupervised K-Means clustering model for dominant palette extraction & matrix transformations.',
    specs: 'Vectorized Compute · Memory-Safe Worker'
  },
  'billing-engine': {
    id: 'billing-engine',
    title: 'Billing Microservice',
    tech: 'Python Financial Engine',
    type: 'Ledger Engine',
    desc: 'Tax calculations, multi-currency conversions, and streaming PDF invoice generation.',
    specs: 'Decimal Precision · Idempotent Keys'
  },
  cache: {
    id: 'cache',
    title: 'Redis Ephemeral Cache',
    tech: 'Redis In-Memory',
    type: 'Caching Layer',
    desc: 'Active live room codes, participant counts, and sub-millisecond voting tallies.',
    specs: '<1ms RTT · TTL Expiry · Memory Eviction'
  },
  mongodb: {
    id: 'mongodb',
    title: 'MongoDB Cluster',
    tech: 'MongoDB Atlas',
    type: 'Document Store',
    desc: 'Polymorphic room metadata, user profiles, image palette registries, and audit logs.',
    specs: 'Replica Sets · Index Optimized · Geo Sharded'
  },
  postgres: {
    id: 'postgres',
    title: 'PostgreSQL Database',
    tech: 'PostgreSQL 16',
    type: 'Relational Store',
    desc: 'Normalized schema ensuring transactional integrity, audit records, and invoice histories.',
    specs: 'ACID Compliant · WAL Archiving · Foreign Keys'
  }
};

export default function SystemArchitectureBlueprint({ playSound }) {
  const [activeScenarioId, setActiveScenarioId] = useState('realtime');
  const [selectedNodeId, setSelectedNodeId] = useState('websocket');
  const [pulseActive, setPulseActive] = useState(true);

  const currentScenario = ARCHITECTURE_SCENARIOS.find(s => s.id === activeScenarioId) || ARCHITECTURE_SCENARIOS[0];
  const selectedNode = NODES[selectedNodeId] || NODES.websocket;

  const handleScenarioChange = (id) => {
    playSound?.();
    setActiveScenarioId(id);
    setPulseActive(false);
    setTimeout(() => setPulseActive(true), 50);
  };

  const handleNodeClick = (id) => {
    playSound?.();
    setSelectedNodeId(id);
  };

  return (
    <div className="blueprint-wrapper">
      {/* Blueprint Top Header & Scenario Selector */}
      <div className="blueprint-header-panel">
        <div className="blueprint-scenarios-pills">
          {ARCHITECTURE_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              className={`blueprint-tab-btn ${activeScenarioId === sc.id ? 'active' : ''}`}
              onClick={() => handleScenarioChange(sc.id)}
            >
              <span className="sc-dot" />
              <span>{sc.name}</span>
            </button>
          ))}
        </div>

        {/* Live Metrics Telemetry Bar */}
        <div className="blueprint-telemetry-row">
          <div className="telemetry-badge">
            <span className="telemetry-lbl">PIPELINE:</span>
            <span className="telemetry-val highlight">{currentScenario.badge}</span>
          </div>
          <div className="telemetry-badge">
            <span className="telemetry-lbl">AVG LATENCY:</span>
            <span className="telemetry-val">{currentScenario.metrics.latency}</span>
          </div>
          <div className="telemetry-badge">
            <span className="telemetry-lbl">THROUGHPUT:</span>
            <span className="telemetry-val">{currentScenario.metrics.throughput}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="blueprint-diagram-stage">
        
        {/* Layer 1: Edge & Client */}
        <div className="blueprint-column">
          <span className="column-label">01 // CLIENT EDGE</span>
          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('client') ? 'node-active' : ''} ${selectedNodeId === 'client' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('client')}
          >
            <div className="node-head">
              <span className="node-type-pill">Frontend</span>
              <span className="node-status-dot green"></span>
            </div>
            <h4 className="node-title">React Client Application</h4>
            <span className="node-tech-tag">React · Vite · Tailwind</span>
            <p className="node-mini-summary">Optimistic state updates &amp; live WebSocket event consumers.</p>
          </div>
        </div>

        {/* Connector Column 1 */}
        <div className="blueprint-wire-column">
          <div className={`wire-line ${pulseActive ? 'pulse-flow' : ''}`}>
            <span className="wire-pulse-particle"></span>
          </div>
        </div>

        {/* Layer 2: Real-Time & API Gateways */}
        <div className="blueprint-column">
          <span className="column-label">02 // GATEWAYS &amp; ROUTING</span>
          
          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('websocket') ? 'node-active' : ''} ${selectedNodeId === 'websocket' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('websocket')}
          >
            <div className="node-head">
              <span className="node-type-pill orange">WSS Gateway</span>
              <span className="node-status-dot orange"></span>
            </div>
            <h4 className="node-title">Socket.io WSS Cluster</h4>
            <span className="node-tech-tag">Node.js · WebSockets</span>
            <p className="node-mini-summary">Stateful persistent connection mesh with room clustering.</p>
          </div>

          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('gateway') ? 'node-active' : ''} ${selectedNodeId === 'gateway' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('gateway')}
          >
            <div className="node-head">
              <span className="node-type-pill blue">REST Gateway</span>
              <span className="node-status-dot blue"></span>
            </div>
            <h4 className="node-title">FastAPI Async Gateway</h4>
            <span className="node-tech-tag">Python · ASGI · Uvicorn</span>
            <p className="node-mini-summary">Non-blocking async router &amp; request validation pipeline.</p>
          </div>
        </div>

        {/* Connector Column 2 */}
        <div className="blueprint-wire-column">
          <div className={`wire-line ${pulseActive ? 'pulse-flow' : ''}`}>
            <span className="wire-pulse-particle"></span>
          </div>
        </div>

        {/* Layer 3: Compute & Microservices */}
        <div className="blueprint-column">
          <span className="column-label">03 // MICROSERVICES &amp; ENGINES</span>
          
          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('broadcast') ? 'node-active' : ''} ${selectedNodeId === 'broadcast' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('broadcast')}
          >
            <div className="node-head">
              <span className="node-type-pill orange">Real-Time Engine</span>
            </div>
            <h4 className="node-title">Room State Engine</h4>
            <span className="node-tech-tag">In-Memory Pub/Sub</span>
            <p className="node-mini-summary">Instant vote tallies &amp; synchronized client broadcasting.</p>
          </div>

          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('ai-worker') ? 'node-active' : ''} ${selectedNodeId === 'ai-worker' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('ai-worker')}
          >
            <div className="node-head">
              <span className="node-type-pill purple">AI / ML Engine</span>
            </div>
            <h4 className="node-title">K-Means Vision Worker</h4>
            <span className="node-tech-tag">Python · Computer Vision</span>
            <p className="node-mini-summary">Color palette clustering &amp; neural matrix filter transforms.</p>
          </div>

          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('billing-engine') ? 'node-active' : ''} ${selectedNodeId === 'billing-engine' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('billing-engine')}
          >
            <div className="node-head">
              <span className="node-type-pill green">Ledger Engine</span>
            </div>
            <h4 className="node-title">Billing &amp; Tax Engine</h4>
            <span className="node-tech-tag">Python Microservice</span>
            <p className="node-mini-summary">Automated payment calculations &amp; PDF invoice rendering.</p>
          </div>
        </div>

        {/* Connector Column 3 */}
        <div className="blueprint-wire-column">
          <div className={`wire-line ${pulseActive ? 'pulse-flow' : ''}`}>
            <span className="wire-pulse-particle"></span>
          </div>
        </div>

        {/* Layer 4: Storage & Persistence */}
        <div className="blueprint-column">
          <span className="column-label">04 // PERSISTENCE &amp; CACHE</span>

          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('cache') ? 'node-active' : ''} ${selectedNodeId === 'cache' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('cache')}
          >
            <div className="node-head">
              <span className="node-type-pill red">Cache</span>
            </div>
            <h4 className="node-title">Redis Live Cache</h4>
            <span className="node-tech-tag">In-Memory Key-Value</span>
            <p className="node-mini-summary">Ephemeral room state &amp; sub-millisecond leaderboard caching.</p>
          </div>

          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('mongodb') ? 'node-active' : ''} ${selectedNodeId === 'mongodb' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('mongodb')}
          >
            <div className="node-head">
              <span className="node-type-pill green">Document DB</span>
            </div>
            <h4 className="node-title">MongoDB Cluster</h4>
            <span className="node-tech-tag">MongoDB Atlas · MERN</span>
            <p className="node-mini-summary">Flexible JSON document schemas, user history &amp; palette logs.</p>
          </div>

          <div
            className={`blueprint-node-card ${currentScenario.activeFlow.includes('postgres') ? 'node-active' : ''} ${selectedNodeId === 'postgres' ? 'node-selected' : ''}`}
            onClick={() => handleNodeClick('postgres')}
          >
            <div className="node-head">
              <span className="node-type-pill blue">Relational DB</span>
            </div>
            <h4 className="node-title">PostgreSQL Database</h4>
            <span className="node-tech-tag">PostgreSQL 16 · ACID</span>
            <p className="node-mini-summary">Normalized financial ledgers, audit records &amp; user profiles.</p>
          </div>
        </div>

      </div>

      {/* Interactive Node Deep-Dive Inspector Panel */}
      <div className="blueprint-inspector-panel">
        <div className="inspector-header">
          <div className="inspector-title-group">
            <span className="inspector-type-kicker">{selectedNode.type}</span>
            <h3 className="inspector-node-name">{selectedNode.title}</h3>
            <span className="inspector-tech-badge">{selectedNode.tech}</span>
          </div>
          <div className="inspector-specs-pill">
            <span className="spec-indicator-dot"></span>
            <span>{selectedNode.specs}</span>
          </div>
        </div>
        <p className="inspector-node-desc">{selectedNode.desc}</p>
        <div className="inspector-scenario-note">
          <strong>Active Scenario Note:</strong> {currentScenario.highlightText}
        </div>
      </div>
    </div>
  );
}
