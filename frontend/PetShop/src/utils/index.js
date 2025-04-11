export const format_date = (date) => {
    return new Date(date)
}

export const handleSortText = (data ,column_name) => {
    const sortedData = data.sort((a,b) => a[column_name].localeCompare(b[column_name]))
    return sortedData
}
export const handleSortNumber = (data ,column_name) => {
    const sortedData = data.sort((a,b) => a[column_name] - b[column_name])
    console.log(sortedData)
    return sortedData
}
export const API_IMAGE_PATH = 'http://localhost:3001/'