const elForm = getElem('#form');
const elCard = getElem('.pakimon__card');
const elSelect = getElem('#select');
const elfilter = getElem('#filter');
const elInput = getElem('#input');
const elTemplate = getElem('#template').content

//modal

const headerBtn = getElem('.header__btn');
const elModal = getElem('.modal');
const elModalBtn = getElem('.modal__btn')

elModalBtn.addEventListener('click', ()=>{
    elModal.classList.remove('modal__active')
})

let modal__card = getElem('.modal__card')
let modalArr = []


headerBtn.addEventListener('click', ()=>{
    elModal.classList.add('modal__active')
})

let modalCardBtn = modal__card.querySelectorAll('.pakimon__btn')
function renderFile(Arr, element){
    element.innerHTML = null;
    
    Arr.forEach(pokemon =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        getElem('.pakimon__img', cloneTemplate).src = pokemon.img
        getElem('.pakimon__title', cloneTemplate).textContent = pokemon.name
        getElem('.pakimon__ability', cloneTemplate).textContent = pokemon.type
        getElem('.pakimon__weidth', cloneTemplate).textContent = pokemon.weight
        getElem('.pakimon__age', cloneTemplate).textContent = pokemon.avg_spawns + ' age'
        let cardBtn = getElem('.pakimon__btn', cloneTemplate);
        cardBtn.dataset.pokemon_id = pokemon.id;
        
        
        cardBtn.addEventListener('click', (e) =>{
            cardBtn.classList.toggle('pakimon__btn--active')
            let itemId = e.target.dataset.pokemon_id
            
            let findPokemon = pokemons.find((pokemon) => pokemon.id == itemId)
            let findIndex = modalArr.findIndex((pokemon) => pokemon.id == itemId)
            
            if(!modalArr.includes(findPokemon)){
                modalArr.push(findPokemon)
            }else{
                modalArr.splice(findIndex, 1)
            }
            
            renderFile(modalArr, modal__card)

            modalCardBtn.forEach(item =>{
                item.addEventListener('click', (e) =>{
                    let modCardBtn = e.target.dataset.pokemon_id;

                    let findModalEl = pokemons.find(item => item.id == modCardBtn)

                    findModalEl.cardBtn.classList.remove('pakimon__btn--active')
                })
            })
        })
        
        element.appendChild(cloneTemplate)
    })
}
renderFile(pokemons, elCard)


function renderNames(Arr, element){
    let resultNames = []
    
    Arr.forEach(pokimon =>{
        pokimon.type.forEach(Pname =>{
            if(!resultNames.includes(Pname)){
                resultNames.push(Pname)
            }
        })
    })
    
    resultNames.forEach(names =>{
        let newoption = creatElem('option')
        newoption.textContent = names
        newoption.value = names
        
        element.appendChild(newoption)
    })
}
renderNames(pokemons, elSelect)

elForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const inputValue = elInput.value.trim()
    const filtervalue = elfilter.value.trim()
    const selectValue = elSelect.value.trim()
    
    const regex = new RegExp(inputValue, 'gi')
    
    const FiltiredPokimons = pokemons.filter((pokimon) => pokimon.name.match(regex))
    
    overresult = [];
    
    if(selectValue === 'All'){
        overresult = FiltiredPokimons
    }else{
        overresult = FiltiredPokimons.filter((pokimon) => pokimon.type.includes(selectValue))
    }
    
    if(filtervalue === 'a_z'){
        overresult.sort((a, b) =>{
            if(a.name > b.name){
                return 1
            }else if(a.name < b.name){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'z_a'){
        overresult.sort((b, a) =>{
            if(a.name > b.name){
                return 1
            }else if(a.name < b.name){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'Young_Old'){
        overresult.sort((a, b) =>{
            if(a.avg_spawns > b.avg_spawns){
                return 1
            }else if(a.avg_spawns < b.avg_spawns){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'Old_Young'){
        overresult.sort((b, a) =>{
            if(a.avg_spawns > b.avg_spawns){
                return 1
            }else if(a.avg_spawns < b.avg_spawns){
                return -1
            }else{
                return 0
            }
        })
    }
    
    renderFile(overresult, elCard)
})