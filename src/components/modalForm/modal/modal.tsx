import React from 'react';
import {IFooterButtonOptions, withModal} from "k6-ui/v2/components/HOCs";
import Form, {IFormData} from "../form/form.tsx";


interface IModalProps {
    data: IFormData;
    toggleShow: () => void
    onSubmit(values: object): Promise<boolean>
    isShow: boolean
}

const ModalForm = withModal(Form)
const Modal: React.FC<IModalProps> = ({isShow, data, toggleShow, onSubmit}) => {
    const positiveAction: IFooterButtonOptions = {
        title: 'Применить',
        eventName: 'event-ok',
        disabled: true,
    }
    const negativeAction: IFooterButtonOptions = {
        title: 'По умолчанию',
        eventName: 'event-default',
    }
    const handleEvent = (event: string) => {
        switch (event) {
            case positiveAction.eventName:
                break
            case negativeAction.eventName:
                toggleShow()
                break
            default:
                break
        }
    }

    return (
        <ModalForm
            onEvent={handleEvent}
            headerTitle={"Фильтр списка"}
            width={"830px"}
            footer={{
                positive: positiveAction,
                negative: negativeAction,
            }}
            isVisible={isShow}
            modalIdSelector="#modal-id"
            toggleVisibility={toggleShow}
            onSubmit={onSubmit}
            data={data}
            onChanged={function (): void {
                throw new Error('Function not implemented.');
            }}
            externalActions={{
                submitAction: {
                    condition: false,
                    resetCondition: function (): void {
                        throw new Error('Function not implemented.');
                    }
                },
                resetAction: undefined
            }}
        />
    );
};

export default Modal;