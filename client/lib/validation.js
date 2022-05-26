

const userPattern = /^\w{3,32}$/
const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/

export function validate_register(inp){
    const {username, email, password} = inp
    if(!userPattern.test(username)){return "username must be 3 to 32 alphanumeric characters long"}
    if(!mailPattern.test(email)){return "The given email has an invalid format"}
    if(!passwordPattern.test(password)){return "Password must contain at least one uppercase. lowercase, digit, special symbol and must be at least 7 characters long"}
    return null
}

export function validate_login(inp){
    const {credential, password} = inp
    if(!userPattern.test(credential)){
        if(!mailPattern.test(credential)){
            return "invalid credential"
        }
    }
    if(!passwordPattern.test(password)){
        return "invalid password format"
    }
    return null
}

const titlePattern = /[\w ]{1,32}/
const authorPattern = /[\w ]{1,32}/
const releaseYearPattern = /\-?[0-9]{0,4}/

export function validate_book(inp){
    const {title, author, release_year} = inp
    if(!titlePattern.test(title)){return `The format of ${title} is invalid`}
    if(!authorPattern.test(author)){return `The format of ${author} is invalid`}
    if(!releaseYearPattern.test(release_year)){return `The format of ${release_year} is invalid`}
    return null
}

const namePattern = /[\w- ]{2,32}/
const tagPattern = /[\w ]{1,24}/
const descriptionPattern = /je sais pas/

export function validate_discussion(inp){
    const {name, tags, description} = inp
    if(!namePattern.test(name)){ return `The format of ${name} is invalid` }
    if(tags){tags.forEach((tag) => {
        if(!tagPattern.test(tag)){ return `The format of ${tag} is invalid`}
    })}
    // description requires validation...
    return null
}