// request for weather information

const getForm = document.querySelector('#getForm')

getForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const input = getForm.elements.query.value
    getSearch(input)
})

const getSearch = async (input) => {
    try {
        const url = `https://api.publicapis.org/entries`
        const config = { params: { title: input } }
        const res = await axios.get(url, config)
        alignContent(res.data.entries)
    } catch (error) {
        console.log('Error', error)
    }
}

const alignContent = async (data) => {
    try {
        const searchContent = document.querySelector('#searchContent')
        const h2Ele = document.createElement('h2')
        h2Ele.append('Here is the result!')
        searchContent.append(h2Ele)
        for (let list of data) {









        }

    } catch (error) {
        console.log('Error', error)
    }
}

