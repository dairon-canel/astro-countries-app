<script>
  let theme = localStorage.getItem('theme') ?? 'light';

  function handleClick() {
    theme === 'light' ? (theme = 'dark') : (theme = 'light');
  }

  $: {
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }
</script>

<div>
  <button on:click={handleClick}>
    {theme === 'light' ? '🌙' : '🌞'}
  </button>
</div>
