<!-- 
    Component for showing tabulated content.
    Pass a reference to a dataset to display it.
 -->
<script>
//       Imports
// =====================
    // Components
    import Tags from "../shared/Tags.svelte";
    import ButtonRainbow from "../shared/ButtonRainbow.svelte";

    import PeopleDetails from "../DetailsDisplay/PeopleDetails.svelte";
    import PeopleRowGrid from "./PeopleRow.svelte";
    import PeopleTableNav from "./PeopleTableNav.svelte";

    // Functions
    import {
        capitalize,
        cssVariables,
        changeCssVariable,
    } from "../../scripts/MyUtilityFunctions";

//         Props
// =====================
    export let dataset; // Dataset to display - writable store
    export let maxItems = 50; // Maximum number of items on a page
    export let displayOptions = {
        // id: "Id",
        name: "Imię",
        // surname: "Nazwisko",
        // gender: "Płeć",
        address: "Adres",
        // city: "Miasto"
    };

//     Hooking Data
// =====================
    let items = [];

    // dataset.subscribe((data) => {
    //     // Subscribe to the store to receive updates
    //     items = data; // whenever the data changes
    // });

    // This is equivalent to the above method! <3
    items = $dataset

//    Dividing into pages
// ========================
    $: numberOfPages = Math.ceil(items.length / maxItems);
    let currentPage = 0;
    
    // Currently shown group
    // e.g if we are on page 5 and there are 10 records per page
    //     we want to show records 41-50 (inclusive)
    $: currentGroup = items.slice(
        maxItems * currentPage,
        maxItems * (currentPage + 1)
        );
        
//   Dividing into columns
// ========================
    const numberOfColumns = Object.keys(displayOptions).length + 1;
    changeCssVariable("num-of-col", numberOfColumns);
    changeCssVariable("num-of-eq-col", numberOfColumns - 1);

//        Variables
// ========================
    $: totalItems = items.length;
    $: totalMales = items.filter((i) => i["gender"] == "M").length;
    $: totalFemales = items.filter((i) => {
        return i["gender"] == "F";
    }).length;

//         Events
// =====================

    // On clicked event we receive which row (person) has been clicked
    // So we can do update it as needed it
    
    const handleRowClick = (person) => {
        showDetails(person);        
    };
    
    // Delete a row (perrson)
    const deletePerson = (person) => {
        items = items.filter( i => i != person);
    }

    const deleteAll = () => {
        items = [];
    }

    const resetList = () => {
        items = $dataset;
    }

    const updateGender = (person) => {
        let tempItems = items;
        tempItems[person.id - 1]["gender"] = "F";
        items = tempItems;
    };

    const handleNavLinkClick = (event) => {
        currentPage = event.detail.pageId;
    };

    const handleButtonClick = () => {
        kasia = "red";
    };

    const handleFilterClicked = (tag) => {
        let filtersCopy = filters;
        filtersCopy[tag.id - 1].state =
            filtersCopy[tag.id - 1].state == "active" ? "inactive" : "active";

        filters = filtersCopy;
    };

//        Filters
// =====================
    let filters = [
        // { id: 1, type: "Lokalizacja", value: "Ursynów", state: "active" },
        // { id: 2, type: "Finanse", value: "brak zaległości", state: "active" },
        // { id: 3, type: "Wiek", value: "8-10 lat", state: "active" },
        // { id: 4, type: "Przedmiot", value: "Programowanie", state: "active" },
    ];

//        Details
// =====================

    //  change CSS variable with JS
    // =============================
    // 1. Create a JS variable with some name                           e.g:    let size = "20px";
    // 2. Create a CSS variable with the same name                      e.g:    :root { --size: 20px; }
    // 3. Use this variable wherever you want in the CSS                e.g:    .myDiv { width: var(--size) } 
    // 4. Change the value of the _JS_ where needed                     e.g:    const changeWlk = () => { size = `${size} + 10px` }
    // 5. On the object using this value we apply use:cssVariables()    e.g:    <div class="myDiv" use:cssVariables={{ size }}

    let left = 0;
    let top = 0;
        
    let detailsVisible = false;
    let selected = 0;
    let lastSelected = -1;

    const showDetails = (person) => {    
        console.log(`Ostatni: ${lastSelected} \t Obecny: ${person.id}`)
        
        if (person.id == lastSelected) {
            detailsVisible = false;
            lastSelected = -1;
            return;
        }  
        
        detailsVisible = true;
        selected = person;
        lastSelected = selected.id;
    }

    const handleMouseMove = (event) => {
        left = `${event.clientX + 20}px`;
        top  = `${event.clientY + 20}px`;
    };
</script>

<svelte:head>
	<link 								rel='stylesheet' type ="text/css" href='./styles/reset.css'>
	<link 								rel='stylesheet' type ="text/css" href='./styles/general.css'>
	<link id="pagestyle" 	rel="stylesheet" type ="text/css" href="./styles/darkTheme.css">    
    <title>Tesseract - PeopleTable</title>
