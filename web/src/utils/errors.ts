export function displayAPIError(err: any): string {
    let errorMessage = "Ops! Tivemos um erro desconhecido.";
    if (err.response) {
        if (err.response.data) {
            if (err.response.data.error) {
                errorMessage = err.response.data.error;
            }
        }
    }
    return errorMessage;
}

export function displayValidationError(err: any): string {
    let errorMessage = 'Ops! Houve um erro na validação dos dados.';
    if (Object.prototype.hasOwnProperty.call(err, 'name')) {
        if (err.name === 'ValidationError') {
            if (Object.prototype.hasOwnProperty.call(err, 'errors')) {
                errorMessage = (err.errors as String[]).join(' ');
            }
        }
    }
    return errorMessage;
}
