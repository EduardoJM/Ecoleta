export function displayAPIError(err: any): string {
    let errorMessage = "Ops! Tivemos um erro desconhecido!";
    if (err.response) {
        if (err.response.data) {
            if (err.response.data.error) {
                errorMessage = err.response.data.error;
            }
        }
    }
    return errorMessage;
}
