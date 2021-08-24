var fs = require('fs');
var readline = require('readline-sync');
var user = readline.question("what you want to 1.signup or 2.login:")
var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

function login(name, code) {
    user_name = name
    password_1 = code
    var read = fs.readFileSync(String(user_name) + '.txt')
    data = JSON.parse(read);
    users = data["User"]
    if (data["User"]["username"] === user_name) {
        if (data["User"]["Password"] === password_1) {
            console.log("Congrats!! " + user_name + " you are logged in successfull!!")
            console.log("Here are your details:")
            console.log("Your discription : ", users["Profile"]["Discription"])
            console.log("Date of birth : ", users["Profile"]["DOB"])
            console.log("Your hobby : ", users["Profile"]["Hobbie"])
            console.log("Gender : ", users["Profile"]["Gender"])
        } else {
            console.log("Invalid password!!")
        }
    }

}

if (user == 1) {
    var user_name = readline.question("Enter username:")
    const path = './' + String(user_name) + '.txt'
    if (fs.existsSync(path)) {
        console.log("Already Exists")
        console.log("Please Login with Password")
        var password_1 = readline.question("Enter password password:")
        login(user_name, password_1)
    } else {
        var password_1 = readline.question("Enter password password:")
        if (password_1.match(paswd)) {
            var password_2 = readline.question("Confirm your password: ")
            if (password_1 === password_2) {
                console.log("congratulation ! ", user_name, " you are signup successfully!!")
                var discription = readline.question("Enter your discription: ")
                var dob = readline.question("Enter date of birth: ")
                var hobbie = readline.question("Enter your hobbie: ")
                var gender = readline.question("Enter your gender: ")
                var info = { "User": { "username": user_name, "Password": password_1, "Profile": { "Discription": discription, "DOB": dob, "Hobbie": hobbie, "Gender": gender } } }
                let file = JSON.stringify(info);
                fs.writeFileSync(String(user_name) + '.txt', file)
            } else {
                console.log("Sorry! both passwords are not same");
            }

        } else {
            console.log("Sorry! your password id weak!!")
        }
    }

} else if (user == 2) {
    var user_name = readline.question("Enter username:")
    var password_1 = readline.question("Enter password:")
    login(user_name, password_1)

}
