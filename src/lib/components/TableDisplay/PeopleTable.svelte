<!-- 
    Component for showing tabulated content.
    Pass a reference to a dataset to display it.
 -->
<script>
//       Imports
// =====================
	// Components
	import Tags from '$components/shared/Tags.svelte';
	import ModifierKeys from '$components/LogicComponents/ModifierKeys.svelte';
	import PeopleDetails from '$components/DetailsDisplay/PeopleDetails.svelte';
	import PeopleRow from '$components/TableDisplay/PeopleRow.svelte';
	import PeopleTableNav from '$components/TableDisplay/PeopleTableNav.svelte';

	// Functions
	import { capitalize } from '../../scripts/MyUtilityFunctions';


	//         Props
	// =====================
	export let dataset; // Dataset to display - writable store
	export let maxItems = 50; // Maximum number of items on a page
	export let displayOptions = {
		// id: "Id",
		name: 'Imię',
		// surname: "Nazwisko",
		gender: "Płeć",
		address: 'Adres'
		// city: "Miasto"
	};

//     Hooking Data
// =====================
	let items = $dataset;

//    Dividing into pages
// ========================
	$: numberOfPages = Math.ceil(items.length / maxItems);
	let currentPage = 0;

	// Currently shown group
	// e.g if we are on page 5 and there are 10 records per page
	//     we want to show records 41-50 (inclusive)
	$: items;
	$: currentGroup = items.slice(maxItems * currentPage, maxItems * (currentPage + 1));

//   Dividing into columns
// ========================
	const numberOfColumns = Object.keys(displayOptions).length + 1;

//    Reactive Variables
// ========================
	$: totalItems = items.length;
	$: totalMales = items.filter((i) => i['gender'] == 'M').length;
	$: totalFemales = items.filter((i) => {
		return i['gender'] == 'F';
	}).length;


//     Local Variables
// =====================
	let selectedRows = [];
	let modKeys = [];
	let startRange = 0;
	let endRange = 0;

//        Functions
// =====================
	const toggleSelection = (personID) => {
		if (!checkIfSelected(personID)) {
			selectedRows = [...selectedRows, personID];
		} else {
			selectedRows = selectedRows.filter((id) => id != personID);
		}
	};

	const addSelection = (personID) => {
		if (!checkIfSelected(personID)) {
			selectedRows = [...selectedRows, personID];
			console.log(`Added ${personID} person`);
		} 
	};

	const selectRange = () => {
		let selectedRange = [];
		for (let i = Math.min(startRange, endRange); i <= Math.max(startRange, endRange); i++) {
			selectedRange.push(i)		
		}

		selectedRows = [...selectedRows, ...selectedRange];
	}

	const checkIfSelected = (personID) => {
		return selectedRows.includes(personID);
	};

//         Events
// =====================
	// On a clicked event we receive which row (person) has been clicked
	// So we can do update it as needed it
	const handleRowClick = (person) => {
		if (modKeys.includes("Shift")) {
			endRange = person.id;
			selectRange();
		}
		else if (modKeys.includes("Control")) {
			toggleSelection(person.id);
			startRange = person.id
		}
		else{
			selectedRows = [];
			toggleSelection(person.id);
			startRange = person.id
		}
		deletePerson(person);
	};

	// Delete a row (perrson)
	const deletePerson = (person) => {
		items = items.filter((i) => i != person);
		currentGroup =items.slice(maxItems * currentPage, maxItems * (currentPage + 1));
	};

	const deleteAll = () => {
		items = [];
	};

	const resetList = () => {
		items = $dataset;
	};

	const updateCity = (person) => {
		// $dataset[person.id - 1]['name'] = "Kutwa";
		let tempItems = items;
		tempItems[person.id - 1]['name'] = "Kutttturu";

		items = tempItems;
	};

	const handleNavLinkClick = (event) => {
		currentPage = event.detail.pageId;
	};

	const handleFilterClicked = (tag) => {
		let filtersCopy = filters;
		filtersCopy[tag.id - 1].state =
			filtersCopy[tag.id - 1].state == 'active' ? 'inactive' : 'active';

		filters = filtersCopy;
	};


//        Filters
// =====================
	let filters = [
		{ id: 1, type: 'Lokalizacja', value: 'Ursynów', state: 'active' },
		{ id: 2, type: 'Finanse', value: 'brak zaległości', state: 'active' },
		{ id: 3, type: 'Wiek', value: '8-10 lat', state: 'active' },
		{ id: 4, type: 'Przedmiot', value: 'Programowanie', state: 'active' }
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
</script>

<ModifierKeys bind:modKeys showModal={false} />

<div class="container noselect">

	<!--  If the dataset _IS_ empty  -->
	{#if items.length < 1}
		<div class="emptyListContainer">
			<div class="emptyListText">Brak rekordów</div>
		</div>

	<!-- If the dataset _IS NOT_ empty -->
	{:else}

		<!-- If there is more than one page of records, we display page navigation -->
		{#if numberOfPages != 0}
			<PeopleTableNav {numberOfPages} {currentPage} on:navlicked={handleNavLinkClick} />
		{/if}

		<!-- Table with records -->
		<div class="table">

			<!-- We first display the header with labels -->
			<div id={`headerRow`} class="row accent tableHeader">
				<div class="item">L.p.</div>
				{#each Object.values(displayOptions) as label}
					<div class="item">{capitalize(label)}</div>
				{/each}
			</div>
			<!-- end of HEADER -->

			<!-- Then the items -->
			{#each currentGroup as person, i (person.id)}
				<div
					class="row"
					class:selected={selectedRows.includes(person.id)}
					on:click={() => handleRowClick(person)}
				>
					<PeopleRow
						{person}
						{displayOptions}
						i={i + currentPage * maxItems}					
					/>
				</div>
				<!-- end of ITEMS -->
			{/each}
			<!-- end of ITEMS -->

			<!-- Lastly we display a footer just for estetic reasons -->
			<div class="row accent tableFooter">
				{#each Array(numberOfColumns) as _, i (i)}
					<div id={`footerRow_${i}`} class="footerItem item" />
				{/each}
			</div>
			<!-- end of FOOTER -->
		</div>
		<!-- end of TABLE -->

		<!-- If there is more than one page of records, we display page navigation -->
		{#if numberOfPages != 0}
			<PeopleTableNav {numberOfPages} {currentPage} on:navlicked={handleNavLinkClick} />
		{/if}
	{/if}

	<!-- If there are filters present we display them -->
	{#if filters.length > 0}
		<Tags callback={handleFilterClicked} tags={filters} />
	{/if}
</div>

<!-- end of CONTAINER -->
<style>
/* ===== General ======= */
	.container {
		display: flex;
		padding: 2rem 2rem;
		flex-direction: column;
		color: #ccc;
		width: min(100%, 1000px);
		font-size: 1rem;
	}

/* ===== Table Body ====== */
	.table {
		display: table;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.row {
		display: table-row;
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

	.row.selected {
		background-color: var(--table-row-selected-bg);
	}

	.row.selected:hover {
		background-color: var(--table-row-selected-hover-bg);
	}

	.row.accent {
		background-color: var(--table-header-bg);
		color: var(--table-header-text);
		font-weight: 900;
		text-align: center;
	}

	.tableHeader .item {
		padding: 0.5rem 1rem;
	}

	.tableFooter {
		height: 0.5rem;
	}

	.item {
		display: table-cell;
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
</style>
