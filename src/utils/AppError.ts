//Criando uma exessao costumisada
export class AppError {
    message: string;


    // Quando a classe for instanciada vai informar uma mensagem do tipo string 
    constructor(message: string ){
        this.message = message
    }
}