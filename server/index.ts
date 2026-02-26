import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(import.meta.dirname, "data", "flow.json");

app.use(cors());
app.use(express.json());

app.get("/api/flow", (_req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
      res.json(data);
    } else {
      res.json({ nodes: [], edges: [] });
    }
  } catch {
    res.json({ nodes: [], edges: [] });
  }
});

app.put("/api/flow", (req, res) => {
  const { nodes, edges } = req.body;

  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    res.status(400).json({ error: "Body must contain nodes and edges arrays" });
    return;
  }

  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify({ nodes, edges }, null, 2));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
