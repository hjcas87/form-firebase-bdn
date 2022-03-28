// import Swal from 'sweetalert2';

export const confirmAlert = async (type) => {
    return await Swal.fire({
        title:
            type === 'album'
                ? 'Querés comenzar a subir un nuevo álbum?'
                : 'Querés comenzar a subir un nuevo sencillo?',
        showDenyButton: true,
        confirmButtonText: type === 'album' ? 'Nuevo Álbum' : 'Nuevo Simple',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        return result.isConfirmed;
    });
};
