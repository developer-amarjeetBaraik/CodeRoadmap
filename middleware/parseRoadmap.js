//all collection which is avilable in collections
function allCollection(d) {
    let colleArr = d[0].collections
    colleArr.forEach((e) => {
        e.forEach((arr) => {
            arr.forEach((z) => {
                z.zone.forEach((zoneName) => { //finding section
                    let sections = zoneName.name
                    zoneName.topics.forEach((t) => { //finding topic
                        let topicName = t.name
                        t.subtopics.forEach((subt) => { //finding subtopics
                            subt
                        })
                    })
                })
            })
        })
    })
}

export default allCollection