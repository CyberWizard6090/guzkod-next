export function GetFile(filePath: string, downloadName: string) {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
