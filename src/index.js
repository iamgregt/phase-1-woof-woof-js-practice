const dogBar = document.querySelector('#dog-bar')
const dogInfoContainer = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')
let dogImg = document.createElement('img')
let dogH2 = document.createElement('h2')
let dogButton = document.createElement('button')

goodDogFilter.addEventListener('click', e => {
    console.log(e)
    if(e.target.innerHTML === "Filter good dogs: OFF"){
        e.target.innerHTML = "Filter good dogs: ON"
        removeAllChildNodes(dogBar)
        fetch('http://localhost:3000/pups/?isGoodDog=true')
        .then(resp => resp.json())
        .then(dogs =>{
            dogs.forEach(dog => {
                renderDog(dog)
            }) 
        })
    }else{
        e.target.innerHTML = "Filter good dogs: OFF"
        fetch('http://localhost:3000/pups/?isGoodDog=false')
        .then(resp => resp.json())
        .then(dogs => {
            dogs.forEach(dog => {
                renderDog(dog)
            })
        })
    }
})

dogButton.addEventListener('click', e => {
    console.log(e)

})


function addClickedDog(dog){
    dogImg.src = dog.image
    let dogId = dog.id
    dogH2.innerHTML = dog.name
    if(dog.isGoodDog === true){
        dogButton.innerHTML = "Good Dog!"
    }else{
        dogButton.innerHTML = "Bad Dog!"
    }
    let dogInfoArray = [dogImg, dogH2, dogButton]
    dogInfoArray.forEach(elem =>{
        dogInfoContainer.appendChild(elem)
    })
    dogButton.addEventListener('click', e => {
        console.log(e)
        console.log(dogId)
        if(dog.isGoodDog === true){
            dog.isGoodDog = false
            dogButton.innerHTML = "Bad Dog!"
        }else{
            dog.isGoodDog = true
            dogButton.innerHTML = "Good Dog!"
        }
        function goodOrBadDog(dog){
            fetch(`http://localhost:3000/pups/${dogId}`,{
                method: 'PATCH',
                headers: {'Content-Type':'application/json', 'accept':'application/json'
            },
            body:JSON.stringify(dog)
        })
        }
        goodOrBadDog(dog)
        
    })
}

function loadDogs(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs =>{
       console.log(dogs)
       dogs.forEach(dog =>{
           console.log(dog.name)
           renderDog(dog)
       })
    })
}

function renderDog(dog){
    let dogSpan = document.createElement('span')
    dogSpan.innerHTML=dog.name
    dogBar.appendChild(dogSpan)
    dogSpan.addEventListener('click', e => {
        console.log(e)
        addClickedDog(dog)
    })
}



function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

loadDogs()