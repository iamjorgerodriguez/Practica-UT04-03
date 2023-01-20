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