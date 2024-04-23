import Toastify from "toastify-js";

export const sucesso = (mensagem) => {
    Toastify({
        text: mensagem,
        duration: 3000,
        gravity: "right",
        backgroundColor: "#2ecc71",
        close: true
    }).showToast();
}

// Toastify({
//     text: "Atenção! Algo deu errado.",
//     duration: 3000,
//     gravity: "top",
//     backgroundColor: "#f39c12",
//     close: true
// }).showToast();


export const erro = (mensagem) => {
    Toastify({
        text: mensagem,
        duration: 3000,
        gravity: "top",
        backgroundColor: "#e74c3c",
        close: true
    }).showToast();
}

// case 'info':
// Toastify({
//     text: "Dica: Tente novamente mais tarde.",
//     duration: 3000,
//     gravity: "top",
//     backgroundColor: "#3498db",
//     close: true
// }).showToast();