// backend/server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS with options for better performance
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Caching middleware
const cacheMiddleware = (duration = 60 * 5) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }
    
    let key = '__express__' + req.originalUrl || req.url;
    let cachedData = app.locals.cache && app.locals.cache[key];
    
    if (cachedData) {
      res.setHeader('X-Cache', 'HIT');
      res.json(cachedData);
      return;
    }
    
    res.setHeader('X-Cache', 'MISS');
    res.sendJson = res.json;
    res.json = (data) => {
      if (!app.locals.cache) {
        app.locals.cache = {};
      }
      app.locals.cache[key] = data;
      
      // Clear cache after duration
      setTimeout(() => {
        delete app.locals.cache[key];
      }, duration * 1000);
      
      return res.sendJson(data);
    };
    next();
  };
};

// Apply caching to GET requests
app.use(cacheMiddleware(5 * 60)); // 5 minute cache

// cleaned JSON directory
const CLEAN_DIR = path.join(__dirname, "data", "clean");
const DATA_DIR = path.join(__dirname, "data");

// helper read JSON with caching and PDB mapping
const jsonCache = new Map();
function readJson(name) {
  try {
    // Check if already in memory
    if (jsonCache.has(name)) {
      return jsonCache.get(name);
    }
    
    const file = path.join(CLEAN_DIR, name);
    if (!fs.existsSync(file)) {
      return [];
    }
    
    let data = JSON.parse(fs.readFileSync(file, "utf8"));
    
    // Add PDB file paths based on mutation index
    if (Array.isArray(data)) {
      let pdbDir = null;
      let pdbPrefix = null;
      
      if (name.includes("om3")) {
        pdbDir = "Human_OM3_PDBs";
        pdbPrefix = "Human_QP3_A";
      } else if (name.includes("om6") && !name.includes("porcine")) {
        pdbDir = "Human_OM6_PDBs";
        pdbPrefix = "test_A";
      }
      
      if (pdbDir && pdbPrefix) {
        data = data.map((mutation, index) => {
          const fileName = index === 0 ? `${pdbPrefix}.pdb` : `${pdbPrefix}_${index}.pdb`;
          return {
            ...mutation,
            pdb_file: `/pdb/${pdbDir}/${fileName}`,
            pdb_path: path.join(DATA_DIR, pdbDir, fileName)
          };
        });
      }
    }
    
    jsonCache.set(name, data);
    
    // Clear from memory cache after 10 minutes to free up space
    setTimeout(() => {
      jsonCache.delete(name);
    }, 10 * 60 * 1000);
    
    return data;
  } catch (err) {
    console.error("JSON parse error:", name, err);
    return [];
  }
}

// API endpoints
app.get("/api/datasets", (req, res) => {
  res.json({
    human_om3: "/api/mutations/human/om3",
    human_om6: "/api/mutations/human/om6",
    porcine_om6: "/api/mutations/porcine/om6"
  });
});

// ⭐ REAL MUTATION ENDPOINTS ⭐
app.get("/api/mutations/human/om3", (req, res) => {
  res.json(readJson("om3_clean.json"));
});

app.get("/api/mutations/human/om6", (req, res) => {
  res.json(readJson("om6_clean.json"));
});

app.get("/api/mutations/porcine/om6", (req, res) => {
  res.json(readJson("porcine_clean.json"));
});

// POCKET RESIDUES
app.get("/api/pocket/human/om3", (req, res) => {
  res.json(readJson("pocket_om3.json"));
});

app.get("/api/pocket/human/om6", (req, res) => {
  res.json(readJson("pocket_om6.json"));
});

// Single mutation with better error handling
app.get("/api/mutation/:species/:om/:mutname", (req, res) => {
  try {
    const { species, om, mutname } = req.params;

    const key =
      species === "porcine"
        ? "porcine_clean.json"
        : om === "om6"
        ? "om6_clean.json"
        : "om3_clean.json";

    const arr = readJson(key);

    const match = arr.find((m) => {
      const name = String(mutname).toLowerCase();
      return (
        String(m.mutation || "").toLowerCase() === name ||
        String(m.mutation_normalized || "").toLowerCase() === name
      );
    });

    res.json(match || { error: "Mutation not found" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve PDB files
app.get("/pdb/:dir/:filename", (req, res) => {
  try {
    const { dir, filename } = req.params;
    const pdbPath = path.join(DATA_DIR, dir, filename);
    
    // Validate path is within data directory
    const normalizedPath = path.normalize(pdbPath);
    const normalizedDataDir = path.normalize(DATA_DIR);
    
    if (!normalizedPath.startsWith(normalizedDataDir)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    
    if (!fs.existsSync(pdbPath)) {
      return res.status(404).json({ error: "PDB file not found" });
    }
    
    res.setHeader('Content-Type', 'chemical/x-pdb');
    res.sendFile(pdbPath);
  } catch (error) {
    console.error("PDB serving error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`FimHub API running → http://localhost:${PORT}`);
  console.log(`Cache enabled - Data responses cached for 5 minutes`);
});
