// Empty stub for @solana-program/system to prevent build errors
export function getTransferSolInstruction(...args) {
  throw new Error('Solana is not enabled');
}

export const createTransferInstruction = getTransferSolInstruction;

export default {
  getTransferSolInstruction,
  createTransferInstruction,
};

