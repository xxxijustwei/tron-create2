export function stringToHex(str, size) {
  const bytes = Buffer.from(str, "utf8");
  if (bytes.length > size) {
    throw new Error(`String is too long for size ${size}`);
  }
  
  const padded = Buffer.alloc(size);
  bytes.copy(padded);
  
  return padded.toString("hex");
}