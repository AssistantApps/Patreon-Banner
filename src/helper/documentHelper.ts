export const setDocumentTitle = (title: string) => {
    document.title = getNewDocumentTitle(title);
}

export const getNewDocumentTitle = (title: string) => `${title} - Patreon Banner by AssistantApps`;

export const setBodyLoadingClass = (isLoading: boolean) => {
    if (isLoading) {
        document.body.classList.add('is-loading');
    } else {
        document.body.classList.remove('is-loading');
    }
}

// export const setBodyOverflowClass = (dialogIsOpen: boolean) => {
//     if (dialogIsOpen) {
//         document.body.classList.add('overflow-hidden');
//     } else {
//         document.body.classList.remove('overflow-hidden');
//     }
// }

