import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const useSwal = () => {

  const fireSuccess = (title, text) => {
    return Swal.fire({
      title: title || 'Sucesso!',
      text: text,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#16a34a',
    });
  };

  const fireError = (title, text) => {
    return Swal.fire({
      title: title || 'Oops...',
      text: text,
      icon: 'error',
      confirmButtonText: 'Tentar Novamente',
      confirmButtonColor: '#dc2626',
    });
  };

  const fireToast = (icon, title) => {
    return Toast.fire({
      icon: icon || 'success',
      title: title || 'Ação realizada com sucesso!',
    });
  };

  const fireConfirm = (title, text) => {
    return Swal.fire({
        title: title || 'Você tem certeza?',
        text: text || "Esta ação não poderá ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, confirmar!',
        cancelButtonText: 'Cancelar'
    });
  };
  
  const firePasswordConfirm = (title, inputLabel) => {
    return Swal.fire({
        title: title || 'Confirmar Alteração',
        input: 'password',
        inputLabel: inputLabel || 'Para prosseguir, insira sua senha atual',
        inputPlaceholder: 'Sua senha atual',
        inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        preConfirm: (password) => {
            if (!password) {
                Swal.showValidationMessage(`A senha é obrigatória para confirmar.`);
            }
            return password;
        }
    });
  };
  
  return { fireSuccess, fireError, fireToast, fireConfirm, firePasswordConfirm };
};