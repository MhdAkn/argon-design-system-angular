import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
import { HotToastService, ToastPosition } from '@ngneat/hot-toast';

interface deleteObjectInterface {
    title: string
    showDenyButton?: boolean,
    showCancelButton?: boolean,
    confirmButtonText?: string,
    icon?: SweetAlertIcon,
    denyButtonText?: string,
    cancelButtonText?: string

}


@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private toast: HotToastService) {
    }

    alertConfirmation(title: string | HTMLElement, text: string, icon: SweetAlertIcon,) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    alertSW(msg: string, icon: SweetAlertIcon, position?: SweetAlertPosition,) {
        const Toast = Swal.mixin({
            customClass: {
                popup: 'large-sa-popup'
            },
            toast: true,
            timer: 3000,
            position: position,
            showConfirmButton: false,
            timerProgressBar: true,
        })

        Toast.fire({
            icon: icon,
            title: msg
        })
    }


    alertInfo(title: string, msg: string, icon: SweetAlertIcon) {
        Swal.fire({
            title: title,
            html: msg,
            icon: icon,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#569dea'
        })
    }

    //check phone number
    checkPhoneNumber(phoneNumber: any) {
        let result = /^(?:9[01456789]|6[0123456789]|5[01234])[0-9]{6}$/.test(
            phoneNumber
        );
        if (!result) {
            return false;
        } else {
            return true;
        }
    } //fin check phone number

    //format Phone Number
    formatPhoneNumber(phoneNumber: any) {
        let result = phoneNumber.substring(5);
        return result;
    } //fin format phone Number

    // get Good Table
    getGoodTable(tabOne: any[], tabTwo: any[]) {
        tabTwo.forEach((element) => {
            let prodExist: any = tabOne.filter(
                (prod) =>
                    prod.product.product.id == element.product.product.id &&
                    prod.product.measure_type.id ==
                    element.product.measure_type.id
            )[0];
            if (prodExist !== undefined) {
                let index = tabOne.findIndex(
                    (prod) =>
                        prod.product.product.id == element.product.product.id &&
                        prod.product.measure_type.id ==
                        element.product.measure_type.id
                );
                tabOne[index].quantity = element.quantity + prodExist.quantity;
                tabOne[index].purchase_price = element.purchase_price;
                tabOne[index].selling_price = element.selling_price;
                tabOne[index].date_exp = element.date_exp;
            } else {
                tabOne.push(element);
            }
        });
        return tabOne;
    } //Get Good Table

    //Get Nb Days in Two Dates
    getDays(startDate: Date, endDate: Date) {
        let dayCount = 0;
        while (endDate.setHours(0, 0, 0, 0) > startDate.setHours(0, 0, 0, 0)) {
            dayCount++;
            startDate.setDate(startDate.getDate() + 1);
        }
        return dayCount;
    }



    alertDeleteObject(options: deleteObjectInterface, callBack: (...any: any) => void) {
        Swal.fire({
            customClass: {
                title: 'text-xl',
                icon: '',
                confirmButton: 'bg-red-400 w-1/3',
                cancelButton: 'w-1/3',
                actions: 'w-full'
            },
            icon: 'question',
            title: options.title,
            //showDenyButton: true,
            confirmButtonText: options.confirmButtonText,
            showCancelButton: options.showCancelButton,
            reverseButtons: true,
            focusConfirm: false,
            focusCancel: false,
            cancelButtonText: options.cancelButtonText,
            //denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                callBack()
            } else if (result.isDismissed) {

            }

        })
    }

    showToast(text: string, type: 'info' | 'success' | 'warning' | 'error', position: ToastPosition, duration?: number) {
        switch (type) {
            case "info":
                this.toast.info(text, { position: position, duration: duration ? duration : 2000 })
                break;
            case "success":
                this.toast.success(text, { position: position, duration: duration ? duration : 2000 })
                break;
            case "warning":
                this.toast.warning(text, { position: position, duration: duration ? duration : 2000 })
                break;
            case "error":
                this.toast.error(text, { position: position, duration: duration ? duration : 2000 })
                break;
        }
    }

    closeAllToast() {
        this.toast.close()
    }

}
