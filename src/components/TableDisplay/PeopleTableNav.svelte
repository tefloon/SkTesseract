<script>
//     Display Settings
// =======================
   let firstLast = 3;
   let inTheMiddle = 5;
   let collapse = true;

   const pagesBeforeAfter = Math.floor(inTheMiddle / 2); // number of links before and after our current page
   inTheMiddle = 2 * pagesBeforeAfter + 1;               // this ensures that the value is odd

//         Imports
// ========================
   import { createEventDispatcher } from "svelte";
   const dispatch = createEventDispatcher();

//   External Variables
// ========================
   export let numberOfPages = 0;
   export let currentPage = 10;

//        Functions
// ========================

   const filterInvalidPages = (pages) => {
      return pages.filter((page) => page >= 0 && page < numberOfPages);
   };

   const handleNavLinkClick = (pageClicked) => {
      dispatch("navlicked", {
         pageId: pageClicked,
      });
   };

   const createMiddleRange = (currPage) => {
      let result = [];

      for (let i = 0; i < inTheMiddle; i++) {
         result.push(currPage + (i - pagesBeforeAfter));
      }

      return result;
   };

//     Pages to show
// ========================
   let start = Array.from(Array(firstLast).keys());    // [0, 1, 2, ..., n]
   
   $: middle = createMiddleRange(currentPage);
   let end = (Array.from(Array(firstLast).keys())).map( (i) => { return numberOfPages - i - 1 } ).reverse();   // for 34 pages [ 33, 32, 31, ... 34-n]
   
   $: pagesToShowAll = start.concat(middle, end);
   $: pagesToShowValid = filterInvalidPages(pagesToShowAll);
   $: pagesToShow = [...new Set(pagesToShowValid)]; 

   $: lastPage = pagesToShow[pagesToShow.length - 1]
</script>

{#if numberOfPages > 0}
   <div class="tableNavContainer">

      <!-- if we're not at the first page, show arrows -->
      <div class="arrows">
         {#if currentPage != 0 }
            <button class="tableNavBtn" on:click={ () => handleNavLinkClick(currentPage - 1) } >
               {"<<"}
            </button>
         {/if}
      </div>

      <div class="tableNavPagesContainer" class:tableNavPagesContainer_all={ !collapse } class:tableNavPagesContainer_collapse={ collapse }>
         <!-- if we DON'T COLLAPSE, show all -->
         {#if !collapse}
            {#each Array(numberOfPages) as _, i (i)}
                  <button class="tableNavBtn" class:current={ currentPage == i } on:click={ () => handleNavLinkClick(i) } >
                     {i + 1}
                  </button>
            {/each}

         <!-- if DO COLLAPSE show parts -->
         {:else}

            <!-- Go through all the pages to show -->
            {#each pagesToShow as i (i)}

               <!-- If we're NOT CLOSE TO THE BEGINNING, show '...'     -->
               {#if currentPage > (pagesBeforeAfter + firstLast + 1) && i == pagesToShow[firstLast] }
               <button class="tableNavBtn" on:click={ () => collapse = false } >
                  {"..."}
               </button>
               
               <!-- If we're a the breaking point, switch '...' to the appropriate number -->
               {:else if currentPage == pagesBeforeAfter + firstLast + 1 && i == firstLast + 1 }
                  <button class="tableNavBtn" on:click={ () => handleNavLinkClick(firstLast) } >
                     { firstLast + 1 }
                  </button>
               {/if}
               
               <!-- If we're NOT CLOSE TO THE END, show '...' -->
               {#if i == numberOfPages - firstLast  && currentPage <  numberOfPages - pagesBeforeAfter - firstLast - 2}
               <button class="tableNavBtn" on:click={ () => collapse = false } >
                  {"..."}
               </button>

               <!-- If we're a the breaking point, switch '...' to the appropriate number -->
               {:else if currentPage == numberOfPages - pagesBeforeAfter - firstLast - 2 && i == pagesToShow[pagesToShow.length - firstLast]}
                  <button class="tableNavBtn" on:click={ () => handleNavLinkClick(numberOfPages - firstLast - 1) } >
                     {numberOfPages - firstLast }
                  </button>
               {/if}

               <!-- Show all the page numbers -->
                  <button class="tableNavBtn" class:current={ currentPage == i } on:click={ () => handleNavLinkClick(i) } >
                     {i + 1}
                  </button>

            {/each} <!-- end of EVERY PAGE loop -->
         {/if}  <!-- end of DON't COLLAPSE if -->
      </div>

      <!-- if we're not at the last page, show arrows -->
      <div class="arrows">
         {#if currentPage != lastPage }
            <button class="tableNavBtn" on:click={ () => handleNavLinkClick(currentPage + 1) } >
               {">>"}
            </button>
         {/if}
      </div>

   </div> <!-- end of tableNavContainer -->
{/if} <!-- end of PAGES EXIST if -->

<style>

   .tableNavContainer{
      display: grid;
      grid-template-columns: min-content auto min-content;
      margin: 10px 0;
   }

   .tableNavPagesContainer_all {
      display: grid;
      grid-auto-rows: 1.6rem;
      grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
      gap: .2rem;

   }

   .tableNavPagesContainer_collapse {
      display: flex;
      justify-content: center;
      gap: .2rem;
   }

   .tableNavBtn{
      background-color: rgba(0,0,0,.5);
      border: 1px solid rgb(82, 82, 82);
      border-radius: 3px;
      color: var(--table-header-text);
      cursor: pointer;
      padding: 0 5px;
   }

   .tableNavBtn:hover{
       background-color: rgba(0,0,0,.75);
   }

   .arrows{
      display: flex;
      width: 3rem;
      justify-content: center;
      align-items: center;
   }
   
   .arrows .tableNavBtn{
      padding: 0.1rem 0.5rem;
      padding-bottom: 0.2rem;
   }

   .current {
      /* color: yellow; */
      font-weight: 800;
   }
</style>
