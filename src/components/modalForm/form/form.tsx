import React from 'react';
import {ITreesSelectValues, TreeSelectLop, TreeSelectModes} from "k6-ui/v2/components/TreeSelect/types";
import {BaseFieldFactory, ExternalActions, FormOptions, IBaseField, SimpleForm} from "k6-ui/v2";

export interface IOption {
    value: string;
    label: string;
}

export interface IFormData {
    title: string
    description: string
    results: IOption[];
    actionTypes: ITreesSelectValues[]
}

interface IFormProps {
    data: IFormData;
    onSubmit(values: object): Promise<boolean>
    onChanged(changed: boolean): void
    formOptions?: FormOptions
    externalActions: ExternalActions
}
const Form: React.FC<IFormProps> = ({data, onSubmit, onChanged, formOptions, externalActions}) => {
    // const convertToTreeSelect = (data: { id: number; value: string; label: string }[]): ITreesSelectValues[] => {
    //     const values = data.map(item => (
    //         {id: item.id, value: item.label, label: item.label, depth: 1}
    //     ));
    //
    //     return [{lop: TreeSelectLop.NOT, values: values}]
    // };
    const fieldFactory = new BaseFieldFactory()
    const fields: IBaseField[] = [
        fieldFactory.createTreeSelect({
            fieldProps: {
                fieldId: 'actionTypes',
                baseValue: '',
                required: false,
                validators: [],
                ratio: ['220px', '520px']
            },
            customProps: {
                mode: TreeSelectModes.returnOnlyChildren,
                id: 'actionTypes',
                serverData: {
                    lop: TreeSelectLop.OR,
                    values: data.actionTypes
                },
                rootElementLabel: 'Подсистема',
                inputPlaceHolder: 'Выберите из классификатора',
                inputWidth: '100%',
                headerTitle: 'Подсистема',
                confirmButtonTitle: 'Готово',
                initialSelected: {
                    lop: TreeSelectLop.OR,
                    values: data.actionTypes
                },
                label: 'Подсистема'
            }
        }),
        fieldFactory.createInputWithLabel({
            fieldProps: {
                fieldId: 'title',
                baseValue: data.title,
                required: false,
                validators: [],
                ratio: ['220px', '520px'],
            },
            customProps: {
                placeholder: 'Введите значение',
                label: 'Виртуальный каталог',
                id: 'catalogEvents',
                width: '100%',
                iconTitle:
                    'Внимание! Отображение данного столбца отключено в настройках списка',
            },
        }),
        fieldFactory.createInputWithLabel({
            fieldProps: {
                fieldId: 'catalogEvents',
                baseValue: data.description,
                required: false,
                validators: [],
                ratio: ['220px', '520px'],
            },
            customProps: {
                placeholder: 'Введите значение',
                label: 'Виртуальный каталог',
                id: 'catalogEvents',
                width: '100%',
                iconTitle:
                    'Внимание! Отображение данного столбца отключено в настройках списка',
            },
        }),
    ];
    return (
        <SimpleForm
            initialState={fields}
            submitFn={onSubmit}
            onChanged={(val) => onChanged(val)}
            options={formOptions}
            externalSubmit={{
                enabled: true,
                externalActions: externalActions,
            }}
        />
    );
};

export default Form;