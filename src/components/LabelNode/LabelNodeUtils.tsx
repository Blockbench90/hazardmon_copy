export function selectElementContents(el: any): void {
    /* 
        Selects text content of the given element
    */

    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
}