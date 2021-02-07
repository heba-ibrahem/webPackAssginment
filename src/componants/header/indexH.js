import cover from '../../assets/cover.jpg'
import './styleH.scss'


const img= document.createElement('img');
img.src=cover;
img.classList.add('img')
document.body.appendChild(img)


const elem= document.createElement("header")
elem.innerHTML= "Hebat-Allah Ibrahem Mohamed Assginment"
document.body.appendChild(elem)

