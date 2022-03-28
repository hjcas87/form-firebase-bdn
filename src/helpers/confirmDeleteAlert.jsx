// import Swal from 'sweetalert2';

export const confirmDeleteAlert = async () => {
    return await Swal.fire({
        title: 'Eliminar Lanzamiento?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        return result.isConfirmed;
    });
};
