// Challenge: Public API search App ======================================================
// https://github.com/davemachado/public-api#public-api-for-public-apis // API ที่ใช้

// READ ME HERE FOR MORE UNDERSTANDING WITH THIS PROJECT
// 1. (get form location) get form location> > (add evet listener) check value input feedback > insert to params of get API // 2. (get data from API) async function for get API with try & catch by specific with config, So we got the obj respond JSON > access them in the last list of data and input as a params in next async function // 3. (create & alignment) buit up card in the div container we've prepared, access the obj of each API services, separated each key and alignment to look good for you || after that style them as your preferences.

// get form location #1
const formGet = document.querySelector('#formGet')

// add evet listener
formGet.addEventListener('submit', function (e) {
    e.preventDefault()
    const search = formGet.elements.query.value
    getSearch(search)
    const button = document.querySelector('button')
    button.type = 'reset'
})

//get data from API #2
const getSearch = async (search) => {
    try {
        const url = `https://api.publicapis.org/entries`
        const config = { params: { title: search } } // paramiters config
        const res = await axios.get(url, config) // get url with config
        alignContent(res.data.entries) // insert respond to next async function
    }
    catch (err) {
        console.log('error', err);
    }
}

// create & alignment #3
const alignContent = async (data) => {

    // Header
    const resultHead = document.querySelector('h2')
    resultHead.append('Here is search result in Public API database')

    // Card separetors
    try {

        const content = document.querySelector('#content')
        for (let list of data) {

            // card box
            const cardDiv = document.createElement('div')
            cardDiv.classList.add('bgbk')
            content.append(cardDiv)

            //card body
            const cardBodyDiv = document.createElement('div')
            cardBodyDiv.classList.add('bglightblue')
            cardDiv.append(cardBodyDiv)

            //card heading
            const h3Ele = document.createElement('h3')
            h3Ele.append(list.API)
            cardBodyDiv.append(h3Ele)

            // card description
            const pEle = document.createElement('p')
            pEle.append(list.Description)
            cardBodyDiv.append(pEle)

            // list 
            for (const [key, value] of Object.entries(list)) {
                const ulEle = document.createElement('ul')
                const liEle = document.createElement('li')
                cardBodyDiv.append(ulEle)

                // description & API name we show as a header card
                if (key !== 'Description' && key !== 'API') {
                    // console.log(`    ${key} : ${value} `);
                    if (key == 'Link') { //  check link do it different
                        const aEle = document.createElement('a')
                        aEle.target = "_blank" // open another blank page
                        aEle.href = value
                        aEle.append(value)
                        liEle.append(`    ${key} : `) // add link later to make it working
                        liEle.append(aEle) //  put link in li
                    } else {
                        if (value === true) {
                            const valueY = 'Supported' // don't wanna show true it's cant understand
                            liEle.append(`    ${key} : ${valueY} `)
                        } else if (value === 'no') {
                            const valueN = 'Not Supported' // dont wanna show no 
                            liEle.append(`    ${key} : ${valueN} `)
                        } else if (value === 'yes') {
                            const valueN = 'Supported' // dont wanna show yes 
                            liEle.append(`    ${key} : ${valueN} `)
                        } else if (value === '') {
                            const valueN = 'unknown' // dont wanna show blank data 
                            liEle.append(`    ${key} : ${valueN} `)
                        }
                        else {
                            liEle.append(`    ${key} : ${value} `) // value data except link come here
                        }
                    }
                    ulEle.append(liEle) // append li to ul is the last step
                }
            }
        }
    } catch (error) {
        console.log('Error', error)
    }
}