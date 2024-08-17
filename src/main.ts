interface ValidacionClave {
    esValida: boolean;
    error?: string;
};

const validarClave = (
    nombreUsuario: string,
    clave: string,
    commonPasswords: string[]
    ): ValidacionClave => {
        // 1. Verificar longitud mínima
        const longitudMinima = 8;
        const longitudValidation = tieneLongitudMinima(clave, longitudMinima);
        if (!longitudValidation.esValida)
            return longitudValidation;

        // 2. Verificar que contenga mayúsculas y minúsculas
        const mayusculasYMinusculasValidation = tieneMayusculasYMinusculas(clave);
        if (!mayusculasYMinusculasValidation.esValida) 
            return mayusculasYMinusculasValidation;

        // 3. Verificar que contenga números
        const numerosValidation = tieneNumeros(clave);
        if (!numerosValidation.esValida) 
            return numerosValidation;

        // 4. Verificar que contenga caracteres especiales
        const caracteresEspecialesValidation = tieneCaracteresEspeciales(clave);
        if (!caracteresEspecialesValidation.esValida) 
            return caracteresEspecialesValidation;

        // 5. Verificar que no contenga el nombre de usuario
        const nombreUsuarioValidation = tieneNombreUsuario(nombreUsuario, clave);
        if (!nombreUsuarioValidation.esValida) 
            return nombreUsuarioValidation;

        // 6. Verificar que no contenga palabras comunes
        const palabrasComunesValidation = tienePalabrasComunes(clave, commonPasswords);
        if (!palabrasComunesValidation.esValida) 
            return palabrasComunesValidation;

        // Si pasa todas las validaciones
        return { esValida: true };
};

const tieneLongitudMinima = (clave: string, longitudMinima: number): ValidacionClave => {
    if (clave.length >= longitudMinima) {
        return { esValida: true };
    } else {
        return { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
    }
};

const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    for (const char of clave) {
        if (char >= 'A' && char <= 'Z') tieneMayuscula = true;
        if (char >= 'a' && char <= 'z') tieneMinuscula = true;
    }
    if (tieneMayuscula && tieneMinuscula) {
        return { esValida: true };
    } else {
        return { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
    }
};

const tieneNumeros = (clave: string): ValidacionClave => {
    for (const char of clave) {
        if (char >= '0' && char <= '9') {
            return { esValida: true };
        }
    }
    return { esValida: false, error: "La clave debe de tener números" };
};

const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
    const caracteresEspeciales = "!@#$%^&*()_+[]{}|;:',.<>?/";
    for (const char of clave) {
        if (caracteresEspeciales.includes(char)) {
            return { esValida: true };
        }
    }
    return { esValida: false, error: "La clave debe de tener caracteres especiales" };
};

const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
    const usuarioMinuscula = nombreUsuario.toLowerCase();
    const contraseniaMinuscula = clave.toLowerCase();
    if (!contraseniaMinuscula.includes(usuarioMinuscula)) {
        return { esValida: true };
    } else {
        return { esValida: false, error: "La clave no debe tener el nombre del usuario" };
    }
};

const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
    const contraseniaMinuscula = clave.toLowerCase();
    for (const palabra of commonPasswords) {
        if (contraseniaMinuscula.includes(palabra.toLowerCase())) {
            return { esValida: false, error: "La clave no debe de contener palabras comunes" };
        }
    }
    return { esValida: true };
};

const commonPasswords: string[] = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
    "monkey",
    "sunshine",
    "password1",
    "123456789",
    "football",
    "iloveyou",
    "1234567",
    "123123",
    "12345678",
    "abc123",
    "qwerty123",
    "1q2w3e4r",
    "baseball",
    "password123",
    "superman",
    "987654321",
    "mypass",
    "trustno1",
    "hello123",
    "dragon",
    "1234",
    "555555",
    "loveme",
    "hello",
    "hockey",
    "letmein123",
    "welcome123",
    "mustang",
    "shadow",
    "12345",
    "passw0rd",
    "abcdef",
    "123abc",
    "football123",
    "master",
    "jordan23",
    "access",
    "flower",
    "qwertyuiop",
    "admin123",
    "iloveyou123",
    "welcome1",
    "monkey123",
    "sunshine1",
    "password12",
    "1234567890",
];


console.log(validarClave("fran", "mamut123", commonPasswords));
console.log(validarClave("fran", "Mamut123!!!€", commonPasswords));
console.log(validarClave("fran", "mamut!", commonPasswords));
console.log(validarClave("fran", "Mamut1!aaaaa", commonPasswords));
console.log(validarClave("fran", "Meeeemeeemeee2", commonPasswords));

