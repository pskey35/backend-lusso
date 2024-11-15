

const isValidName = (nombreSano) => {
    if (nombreSano.length <= 2) {
        return {
            error: true,
            message: "Your user name is too short"
        }
    }

    if (nombreSano.length >= 30) {
        return {
            error: false,
            message: "Your user name is too long"
        }
    }

    if (/^[0-9]+\S$/g.test(nombreSano)) {
        return {
            error: true,
            message: "The username should not contain only numbers"
        }

    }

    return {
        messageValidName: "Your user name is valid",
        error: false
    }



}





const isValidPassword = (password) => {
    try {
        console.log(password.length)
        if (password.length < 2) {
            return {
                messageAuthValidator: "Your password is too short",
                isValidPasswordBoolean: false
            }
        }

        if (password.length >= 50) {
            return {
                messageAuthValidator: "Your password is too long",
                isValidPasswordBoolean: false
            }
        }


        if (!/\W/g.test(password)) {
            return {
                messageAuthValidator: "Add to your password  a un rare character",
                isValidPasswordBoolean: false
            }
        }


        if (!/\d/g.test(password)) {
            return {
                messageAuthValidator: "Add a digit in your password",
                isValidPasswordBoolean: false
            }
        }

        if (!/[a-z]/g.test(password)) {
            return {
                messageAuthValidator: "The password must have at least one lowercase letter",
                isValidPasswordBoolean: false
            }
        }

        if (!/[A-Z]/g.test(password)) {
            return {
                messageAuthValidator: "Your password must have at least one capital letter",
                isValidPasswordBoolean: false
            }
        }


        //si todo esta bien entonces retorna TRUE ya que la password es totalmente valida
        return {
            messageAuthValidator: "Password is valid",
            isValidPasswordBoolean: true
        }



    } catch (error) {

        return {
            messageAuthValidator: "There is an error," + error,
            isValidPasswordBoolean: false
        }
    }
}



export default { isValidPassword, isValidName }