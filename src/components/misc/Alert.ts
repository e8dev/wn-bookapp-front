import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const XSwal = withReactContent(Swal);

export interface Xalert {
  title: string;
  text?: string;
  icon?: SweetAlertIcon | undefined;
  confirmButtonText?: string | undefined;
  showCloseButton?: boolean;
  cancelButtonText?: string | undefined;
  showCancelButton?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  timer?: number;
  customClass?: string;
}

export function xAlert(
  param: Xalert,
  confirmCallback: any = null,
  dismissedCallback: any = null
) {
  if (param.cancelButtonText) {
    param.showCancelButton = true;
  }
  if(param.customClass){

  }
  XSwal.fire({
    icon: "info",
    background: "rgba(255, 255, 255, 1)",
    color: "#333",
    ...param,
  }).then((res) => {
    if (
      res.isConfirmed &&
      confirmCallback &&
      typeof confirmCallback === "function"
    ) {
      confirmCallback();
    }

    if (
      res.isDismissed &&
      dismissedCallback &&
      typeof dismissedCallback === "function"
    ) {
      dismissedCallback();
    }
  });
}
