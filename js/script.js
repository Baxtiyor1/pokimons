const elForm = getElem('#form');
const elCard = getElem('.pakimon__card');
const elSelect = getElem('#select');
const elfilter = getElem('#filter');
const elInput = getElem('#input');
const elTemplate = getElem('#template').content
const elModalTemplate = getElem('#modal__template').content

//modal

const headerBtn = getElem('.header__btn');
const elModal = getElem('.modal');
const elCloseBtn = getElem('.modal__btn')

headerBtn.addEventListener('click', ()=>{
    elModal.classList.add('modal__active')
})
elCloseBtn.addEventListener('click', ()=>{
    elModal.classList.remove('modal__active')
})




let modal__card = getElem('.modal__card')
let modalArr = []

function renderFile(Arr, element, sidebar){
    elCard.innerHTML = null
    
    Arr.forEach(pokemon =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        const modalTemplate = elModalTemplate.cloneNode(true);
        
        getElem('.pakimon__img', cloneTemplate).src = pokemon.img
        getElem('.pakimon__title', cloneTemplate).textContent = pokemon.name
        getElem('.pakimon__ability', cloneTemplate).textContent = pokemon.type
        getElem('.pakimon__weidth', cloneTemplate).textContent = pokemon.weight
        getElem('.pakimon__age', cloneTemplate).textContent = pokemon.avg_spawns + ' age'
        let cardBtn = getElem('.pakimon__btn', cloneTemplate)
        cardBtn.dataset.pokemon_id = pokemon.id
        
        element.appendChild(cloneTemplate)
        
        cardBtn.addEventListener('click', (evt)=>{
            cardBtn.classList.toggle('icon__active')
            let findpokemon = Arr.find(pokemon => pokemon.id == cardBtn.dataset.pokemon_id)
            
            if(!modalArr.includes(findpokemon)){
                
                getElem('.pakimon__img', modalTemplate).src = findpokemon.img
                getElem('.pakimon__title', modalTemplate).textContent = findpokemon.name
                getElem('.pakimon__ability', modalTemplate).textContent = findpokemon.type
                getElem('.pakimon__weidth', modalTemplate).textContent = findpokemon.weight
                getElem('.pakimon__age', modalTemplate).textContent = findpokemon.avg_spawns + ' age'
                let modalBtn = getElem('.pakimon__btn', modalTemplate)
                modalBtn.dataset.modalPokemon_id = findpokemon.id

                sidebar.appendChild(modalTemplate)
                
                modalArr.push(findpokemon)
            }else{
                // let result = modalArr.find(param => param.id == cardBtn.dataset.pokemon_id)
                // let removePokimon = modalArr.splice(findpokemon.id - 1, 1)
                // console.log(removePokimon)
                
                console.log(sidebar.appendChild(modalTemplate))
            }
            console.log(modalArr)
        })
        
    })
    modalArr.forEach(item => sidebar.appendChild(item))
}
renderFile(pokemons, elCard, modal__card)


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