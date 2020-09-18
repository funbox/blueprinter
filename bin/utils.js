const fs = require('fs').promises;
const path = require('path');

const ERROR_LINES_PADDING = 4;
const ROW_HIGHLIGHT_MARK = '>';
const COLUMN_HIGHLIGHT_MARK = '^';

const ANSI_RED = '\x1b[31m';
const ANSI_ALL_OFF = '\x1b[0m';

function errMessage(message, error) {
  error.message = `${message}: ${error.message}`;
  return error;
}

function astHasError(parseResult) {
  const errorAnnotationIndex = parseResult.annotations.findIndex(anno => anno.type === 'error');
  if (errorAnnotationIndex > -1) {
    const anno = parseResult.annotations[errorAnnotationIndex];
    const { text } = anno;

    if (!anno.sourceMap) {
      return [true, { text }];
    }

    const position = anno.sourceMap.charBlocks[0];
    const file = anno.sourceMap.file;
    return [true, { text, position, file }];
  }
  return [false];
}

function rejectCrafterError(inputFile, errorDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      const { text: errorText, file: errorFile, position } = errorDetails;
      const requestedFile = errorFile ? path.resolve(path.dirname(inputFile), errorFile) : inputFile;

      if (!position) {
        const text = createErrorText(requestedFile, errorText);
        reject(new Error(text));
        return;
      }

      const sourceLinesForError = await getSourceLinesForError(requestedFile, position);
      const text = createErrorText(requestedFile, errorText, sourceLinesForError);
      reject(new Error(text));
    } catch (e) {
      reject(e);
    }
  });
}

async function extendAst(ast, inputFile, errorDetails) {
  const { file: errorFile, position } = errorDetails;
  const requestedFile = errorFile ? path.resolve(path.dirname(inputFile), errorFile) : inputFile;
  const astDetails = {
    file: requestedFile,
  };

  if (position) {
    const lines = await getSourceLinesForError(requestedFile, position);
    astDetails.lines = getErrorDetails(lines, false);
  }

  ast.attributes = {
    errorDetails: astDetails,
  };

  return ast;
}
module.exports = {
  errMessage,
  astHasError,
  rejectCrafterError,
  extendAst,
};

async function getSourceLinesForError(requestedFile, errorPosition) {
  const fileSourceLines = await getFileLines(requestedFile);
  const originalLines = { ...errorPosition };
  const paddedLines = {
    startLine: Math.max(errorPosition.startLine - ERROR_LINES_PADDING, 1),
    endLine: Math.min(errorPosition.endLine + ERROR_LINES_PADDING, fileSourceLines.length),
  };
  return getSourceLinesSubset(fileSourceLines, paddedLines, originalLines);
}

async function getFileLines(fileName) {
  const source = await fs.readFile(fileName, { encoding: 'utf-8' });
  return source.split('\n');
}

function getSourceLinesSubset(fullSourceLines, paddedLines, originalLines) {
  const { startLine, endLine } = paddedLines;

  const linesSubset = fullSourceLines
    .slice(startLine - 1, endLine)
    .map((line, index) => {
      const position = index + startLine;
      const highlightedRow = position >= originalLines.startLine && position <= originalLines.endLine;
      return ({
        text: line,
        position,
        highlightedRow,
      });
    });
  const firstHighlightedLineIndex = linesSubset.findIndex(line => line.highlightedRow);

  return [
    ...linesSubset.slice(0, firstHighlightedLineIndex + 1),
    {
      text: `${COLUMN_HIGHLIGHT_MARK}`.padStart(originalLines.startColumn),
      position: null,
      highlightedRow: true,
    },
    ...linesSubset.slice(firstHighlightedLineIndex + 1),
  ];
}

function createErrorText(fileName, errorText, errorDetails) {
  const details = Array.isArray(errorDetails) && errorDetails.length > 0 ? getErrorDetails(errorDetails) : [];
  return [
    ANSI_RED,
    `ERROR in ${fileName}`,
    `Crafter Error: ${errorText}`,
    ANSI_ALL_OFF,
    ...details,
  ].join('\n');
}

function getErrorDetails(errorDetails, colorize = true) {
  const maxPosition = errorDetails[errorDetails.length - 1].position;
  return errorDetails.map(line => getErrorLineText(line, maxPosition, colorize));
}

function getErrorLineText(line, maxPosition, colorize) {
  const padSymbols = line.highlightedRow ? ` ${ROW_HIGHLIGHT_MARK}` : ` ${' '.repeat(ROW_HIGHLIGHT_MARK.length)}`;
  const maxPositionString = maxPosition.toString(10);
  const positionString = line.position ? line.position.toString(10) : '';
  const positionSymbols = positionString.padStart(maxPositionString.length);
  const text = `${padSymbols} ${positionSymbols} | ${line.text}`;

  return colorize && line.highlightedRow ? colorizeText(text, ANSI_RED) : text;
}

function colorizeText(text, ANSIColor) {
  return `${ANSIColor}${text}${ANSI_ALL_OFF}`;
}
