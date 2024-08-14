document.getElementById('nav').style.position = 'relative'
const createCollectionBtn = document.getElementById('createCollection')
const collections = document.getElementById('collections')
const crossBtn = document.getElementById('programmingListCross')
const langWindow = document.getElementById('programmingList-bg')
async function fetchCollections() {
    await fetch('./collection-details', {
        method: 'POST'
    }).then(response => response.json())
        .then(data => {
            const userSign = data[0].email[0].toUpperCase()
            document.getElementById('profile').style.setProperty('--my-content', `"${userSign}"`)
            console.log(document.getElementById('profile'))

            data[0].collections.forEach(async (e, index) => {
                let langSlNumber = index + 1
                const collections = document.getElementById('collections')
                //Creating collZoneCombo
                const collZoneCombo = document.createElement('div')
                collZoneCombo.classList.add('collZoneCombo')
                collZoneCombo.setAttribute('id', `collZone${langSlNumber}`)
                //appending collZoneCombo into collections
                collections.append(collZoneCombo)
                //creating collectionBlock
                const collectionBlock = document.createElement('div')
                collectionBlock.classList.add('collection')
                collectionBlock.setAttribute('id', `coll${langSlNumber}`)
                //appending collectionBlock into collZoneCombo
                collZoneCombo.append(collectionBlock)
                const collChildLeft = document.createElement('div')
                collChildLeft.classList.add('coll-left')
                collChildLeft.innerHTML = `<p class="sln">${langSlNumber}</p><h2 id="\langName${langSlNumber}\"></h2>`
                const collChildRight = document.createElement('div')
                collChildRight.classList.add('coll-right')
                collectionBlock.append(collChildLeft, collChildRight)
                const langName = document.getElementById(`langName${langSlNumber}`)
                e.forEach((z, index) => {
                    langName.innerHTML = z.langName
                    z.zone.forEach((zoneName, index) => {
                        let zoneSlNumber = index + 1
                        const subColl = document.createElement('div')
                        subColl.classList.add('subColl')
                        subColl.classList.add(`subColl${langSlNumber}`)
                        collZoneCombo.append(subColl)
                        const zName = document.createElement('div')
                        zName.classList.add('zone')
                        zName.setAttribute('id', `zone${langSlNumber}-${zoneSlNumber}`)
                        subColl.append(zName)
                        const zDetail = document.createElement('div')
                        zDetail.classList.add('zoneDetail')
                        zName.append(zDetail)
                        zDetail.innerHTML = `<p class="sln">${zoneSlNumber}</p><h2 id="\zoneName${langSlNumber}-${zoneSlNumber}\"></h2>`
                        document.getElementById(`zoneName${langSlNumber}-${zoneSlNumber}`).innerHTML = zoneName.name
                        //working with topic
                        zoneName.topics.forEach((t, index) => {
                            let topicSlNumber = index + 1
                            const topics = document.getElementById('topics')
                            const topicSubtopicCombo = document.createElement('div')
                            topicSubtopicCombo.classList.add('topicSubtopicCombo')
                            topicSubtopicCombo.classList.add(`topicSubtopicCombo${langSlNumber}-${zoneSlNumber}`)
                            topicSubtopicCombo.setAttribute('id', `topicSubtopicCombo${langSlNumber}-${zoneSlNumber}-${topicSlNumber}`)
                            topics.append(topicSubtopicCombo)
                            const topicForTopicSubtopicCombo = document.createElement('div')
                            topicForTopicSubtopicCombo.classList.add('topic')
                            topicForTopicSubtopicCombo.setAttribute('id', `topic${langSlNumber}-${zoneSlNumber}-${topicSlNumber}`)
                            const subTopicForTopicSubtopicCombo = document.createElement('div')
                            subTopicForTopicSubtopicCombo.classList.add('subtopicList')
                            subTopicForTopicSubtopicCombo.setAttribute('id', `subtopics${langSlNumber}-${zoneSlNumber}-${topicSlNumber}`)
                            topicSubtopicCombo.append(topicForTopicSubtopicCombo, subTopicForTopicSubtopicCombo)
                            topicForTopicSubtopicCombo.innerHTML = `<p class="sln">${topicSlNumber}</p><h2 id="topicName${langSlNumber}-${zoneSlNumber}-${topicSlNumber}\"></h2>`
                            document.getElementById(`topicName${langSlNumber}-${zoneSlNumber}-${topicSlNumber}`).innerHTML = t.name
                            t.subtopics.forEach((st, index) => {
                                const subTopicSlNumber = index + 1
                                const subTopics = document.getElementById(`subtopics${langSlNumber}-${zoneSlNumber}-${topicSlNumber}`)
                                const subTopic = document.createElement('span')
                                subTopic.classList.add('subTopic')
                                subTopic.innerHTML = `<p class="sln">${subTopicSlNumber}</p><h2 id="subtopicName${langSlNumber}-${zoneSlNumber}-${topicSlNumber}-${subTopicSlNumber}\"></h2>`
                                subTopic.setAttribute('id', `subtopic${langSlNumber}-${zoneSlNumber}-${topicSlNumber}-${subTopicSlNumber}`)
                                subTopics.append(subTopic)
                                document.getElementById(`subtopicName${langSlNumber}-${zoneSlNumber}-${topicSlNumber}-${subTopicSlNumber}`).innerHTML = st
                            })
                        })
                    })
                })
            })

        })
        .catch(err => {
            console.log(err)
        })

    // manageing event
    // to show zones
    document.querySelectorAll('.collection').forEach((c, index) => {
        const sl = index + 1
        c.addEventListener('click', () => {
            document.querySelectorAll(`.subColl${sl}`).forEach((e) => {
                if (e.style.display == 'block') {
                    e.style.display = 'none'
                }
                else {
                    e.style.display = 'block'
                }
            })
        })
    })

    // to show topics
    document.querySelectorAll('.zone').forEach(zone => {
        zone.addEventListener('click', (event) => {
            document.querySelectorAll(`.topicSubtopicCombo`).forEach(e => {
                e.style.display = 'none'
            })
            let idNo = zone.id.slice(4)
            document.querySelectorAll(`.topicSubtopicCombo${idNo}`).forEach(topic => {
                if (topic.style.display == 'block') {
                    topic.style.display = 'none'
                }
                else {
                    topic.style.display = 'block'
                }
            })
        })
    })
document.querySelectorAll('.topic').forEach(topic => {
    topic.addEventListener('click', (event) => {
        let topicId = topic.id.slice(5)
        let subtopicList = document.getElementById(`subtopics${topicId}`)
        if (subtopicList.style.display == 'block') {
            subtopicList.style.display = 'none'
        }
        else {
            subtopicList.style.display = 'block'
        }
    })
})
}

fetchCollections()


createCollectionBtn.addEventListener('click', () => {

    langWindow.style.visibility = 'visible'
    // fetch('./create-collection', {
    //     method: 'POST',
    //     credentials: "include"
    // }).then(response => response.text())
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
})


// manage language selection window
crossBtn,window.addEventListener('click', ()=>{
    langWindow.style.visibility = 'hidden'
})