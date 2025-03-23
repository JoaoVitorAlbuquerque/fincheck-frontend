export function generateFileName(fileName: string) {
  return `uploads/transactions/${Date.now().toString()}-${fileName}`;
}
