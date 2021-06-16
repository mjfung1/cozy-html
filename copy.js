
const API = './1234_Test_Street.json';

function fetchData() {
  return fetch(API)
    .then(response => response.json())
    .then(data => data)
}

async function showData() {
    const data = await fetchData();
    // console.log(data);
    const buildingName = data.name;
    const floors = data.floors;
    const lastRetrieved = data.retrieved_at;
    const d = new Date(lastRetrieved)
    let dateLastUpdate = d.toDateString();
    let timeLastUpdate = d.toLocaleTimeString('en-US');
    console.log('last information retrieval', dateLastUpdate ,timeLastUpdate)

    // level , name, spaces, 
    
    const allFloors = []
    for (let floor of floors) {
        let level = floor.level;
        let name = floor.name;
        let spaces = floor.spaces;
        let units = floor.units;
        // console.log('++++++++++++++++++++++++')
        // console.log('++++++++++++++++++++++++')
        // console.log('LEVEL #', level)
        if (spaces.length) {
            // console.log('HEATERS IN COMMON SPACE')
            getSpace(spaces)
        } else {
            console.log('NO HEATERS IN COMMON SPACE')
        }

        allFloors.push(...getUnits(units));
    };    

}


const content = document.querySelector(".content");
function getUnits(units) {
    const floorUnitArray = []
    for (let unit of units) {
        let name = unit.name;
        let spaces = unit.spaces;
        floorUnitArray.push(name);
        // getSpace(spaces, unit)


        const html = `
            <div>
                ${name}
                <div class="nested">
                    ${getSpace(spaces)}
                </div>
            </div>
        `;

        content.innerHTML += html;



    }
    return floorUnitArray;

}

// const nested = document.querySelector(".nested")
function getSpace(spaces) {
    for (let space of spaces) {
        let spaceName = space.name;
        // console.log(space)
        console.log(spaceName, 'from nested')
        
        let radiators = space.radiators;
        // console.log('NUMBER OF RADIATORS', radiators.length)
        // if (!radiators.length) console.log('no RADs up in this bitch') 
        // getRadiatior(radiators, spaceName);
        
        const html = `
            <section>${spaceName}
            ${getRadiatior(radiators, spaceName)}
            </section>
        `;

        // nested.innerHTML += html;
    }

}


function getRadiatior(radiators, spaceName, name) {
    for (let radiator of radiators) {
        // console.log('radiator #', radiator.number)
       
        let nodes = radiator.nodes;
        getNode(nodes);
        console.log(spaceName)





    }
}



// Retrieves date, id, radiator-temp, and room-temp
function getNode(nodes) {
    for (let node of nodes) {
        let d = new Date(node.last_message);
        let dateLastMessage = d.toDateString();
        let timeLastMessage = d.toLocaleTimeString('en-US');
        let loraEUID = node.lora_euid;
        let radiatorTemp = node.radiator_temperature;
        let roomTemp = node.room_temperature;
        
        if (radiatorTemp < 72) {
            console.log('RADIATOR NOT PRODUCING STEAM')
        }
        if (radiatorTemp > 100) {
            console.log('UNUSUAL RADIATOR HIGH TEMP')
        }
        // console.log('radiator temp', radiatorTemp)
        // console.log('room temp', roomTemp)

        // console.log('LAST FETCHED')
        // console.log(dateLastMessage)
        // console.log(timeLastMessage)


        
        
        // console.log('===============')
        
    }
}


showData();