export enum ButtonAction {
    Today = 0,
    PreviousWeek = 1,
    NextWeek = 2
}

export interface Event {
    id: string;
    title: string;
    startDateTime: string;
    endDateTime: string;
    description: string;
}

export type UpdateDate = (newDate: Date) => void;