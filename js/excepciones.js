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
    constructor(clase,fileName, lineNumber) {
        super("El elemento no puede ser un/una "+clase, fileName, lineNumber);
        this.name = "NotThisType";
    }
}

class isNull extends BaseException {
    constructor(clase,fileName, lineNumber) {
        super("No se puede añadir un objeto igual a null", fileName, lineNumber);
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

class DoesntExists extends BaseException{
    constructor(clase,fileName, lineNumber) {
        super("El/La "+clase+" no se encuentra asignado/a a otras producciones.", fileName, lineNumber);
        this.name = "DoesntExists";
    }
}