export async function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // fall through
    }
  }

  copyWithExecCommand(text);
}

function copyWithExecCommand(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  Object.assign(textarea.style, {
    position: "fixed",
    top: "0",
    left: "0",
    opacity: "0"
  });
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
  } catch {
    // ignore — best-effort fallback
  }
  textarea.remove();
}
