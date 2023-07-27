function uuid() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    const start = Math.floor(Math.random() * 0x10);
    s[i] = hexDigits.slice(start, start + 1);
    // s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  const start = (s[19] & 0x3) | 0x8;
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.slice(start, start + 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  const uuid = s.join("");
  return uuid;
}

export class Repository {
  key_entity_map = {};
  entity_id_key_map = {};
  constructor() {}
  add(entry) {
    const key = uuid();
    this.key_entity_map[key] = entry;
    if (!this.entity_id_key_map[entry.id]) {
      this.entity_id_key_map[entry.id] = new Set();
    }
    this.entity_id_key_map[entry.id].add(key);
    return key;
  }
  getEntry(key) {
    return this.key_entity_map[key] || {};
  }

  getKeys(id) {
    return this.entity_id_key_map[id] || [];
  }
}
