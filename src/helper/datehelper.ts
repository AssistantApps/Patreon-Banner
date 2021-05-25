import moment from 'moment';

export const toShortDate = (activeDate: Date) => {
    return moment(activeDate).format('YYYY-MM-DD');
}

export const toLongDate = (activeDate: Date) => {
    return moment(activeDate).format('dddd, Do MMMM YYYY');
}