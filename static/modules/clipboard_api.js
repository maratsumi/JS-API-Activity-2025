function clipboardCopy(meanings) {
  const copy_button = document.getElementById("copy_button");
  if (meanings.synonyms.length != 0) {
    navigator.clipboard.writeText(meanings.synonyms);
    copy_button.textContent = "Copied";
  } else {
    copy_button.textContent = "No synonym available";
  }
}

export { clipboardCopy };
