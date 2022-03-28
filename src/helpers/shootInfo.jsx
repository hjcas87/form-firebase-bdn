// import Swal from 'sweetalert2';
import { message } from '../data/dataMsg';

export const shootInfo = (msgId) => {
    const findedMsg = message.find((msg) => {
        return msg.id === msgId;
    });
    Swal.fire({
        title: findedMsg.title,
        html: findedMsg.msg,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
    });
};
