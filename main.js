let xp = 0 //player xp
let health = 100 //player health
let gold = 50 //player gold
let currentWeapon = 0 //player current weapon

let fighting //status
let monsterHealth //monster health 
let inventory = ['Glock'] //array of items(weapons)

const xpText = document.querySelector('#xpText') //targeting the XP text
const healthText = document.querySelector('#healthText') //targeting the health text
const goldText = document.querySelector('#goldText') //targeting the gold text

const button1 = document.querySelector('#button1') //targeting the Go to store button
const button2 = document.querySelector('#button2') //targeting the Go to cave button
const button3 = document.querySelector('#button3') //targeting the Fight dragon button

const monsterStats = document.querySelector('#monsterStats') //targeting the monsters stats div

const monsterNameText = document.querySelector('#monsterName') //targeting the monster name text
const monsterHealthText = document.querySelector('#monsterHealth') //targeting the monster health text

const text = document.querySelector('#text') //targeting the black console text

const weapons = [
  {
    name: "Glock",
    power: "10"
  },
  {
    name: "AK-47",
    power: "30"
  },
  {
    name: "AWP",
    power: "60"
  },
]

const monsters = [
  {
    name: "Charlizard",
    level: 5,
    health: 50
  },
  {
    name: "Fanged Beast",
    level: 10,
    health: 100
  },
  {
    name: "Dragon",
    level: 20,
    health: 200
  }
]


const locations =
[
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight the Boss"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above."
  },
  {
    name: "Store",
    "button text": ["Buy 10 Health (10 Gold)", "Upgrade Weapon (30 Gold)", "Go Back"],
    "button functions": [buyHealth, upgradeWeapon, goBack],
    text: "Welcome to the Store"
  },
  {
    name: "Cave",
    "button text": ["Fight Charlizard", "Fight Toothless", "Run Away"],
    "button functions": [fightCharlizard, fightToothless, goBack],
    text: "Welcome to the cave. Choose your opponent"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run Away"],
    "button functions": [attack, dodge, goBack],
    text: "You are fighting a monster"
  },
  {
    name: "monster defeated",
    "button text": ["Go Back", "Go Back", "Go Back"],
    "button functions": [goBack, goBack, easterEgg],
    text: "Monster Defeated! You gain XP and Gold "
  },
  {
    name: "You Lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You are dead"
  },
  {
    name: "You Win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You Defeated the Monster!"
  },
  {
    name: "Easter Egg",
    "button text": ["2", "8", "Go Back"],
    "button functions": [pickTwo, pickEight, goBack],
    text: "You've stumbled upon a secret game. Pick one of the number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
]

// Initialize buttons
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

// Create Functions
function update(locations) {
  monsterStats.style.display = "none"
  text.innerText= locations.text
  button1.innerText = locations["button text"][0] //changing button text back
  button2.innerText = locations["button text"][1] //changing button text back
  button3.innerText = locations["button text"][2] //changing button text back
  button1.onclick = locations["button functions"][0] //changing the button functions back
  button2.onclick = locations["button functions"][1] //changing the button functions back
  button3.onclick = locations["button functions"][2] //changing the button functions back
}

// universal go Back button
function goBack() {
  update(locations[0])
}

// homepage buttons
function goStore() {
  update(locations[1])
}

function goCave() {
  update(locations[2])
}

function fightDragon() {
  fighting = 2
  goFight()
}

// Store buttons
function buyHealth() {
  if (health < 100 && gold >= 10) {
    gold = gold - 10
    health = health + 10
  }
  else if (health >= 100) {
    text.innerText = "Health is already Full!"
  }
  else {
    text.innerText = "Not enough Gold"
  }
  goldText.innerText =  gold
  healthText.innerText = health
}

function upgradeWeapon() {
  if (currentWeapon < weapons.length - 1)
  {
    if (gold >= 30)
    {
      gold = gold - 30
      currentWeapon++
      let newWeapon = weapons[currentWeapon].name
      inventory.push(newWeapon)
      goldText.innerText = gold
      text.innerText = "Weapon upgraded to" +newWeapon
      text.innerText += "\nInventory now contains" +inventory
    } else {
      text.innerText = "Insufficent Gold Available"
    }
  } else {
    text.innerText = "Max Upgrade reached"
    button2.innerText = "Sell weapon for 15 gold"
    button2.onclick = sellWeapon
  }
}

function sellWeapon() {
  if (inventory.length > 1)
  {
    gold = gold +15
    goldText.innerText = gold
    let currentWeapon = inventory.shift()
    text.innerText = "Sold: " +currentWeapon
    text.innerText = "In your inventory you have: " +inventory
  } else {
    text.innerText = "Don't sell your only weapon, idiot!"
  }
}

// Fight Dragon buttons
function fightCharlizard() {
  fighting = 0
  goFight()
}

function fightToothless() {
  fighting = 1
  goFight()
}

function goFight() {
  update(locations[3])
  monsterHealth = monsters[fighting].health
  monsterStats.style.display = "block"
  monsterNameText.innerText = monsters[fighting].name
  monsterHealthText.innerText = monsterHealth
}

function attack() {
  text.innerText = "The" + monsters[fighting].name + "attacks"
  text.innerText += "You attack with" + weapons[currentWeapon].name

  if (isMonsterHit()) {
    health = health - getMonsterAttackValue(monsters[fighting].level)
  } else {
    text.innerText += "You miss"
  }

  monsterHealth = monsterHealth - weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
  monsterHealthText.innerText = monsterHealth
  healthText.innerText = health
  if (health <= 0)
  {
    lose()
  } else if (monsterHealth <= 0)
  {
    if (fighting === 2)
    {
      winGame()
    } else {
      defeatMonster()
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
      text.innerText += "Your" + inventory.pop() + "breaks"
      currentWeapon--
    }
  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp))
  console.log(hit)
  return hit
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20
}

function dodge() {
  text.innerText = "You dodged an attack from" + monsters[fighting].name
}

function defeatMonster() {
  gold = gold + Math.floor(monsters[fighting].level * 6.7)
  xp = xp + monsters[fighting].level
  goldText.innerText = gold
  xpText.innerText = xp
  update(locations[4])
}

function lose() {
  update(locations[5])
}

function winGame() {
  update(locations[6])
}

function restart() {
  xp = 0
  health = 100
  gold = 50
  currentWeapon = 0
  inventory = ["Glock"]
  goldText.innerText = gold
  healthText.innerText = health
  xpText.innerText = xp
  goBack()
}

function easterEgg() {
  update(locations[7])
}

function pickTwo() {
  pick(2)
}

function pickEight() {
  pick(8)
}

function pick(guess) {
  let numbers = []
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11))
  }
  text.innerText = "You picked" + guess + ". Here are the random numbers:\n"

  for (let i=0; i<10; i++ ) {
    text.innerText += numbers[i] + "\n"
  }

  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Correct! you win 150 gold"
    gold += 150
    goldText.innerText = gold
  } else {
    text.innerText += "Wrong! you lose 10 health"
    health -= 10
    healthText.innerText = health
    if (health <= 0) {
      lose()
    }
  }
}




