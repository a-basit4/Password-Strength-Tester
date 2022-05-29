const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter() {
	const weaknesses = calculatePasswordStrength(passwordInput.value)
	let strength = 100
	reasonsContainer.innerHTML = ''
	weaknesses.forEach(weakness => {
		if(weakness == null) return
			strength -= weakness.deduction
		const messageElement = document.createElement('div')
		messageElement.innerHTML = weakness.message
		reasonsContainer.appendChild(messageElement)
	})
	strengthMeter.style.setProperty('--strength', strength)
}

	// Calculate Password Strength
	function calculatePasswordStrength(password) {
		const weaknesses = []

		weaknesses.push(lengthWeakness(password))
		weaknesses.push(lowercaseWeakness(password))
		weaknesses.push(uppercaseWeakness(password))
		weaknesses.push(numbercaseWeakness(password))
		weaknesses.push(specialcharacterWeakness(password))
		weaknesses.push(repeatCharactersWeakness(password))

		return weaknesses
	}

 // Length Weakness Function
 function lengthWeakness(password) {
 	const length = password.length

 	if(length <= 5) {
 		return{
 			message: "Your password is too short",
 			deduction: 40
 		}
 	}

 	if (length <= 10) {
 		return {
 			message: "Your password could be longer",
 			deduction: 15
 		}
 	}
 }

	// Lower Case Weakness Function
	function lowercaseWeakness(password) {
		return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters')
	}

	// Upper Case Weakness Function
	function uppercaseWeakness(password) {
		return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')
	}

	// Number Case Weakness Function
	function numbercaseWeakness(password) {
		return characterTypeWeakness(password, /[0-9]/g, 'numbers')
	}

	// Special Character Weakness Function
	function specialcharacterWeakness(password) {
		return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
	}

 // Character Type Weakness
 function characterTypeWeakness(password, regex , type) {
 	const matches = password.match(regex) || []

 	if (matches.length === 0) {
 		return {
 			message: `Your password has no ${type}`,
 			deduction: 20
 		}
 	}

 	if (matches.length <= 2) {
 		return {
 			message: `Your password could use more ${type}`,
 			deduction: 5
 		}
 	}
 }

 // Repeat Character Weakness
 function repeatCharactersWeakness(password) {
 	const matches = password.match(/(.)\1/g) || []
 	if(matches.length > 0) {
 		return {
 			message: 'Your password has repeat characters',
 			deduction: matches.length * 10
 		}
 	}
 }