<script>
  export let className;
  export let search;
</script>

<div
  class={className +
    ' h-12 flex relative drop-shadow-md rounded-md lg:h-[3.5rem]'}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.3em"
    height="1.3em"
    viewBox="0 0 24 24"
    class="text-gray-400 left-7 top-[0.9rem] lg:top-[1.15rem] absolute"
    ><path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
    /></svg
  >
  <input
    class="rounded-md w-full pl-[4.6rem] text-xs bg-white text-input-dark-gray placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-300 dark:bg-elements-dark-blue"
    type="text"
    placeholder="Search for a country..."
    on:keyup={e => search(e.target.value)}
  />
</div>
