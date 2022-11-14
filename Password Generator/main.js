const passwordDisplay = document.getElementById('password-dis');
const rangeCurrentValue = document.getElementById('range');
const textRangeValue = document.getElementById('text-range');
let upperCase = document.getElementById('upper-case');
let lowerCase = document.getElementById('lower-case');
let symbols = document.getElementById('symbols');
let numbers = document.getElementById('numbers');
let totalPasswordLength = 0;

let error = document.querySelector('.error')


//Get the current password length
rangeCurrentValue.addEventListener('input', setPasswordRange)
textRangeValue.addEventListener('input', setPasswordRange)
function setPasswordRange(e){
//Get the value of the current element
    textRangeValue.value = e.target.value
    rangeCurrentValue.value = e.target.value
    totalPasswordLength = rangeCurrentValue.value
    console.log(totalPasswordLength);
}

let arrUpperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let arrLowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let arrNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let arrSymbol = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", "/", ":", ";", ",", ">", ".", "?"];


//Generate the password

let allPassWordCount = [];
let generatedPassword = [];

function passwordGenerator(upperCaseCheckbox, lowerCaseCheckBox, symbolsCheckBox, numberCheckBox, func){
    allPassWordCount = []
    if(upperCaseCheckbox){
        allPassWordCount = allPassWordCount.concat(arrUpperCase)
    }
    if (lowerCaseCheckBox){
        allPassWordCount = allPassWordCount.concat(arrLowerCase)
    }
    if(symbolsCheckBox){
        allPassWordCount = allPassWordCount.concat(arrSymbol)
    }
    if (numberCheckBox){
        allPassWordCount = allPassWordCount.concat(arrNumber)
    }

    func()
}

//Button to generate button 
let btn = document.getElementById('generate')
btn.addEventListener('click', generate)

function generate(){
    passwordGenerator(upperCase.checked, lowerCase.checked, symbols.checked, numbers.checked, ()=>{
        if(!upperCase.checked && !lowerCase.checked && !symbols.checked && !numbers.checked){
            setError()
        }else {
            let i = totalPasswordLength;
            generatedPassword = []
                while(!i== 0){
                    
                    let randIndex = Math.floor(Math.random() * allPassWordCount.length);
                    console.log(allPassWordCount[randIndex]);
                    generatedPassword = generatedPassword.concat(allPassWordCount[randIndex])
                    
                    i-- 
                    
                }
                setPassWordToDisplay() 
            }
        }
     )
    }

function setPassWordToDisplay(){
    passwordDisplay.innerText = generatedPassword.join('')
}


let copy = document.getElementById('copy')

copy.addEventListener('click', function(){
    

    if(passwordDisplay.innerText==""){
        setError()
    }else {
        window.navigator.clipboard.writeText(passwordDisplay.innerText)
        
        error.style.opacity = 1
        error.style.background = 'lightgreen'
        error.firstElementChild.innerText = 'Copied Successfully'
    
        setTimeout(()=>{
            error.style.opacity = 0
            error  
        },2000)
    }
   
})

function setError(){
    error.style.opacity = 1;
    setTimeout(()=>{
        error.style.opacity = 0  
    },2000)
}