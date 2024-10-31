import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import fs from "fs";
// Initialize lowdb

const adapter = new JSONFile<{
  poaps: Record<string, string>[]; // URL, Address
}>(".data/db.json");
export const db = new Low<{
  poaps: Record<string, string>[]; // URL, Address
}>(adapter, {
  poaps: [],
});
