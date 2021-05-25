import moment from 'moment';

export const toShortDate = (activeDate: Date) => {
    return moment(activeDate).format('YYYY MMM DD');
}

export const toLongDate = (activeDate: Date) => {
    return moment(activeDate).format('dddd, MMMM Do YYYY');
}