export const stringToNumber = (value: any): number => {
    return value ? Number((value).toString().replaceAll('.', '')) : 0
}