import { create } from 'zustand';

import { createModalSlice, ModalSlice } from 'lib/zustand/modalSlice';

export const useBoundStore = create<ModalSlice>()((...a) => ({
    ...createModalSlice(...a)
}));
