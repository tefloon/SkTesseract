<script>
    export let person;
</script>

<div class="content">
    <div class="header">
        <h1 class="name">{ person.name } { person.surname } ({ person.gender })</h1>
        <div class="current">
            <span class="detail group">
                <span class="label">Grupa: </span>
                <span class="itemName">Pitagoras I</span>
            </span>
            <span class="detail teacher">
                <span class="label">Nauczyciel: </span>
                <span class="itemName">Antoni Gawlikowski</span>
            </span>
        </div>
    </div>
    <div class="infoGroup">
        <h3>Dane kontaktowe</h3>
        <div class="details parents">
            <div class="detail parent">
                <span class="label">Tata: </span>
                <span class="itemName">{ person.parents.dad.name }</span>
            </div>
            <div class="detail phone">
                <span class="label">Telefon: </span>
                <span class="itemName">{ person.parents.dad.phone }</span>
            </div>
            <div class="detail phone">
                <span class="label">e-mail: </span>
                <span class="itemName" class:hide={ person.parents.dad.email === undefined ? true : false }>{ person.parents.dad.email }</span>
            </div>
        </div>
        <div class="details parents">
            <div class="detail parent">
                <span class="label">Mama: </span>
                <span class="itemName">{ person.parents.mom.name }</span>
            </div>
            <div class="detail phone">
                <span class="label">Telefon: </span>
                <span class="itemName">{ person.parents.mom.phone }</span>
            </div>
            <div class="detail phone">
                <span class="label">e-mail: </span>
                <span class="itemName" class:hide={ person.parents.mom.email === undefined ? true : false }>{ person.parents.mom.email }</span>
            </div>
        </div>
    </div>
     <div class="infoGroup">
        <h3>Adres</h3>
        <div class="details">
            <div class="detail address">
                <span class="itemName">{ person.address }, { person.city }</span>
            </div>
        </div>
    </div>
    <div class="infoGroup">
        <h3>Finanse</h3>
        <div class="details">
            <div class="detail address">
                <span class="label">Maj: </span>
                <span class="itemName">0 zł</span>
            </div>
        </div>
        <div class="details">
            <div class="detail address">
                <span class="label">Kwiecień: </span>
                <span class="itemName">-232 zł</span>
            </div>
        </div>
        <div class="details">
            <div class="detail address">
                <span class="label">Marzec: </span>
                <span class="itemName">0 zł</span>
            </div>
        </div>
    </div>
    <div class="infoGroup">
        <h3>Historia grup</h3>
        <div class="details">
            <div class="detail address">
                <span class="label">2021/22: </span>
                <span class="itemName">Pitagoras I</span>
            </div>
        </div>
        <div class="details">
            <div class="detail address">
                <span class="label">2020/21: </span>
                <span class="itemName">Pascal II</span>
            </div>
        </div>
        <div class="details">
            <div class="detail address">
                <span class="label">2019/20: </span>
                <span class="itemName">Pascal I</span>
            </div>
        </div>
    </div>
</div>

<style>
    h1, h3{
        color: #ccc;
    }
    
    h3{
        margin-bottom: 5px;
        border-bottom: 1px rgb(143, 143, 143) solid;
        padding: 0 5px;
        
    }

    .content{
        background-color: rgba(0, 0, 0, 0.7);
        color: red;
        padding: 15px;
    }

    .header{
        display: flex;
        flex-direction: column;
        justify-content: baseline;
        align-items: center;
        margin-bottom: 20px;
    }

    .infoGroup{
        margin-bottom: 1rem;
    }

    .name{
        border-bottom: 1px blue solid;
        margin-bottom: 5px;
    }

    .details{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .detail{
        padding: 0 20px;
    }

    .details.parents{
        font-size: .8rem;
    }

    .label{
        color: #ccc;
    }

    .itemName{
        color: orange;
        font-weight: bold;
    }

    .hide{
        display: none;
    }
</style>