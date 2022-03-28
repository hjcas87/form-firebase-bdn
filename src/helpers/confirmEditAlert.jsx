// import Swal from 'sweetalert2';

export const confirmEditAlert = async (audio) => {
    return await Swal.fire({
        title: audio ? 'Editar Audio?' : 'Editar Portada?',
        text: audio ? 'Esta acción eliminará el audio actual' : 'Esta acción eliminará tu portada actual',
        showDenyButton: true,
        confirmButtonText: 'Continuar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        return result.isConfirmed;
    });
};