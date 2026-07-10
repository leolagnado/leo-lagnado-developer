export type LegalBlock = {
  kind:
    | 'app-title'
    | 'document-title'
    | 'meta'
    | 'summary-title'
    | 'heading'
    | 'divider'
    | 'paragraph'
    | 'list'
    | 'address'
    | 'table'
    | 'footer';
  text?: string;
  items?: string[];
};

export type LegalPage = {
  blocks: LegalBlock[];
};

const neuroHubHeadings = new Set([
  'Information We Collect',
  'How We Use Your Information',
  'Information Sharing and Disclosure',
  'Data Retention',
  'Security',
  'Changes to This Privacy Policy',
  'Contact Us',
]);

const appTitles = new Set(["Peko's Fraction Pizzeria", 'PhotoName', 'QuietScript']);
const documentTitles = new Set([
  'Privacy Policy',
  'Privacy Policy, Terms of Use',
  '& Photo Safety Notice',
  '& Audio Safety Notice',
  'Privacy Policy, Terms of Use & Safety Disclaimer',
  'Privacy Policy, Terms of Use & Audio Safety Notice',
]);

const indentation = (line: string) => line.length - line.trimStart().length;
const trimmed = (line: string) => line.trim();

const isSectionHeading = (line: string) => {
  const value = trimmed(line);
  return indentation(line) <= 1 && /^\d+\.\s+\S/.test(value) || neuroHubHeadings.has(value);
};

const isTableHeader = (line: string) => {
  const value = trimmed(line);
  return value.startsWith('Data category') && value.includes('How it is handled') && value.endsWith('Details');
};

const isBullet = (line: string) => /^(?:•||o\s|[a-c]\.\s|\d+\.\s)/.test(trimmed(line)) && !isSectionHeading(line);

const isFooter = (line: string) => {
  const value = trimmed(line);
  return value.includes('| Privacy, Terms & Safety |')
    || value.includes('| Privacy, Terms & Photo Safety')
    || value.includes('| Privacy, Terms & Audio Safety');
};

const isSpecial = (line: string) => {
  const value = trimmed(line);
  return !value
    || isSectionHeading(line)
    || isTableHeader(line)
    || isBullet(line)
    || isFooter(line)
    || appTitles.has(value)
    || documentTitles.has(value)
    || value.startsWith('Effective:')
    || value.startsWith('Plain-language summary')
    || value === 'Terms of Use'
    || value === 'Terms of Use & Photo Safety Notice'
    || value === 'Terms of Use & Audio Safety Notice'
    || value === 'Developer'
    || value === "Peko's Fraction Pizzeria Privacy";
};

const joinLines = (lines: string[]) => lines
  .map(trimmed)
  .filter(Boolean)
  .reduce((result, line) => result ? `${result.endsWith('-') ? result : `${result} `}${line}` : line, '');

const removeCommonIndent = (lines: string[]) => {
  const contentLines = lines.filter((line) => trimmed(line));
  const minimum = contentLines.length ? Math.min(...contentLines.map(indentation)) : 0;
  return lines.map((line) => line.slice(Math.min(minimum, line.length))).join('\n').trimEnd();
};

export function parseLegalPolicy(policyText: string): LegalPage[] {
  return policyText
    .replaceAll('\r\n', '\n')
    .split('\f')
    .map((pageText) => pageText.split('\n'))
    .filter((lines) => lines.some((line) => trimmed(line)))
    .map((lines) => {
      const blocks: LegalBlock[] = [];
      let index = 0;

      while (index < lines.length) {
        const line = lines[index];
        const value = trimmed(line);

        if (!value) {
          index += 1;
          continue;
        }

        if (appTitles.has(value)) {
          blocks.push({ kind: 'app-title', text: value });
          index += 1;
          continue;
        }

        if (documentTitles.has(value)) {
          blocks.push({ kind: 'document-title', text: value });
          index += 1;
          continue;
        }

        if (value.startsWith('Effective:')) {
          blocks.push({ kind: 'meta', text: value });
          index += 1;
          continue;
        }

        if (value.startsWith('Plain-language summary')) {
          blocks.push({ kind: 'summary-title', text: value });
          index += 1;
          continue;
        }

        if (value === 'Terms of Use'
          || value === 'Terms of Use & Photo Safety Notice'
          || value === 'Terms of Use & Audio Safety Notice') {
          blocks.push({ kind: 'divider', text: value });
          index += 1;
          continue;
        }

        if (isFooter(line)) {
          blocks.push({ kind: 'footer', text: value });
          index += 1;
          continue;
        }

        if (isSectionHeading(line)) {
          blocks.push({ kind: 'heading', text: value });
          index += 1;
          continue;
        }

        if (isTableHeader(line)) {
          const tableLines = [line];
          index += 1;

          while (index < lines.length) {
            const next = lines[index];
            if (isSectionHeading(next)) break;
            if (isFooter(next)) break;
            tableLines.push(next);
            index += 1;
          }

          while (tableLines.length && !trimmed(tableLines[tableLines.length - 1])) tableLines.pop();
          blocks.push({ kind: 'table', text: removeCommonIndent(tableLines) });
          continue;
        }

        if (value === 'Developer' || value === "Peko's Fraction Pizzeria Privacy") {
          const addressLines = [value];
          index += 1;

          while (index < lines.length && trimmed(lines[index]) && indentation(lines[index]) >= 4) {
            addressLines.push(trimmed(lines[index]));
            index += 1;
          }

          blocks.push({ kind: 'address', items: addressLines });
          continue;
        }

        if (isBullet(line)) {
          const items: string[] = [];

          while (index < lines.length && isBullet(lines[index])) {
            const itemLines = [trimmed(lines[index])];
            index += 1;

            while (index < lines.length && trimmed(lines[index]) && !isSpecial(lines[index])) {
              itemLines.push(trimmed(lines[index]));
              index += 1;
            }

            items.push(joinLines(itemLines));
            while (index < lines.length && !trimmed(lines[index])) index += 1;
          }

          blocks.push({ kind: 'list', items });
          continue;
        }

        const paragraphLines = [line];
        index += 1;
        while (index < lines.length && trimmed(lines[index]) && !isSpecial(lines[index])) {
          paragraphLines.push(lines[index]);
          index += 1;
        }
        blocks.push({ kind: 'paragraph', text: joinLines(paragraphLines) });
      }

      return { blocks };
    });
}
