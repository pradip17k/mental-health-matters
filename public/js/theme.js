try {
  const saved = localStorage.getItem('theme');
  document.documentElement.dataset.theme = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
} catch { /* The site also works when browser storage is unavailable. */ }
