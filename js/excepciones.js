class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

/**
 * Excepción que aparecerá en caso
 * de intentar instanciar una clase
 * abstracta
 */

class AbstractClass extends BaseException {
    constructor(clase,fileName, lineNumber) {
        super("La clase "+clase+" no puede ser instanciada.", fileName, lineNumber);
        this.name = "AbstractClass";
    }
}

class NotThisType extends BaseException {
    constructor(fileName, lineNumber) {
        super("El tutor solo puede ser un Professor", fileName, lineNumber);
        this.name = "NotThisType";
    }
}

class isNull extends BaseException {
    constructor(atributo,fileName, lineNumber) {
        super("El atributo "+atributo+" no puede ser vacío", fileName, lineNumber);
        this.name = "NotThisType";
    }
}

class NotFound404 extends BaseException{
    constructor(elem,fileName, lineNumber) {
        super("El elemento "+elem+" no se encuentra en la lista", fileName, lineNumber);
        this.name = "NotFound404";
    }
}

class ElementFound extends BaseException{
    constructor(elem,fileName, lineNumber) {
        super("El elemento "+elem+" ya se encuentra en la lista", fileName, lineNumber);
        this.name = "ElementFound";
    }
}

class SameName extends BaseException{
    constructor(nombre,fileName, lineNumber) {
        super("El usuario "+nombre+" ya se encuentra registrado", fileName, lineNumber);
        this.name = "SameName";
    }
}

class SameEmail extends BaseException{
    constructor(email,fileName, lineNumber) {
        super("El email "+email+" ya se encuentra registrado", fileName, lineNumber);
        this.name = "SameEmail";
    }
}