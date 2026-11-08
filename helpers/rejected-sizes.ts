import fs from 'fs';
import path from 'path';

const file = path.join('test-results', 'rejected-sizes.txt');

/** Sizes checkout has already rejected in this run. Retries then buy a different one. */
export function rejectedSizes(): Set<string> {
  try {
    return new Set(
      fs
        .readFileSync(file, 'utf8')
        .split('\n')
        .map((size) => size.trim())
        .filter(Boolean),
    );
  } catch {
    return new Set();
  }
}

export function rejectSize(size: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${size}\n`);
}
