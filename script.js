// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  let userAnswers = {};
  let pw_length = Number(prompt("How many characters would you like your password to contain?\nChoose a number between 8 - 128."));
  //Ensure valud input is entered, otherwise repeat while loop
  while(isNaN(pw_length)==true || pw_length<8 || pw_length>128) {
    pw_length = prompt("Invalid response. Please choose a password length between 8 - 128 characters.\nThis must be input as a number.")
  };
  //return true/false to all password option queries
  let pw_lower = confirm("Would you like to include lowercase letters?\nHit Cancel for No.");
  let pw_upper = confirm("Would you like to include uppercase letters?\nHit Cancel for No.");
  let pw_number = confirm("Would you like to include numbers?\nHit Cancel for No.");
  let pw_special = confirm("Would you like to include special characters?\nHit Cancel for No.");

  //push responses to userAnswers object
  userAnswers.length = pw_length;
  userAnswers.lower = pw_lower
  userAnswers.upper = pw_upper;
  userAnswers.number = pw_number;
  userAnswers.special = pw_special;

//Ensure at least one character type is chosen
if(!userAnswers.lower && !userAnswers.upper && !userAnswers.number && !userAnswers.special) {
  alert("You must select at least one set of characters to include.\nPlease start again.");
  userAnswers = getPasswordOptions();
};

return userAnswers

}

// Function for getting a random element from an array
function getRandom(arr) {
  index = Math.floor(Math.random()*arr.length);
  return arr[index];

}

// Function to generate password with user input
function generatePassword() {
  const options = [];
  const userAnswers = getPasswordOptions();

  //If true, push characters into options array to be included in user's password
  if(userAnswers.lower) {
    options.push(lowerCasedCharacters);
  }
  if(userAnswers.upper) {
    options.push(upperCasedCharacters);
  }
  if(userAnswers.number) {
    options.push(numericCharacters);
  }
  if(userAnswers.special) {
    options.push(specialCharacters);
  }

  //Generate password based on selected length pulling randomly from array of character arrays
  //Initial string guarantees at least one character chosen from each array
  let randomPassword= "";
  for(let i = 0; i <options.length; i++){
  randomPassword += getRandom(options[i]);
  }
  //Begin at options.length because one character from each array has already been chosen;
  //Go until userAnswers.length to reach specified password length
  for(let i = options.length; i < userAnswers.length; i++){
    //get random array from options array and then random character from it
    const characterSelected = getRandom(getRandom(options));
    //Add to password string
    randomPassword += characterSelected;
  };

  return randomPassword;

}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);