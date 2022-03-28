// import Swal from 'sweetalert2';

export const shootError = (msg) => {
    Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Ok',
    });
};