</svelte:head>

<div class="container" on:mousemove={handleMouseMove}>

    <!--  If the dataset _IS_ empty  -->
    {#if items.length < 1}
        <div class="emptyListContainer">
            <div class="emptyListText">Brak rekordów</div>
        </div>

    <!-- If the dataset _IS NOT_ empty -->
    {:else}
        <!-- If there is more than one page of records, we display page navigation -->
        {#if numberOfPages != 0}
           <PeopleTableNav {numberOfPages} {currentPage}  on:navlicked={handleNavLinkClick} />
        {/if}

        <div class="table">
            <!-- We first display the header with labels -->
            <div id={`headerRow`} class="row header">
                <div class="header">L.p.</div>
                {#each Object.values(displayOptions) as label}
                    <div class="header">{capitalize(label)}</div>
                {/each}
            </div> <!-- end of HEADER -->

            <!-- Then the items -->
            {#each currentGroup as person, i (person.id)}
                <div
                    id={`row_${person.id}`}
                    class="row"
                    on:click={() => handleRowClick(person)}
                >
                    <PeopleRowGrid
                        {person}
                        i={i + currentPage * maxItems}
                        {displayOptions}
                        on:click={() => handleRowClick(person)}
                    />
                </div> <!-- end of ITEMS -->
            {/each}

            <!-- Lastly we display a footer just for estetic reasons -->
            <div class="tableFooter">
                {#each Array(numberOfColumns) as _, i (i)}
                    <div id={`footerRow_${i}`} class="footerItem" />
                {/each}
            </div> <!-- end of FOOTER -->

        </div>  <!-- end of TABLE -->

        <!-- If there is more than one page of records, we display page navigation -->
        {#if numberOfPages != 0}
           <PeopleTableNav {numberOfPages} {currentPage}  on:navlicked={handleNavLinkClick} />
        {/if}
    {/if}

     <!-- If there are filters present we display them -->
    {#if filters.length > 0}
        <Tags callback={handleFilterClicked} tags={filters} />
    {/if}

</div> <!-- end of CONTAINER -->

<!-- Rainbow Buttons -->
<div class="tableTopNav">
    <ButtonRainbow on:click={resetList}>
        Reset List
    </ButtonRainbow>
    <ButtonRainbow on:mousedown={deleteAll}>
        Delete All
    </ButtonRainbow>
</div>

<!-- Modal Window with Details -->
{#if detailsVisible == true}
    <div class="modal" use:cssVariables={{ left, top }}>
        <PeopleDetails person={selected} />
    </div>
{/if}


<style>
/* ===== General ======= */
    :root {
        --left: 0;
        --top: 0;
        --num-of-col: 6;
        --num-of-eq-col: calc(var(--num-of-col) - 1);
    }

    .container {
        color: #ccc;
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        width: 900px; 
    }

    @media screen and (max-width: 950px){
        .container{
            width: initial;
        }
    }

/* ===== Table Body ====== */
    .table {
        shape-outside: circle();
        flex-shrink: 1;
        display: grid;
        grid-template-columns: 0.15fr repeat(var(--num-of-eq-col), 1fr);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .row {
        display: grid;
        grid-column: span var(--num-of-col);
        grid-template-columns: subgrid;
        cursor: pointer;
    }
    
    .row:nth-of-type(odd) {
        background-color: var(--table-row-odd-bg);
    }
    
    .row:nth-of-type(even) {
        background-color: var(--table-row-even-bg);
    }
    
    .row:hover {
        background-color: var(--table-row-hover-bg);
    }

    .row.header{
        background-color: var(--table-header-bg);
        border-top-right-radius:var(--table-border-radius);
        border-top-left-radius: var(--table-border-radius);

        font-weight: 900;
        text-align: center;
        color: var(--table-header-text);
        padding: 0.2rem 0.5rem;
    }

    .tableFooter {
        height: 10px;
        grid-column: span var(--num-of-col);
        background-color: var(--table-header-bg);
        border-bottom-right-radius: var(--table-border-radius);
        border-bottom-left-radius: var(--table-border-radius);
    }

/* ===== Table Top Nav ===== */
    .tableTopNav {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

/* ===== No Content ====== */
    .emptyListContainer {
        display: flex;
        width: 100%;
        min-height: 150px;
        background-color: var(--background-accent);
        justify-content: center;
        align-items: center;
        border-radius: var(--table-border-radius);
        margin: 10px 0;
    }

    .emptyListText {
        color: var(--text-main-disabled);
        transform: rotate(5deg);
        font-size: 3rem;
    }

/* ===== Details ====== */
    .modal {
        position: absolute;
        top: var(--top);
        left: var(--left);
        z-index: 20;
    }
</style>
