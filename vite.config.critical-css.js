// Vite plugin to make CSS non-blocking (optional enhancement)
// This can be added to vite.config.js plugins array if needed
// For now, we're using the script-based approach in index.html

export function makeCSSNonBlocking() {
  return {
    name: 'make-css-non-blocking',
    transformIndexHtml(html) {
      // This would modify the HTML to make CSS non-blocking
      // Currently handled by script in index.html
      return html;
    },
  };
}

