import { StateCreator } from 'zustand';

export interface ModalSlice {
    isOpen: boolean;
    openUpload: () => void;
    isEditOpen: boolean;
    editableData: null | string;
    openEdit: (data: string) => void;
    close: () => void;
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
    isOpen: false,
    isEditOpen: false,
    editableData: null,
    openUpload: () =>
        set((state) => ({
            isOpen: !state.isOpen
        })),
    openEdit: (data) =>
        set(() => ({
            editableData: data,
            isEditOpen: true
        })),
    close: () =>
        set(() => ({
            isOpen: false,
            isEditOpen: false,
            editableData: null
        }))
});
