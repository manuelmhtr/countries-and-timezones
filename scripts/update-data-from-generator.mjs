import {cp, mkdir, readFile, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const execFileAsync = promisify(execFile);
const repoRoot = process.cwd();
const generatorDir =
  process.env.COUNTRIES_AND_TIMEZONES_GENERATOR_DIR || process.argv[2];
const outputFile = '/tmp/countries-and-timezones.json';
const dataTarget = path.join(repoRoot, 'src', 'data.json');
const metadataTarget = path.join(repoRoot, 'src', 'metadata.json');

if (!generatorDir) {
  throw new Error(
    'Missing generator directory. Set COUNTRIES_AND_TIMEZONES_GENERATOR_DIR or pass the path as the first argument.',
  );
}

await execFileAsync('npm', ['start'], {
  cwd: generatorDir,
  env: process.env,
});

if (!existsSync(outputFile)) {
  throw new Error(`Generator output was not found at ${outputFile}.`);
}

const [generatedData, currentMetadata, tzdbVersion] = await Promise.all([
  readFile(outputFile, 'utf8'),
  readFile(metadataTarget, 'utf8'),
  getLatestTzdbVersion(),
]);

await mkdir(path.dirname(dataTarget), {recursive: true});
await cp(outputFile, dataTarget);

const metadata = JSON.parse(currentMetadata);
metadata.tzdbVersion =
  process.env.TZDB_VERSION || tzdbVersion || metadata.tzdbVersion;
metadata.generatedAt = new Date().toISOString();
metadata.generator = {
  repository: 'manuelmhtr/countries-and-timezones-generator',
};

await Promise.all([
  writeFile(dataTarget, `${generatedData.trim()}\n`),
  writeFile(metadataTarget, `${JSON.stringify(metadata, null, 2)}\n`),
]);

async function getLatestTzdbVersion() {
  const response = await fetch('https://data.iana.org/time-zones/tzdb/NEWS');
  if (!response.ok) return undefined;
  const news = await response.text();
  const match = news.match(/Release\s+(\d{4}[a-z])/);
  return match?.[1];
}
