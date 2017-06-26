/* jshint asi:true */
// PixiJS v4 example (WebGL rendering)

// A platform game featuring cats :)

// This was made by multiple people that don't normally work in the same
// code base so the code style differs in some places.

maxJumpAcceleration = 0.09
jumpAcceleration = 0.025
gravityAcceleration = 0.006
movementAcceleration = 0.02
maxMovementSpeed = 0.1

// This describes the ground tiles, e.g. ground and water.
//
// See list at the bottom of this file for all available tiles, or
// just change things and see what happens :)
//
// Tile number can have modifiers:
// - "S" means solid, e.g. you can stand on it and not walk though it
// - "P" means platform, you can jump up to it.
//
// There is also shorthand syntax:
// - "W" is shorthand for 17:B (water, background)
//
// Besides those you can use addons from customMapAddons.
// These also have offset syntax, e.g. BU1(0.5,0).
groundTileMap = [
  "2",
  "2",
  "2+TR1+CR1(1.25,0)+BU1(1.2,0)",
  "2",
  "2",
  "2+MU1",
  "2",
  "2:4B:1P",
  "2:5B:8B:1P",
  "2+BU3:5B:5B:2P+MU2",
  "2+BU3:5B:5B:2P",
  "2:6B:6B:3P",
  "3+SIGN2",
  "W",
  "W",
  "1+SIGN1",
  "2",
  "2+TR2",
  "2+TR5(0.5,0)",
  "2",
  "2+ST1(1.4,0)+TR3",
  "2",
  "7",
  "8:1+BU5",
  "5:7",
  "5:8:1",
  "5:5:2+BU3(-0.3,0)+TR4+BU3(1.2,0)",
  "5:5:2",
  "10:6:3",
  "11",
  "2",
  "3",
  "W",
  "W::13",
  "W::14",
  "W::14+TR2",
  "W::14",
  "W::14",
  "W::14",
  "W::15",
  "W",
  "W",
  "W:12:4:1",
  "W:9:10:3",
  "W:9:11",
  "W:9:2",
  "W:9:2:::13",
  "W:9:2:::14",
  "W:9:2:::14",
  "W:9:7:::14",
  "W:9:8:1::14",
  "W:9:5:2::14",
  "W:9:5:2::14",
  "W:9:5:2::14",
  "W:16:6:3::14",
  "W:::::14",
  "W:::::15",
  "W:13",
  "W:14",
  "W:14",
  "W:14",
  "W:14:::12:1S",
  "W:14:::9:2",
  "W:15:::9:2",
  "W::::9:7",
  "W::::9:8:4:1",
  "4:1:::9:5:5:2",
  "10:3:::9:5:5:2",
  "11:::12:5:5:5:2",
  "2:::16:6:6:6:3",
  "2:::13::::13",
  "2:::15::::15",
  "2",
  "7",
  "8:1::::13",
  "5:7::::15",
  "5:8:4:4:4:4:4:1",
  "5:5:5:5:5:5:5:2",
  "10:6:6:6:6:6:6:3",
  "11",
  "2",
  "2::13",
  "2::15::::13",
  "2::::::15",
  "2",
  "2::::13",
  "2::::15",
  "2",
  "2",
  "2:::::13",
  "7:::::15",
  "8:1",
  "5:7",
  "5:8:1+MU1",
  "5:5:2+TR1(0.5,0)",
  "5:5:2",
  "5:10:3+MU1",
  "5:11",
  "10:3",
  "11",
  "2","2","2","2","2","2","2","2","3",
  "W","W","W","W","W","W","W","W",
  "W","W","W","W","W","W","W","W"
]

customMapAddons = {
    "TR1": { x: -1.7, y: 4.7, texture: "object_tree_2", scale: 1, collisionType: "bg" },
    "TR2": { x: -2.8, y: 7.05, texture: "object_tree_2", scale: 1.5, collisionType: "bg" },
    "TR3": { x: -3.9, y: 9.4, texture: "object_tree_2", scale: 2, collisionType: "bg" },
    "TR4": { x: -0.435, y: 0.685, texture: "object_tree_1", scale: 1, collisionType: "bg" },
    "TR5": { x: -1.75, y: 4.3, texture: "object_tree_3", scale: 1, collisionType: "bg" },
    "BU1":  [
        { x: -1, y: 1, texture: "object_bush_1", scale: 1, collisionType: "bg" },
        { x: -0.5, y: 1, texture: "object_bush_1", scale: 1, collisionType: "bg" },
        { x: 0, y: 1, texture: "object_bush_1", scale: 1, collisionType: "bg" },
    ],
    "BU2": { x: 0, y: 1, texture: "object_bush_1", scale: 1, collisionType: "bg" },
    "BU3": { x: -0.56, y: 1.01, texture: "object_bush_2", scale: 1, collisionType: "bg" },
    "BU4": { x: 0, y: 0.73, texture: "object_bush_3", scale: 1, collisionType: "bg" },
    "BU5": { x: 0, y: 0.71, texture: "object_bush_4", scale: 1, collisionType: "bg" },
    "MU1": { x: 0, y: 0.62, texture: "object_mushroom_1", scale: 1, collisionType: "bg" },
    "MU2": { x: 0, y: 0.62, texture: "object_mushroom_2", scale: 1, collisionType: "bg" },
    "CR1": { x: -0.12, y: 1.2, texture: "object_crate", scale: 1, collisionType: "bg" },
    "ST1": { x: -0.23, y: 0.84, texture: "object_stone", scale: 1, collisionType: "bg" },
    "SIGN1": { x: 0, y: 1.02, texture: "object_sign_1", scale: 1, collisionType: "bg" },
    "SIGN2": { x: 0.1, y: 1, texture: "object_sign_2", scale: 1, collisionType: "bg" },
}


generateMap = () => {
    mapLayer = []
    addonLayer = []

    for(x = 0; x < groundTileMap.length; x++) {
        column = groundTileMap[x]
        if(!Array.isArray(column)) { column = [ column ] }

        // Convert "1:2:3" to [ "1", "2", "3" ]
        if(column.length == 1 && column[0].indexOf(":") != -1) {
          column = column[0].split(":")
        }

        for(y = 0; y < column.length; y++) {
            row = column[y]

            temp = row.split("+")
            number = temp[0]
            addons = temp.slice(1)

            tileNumber = parseInt(number)

            collisionType = "solid"
            if(number.indexOf("P") != -1) { collisionType = "platform" }
            if(number.indexOf("B") != -1) { collisionType = "bg" }

            if(number[0] == "W") {
                tileNumber = "17"
                collisionType = "bg"
            }

            if(isNaN(tileNumber)){
                continue;
            }

            mapLayer.push({
                x: x,
                y: y,
                scale: 0.5,
                texture: "tile_" + tileNumber,
                collisionType: collisionType,
            })

            for(i = 0; i < addons.length; i++) {
                // Support syntax for custom offsets, e.g.
                // TR1:(-0.5,0) to move it -0.5 in X relative
                // to where it would otherwise be placed.
                let [ name, offsets ] = addons[i].split("(");

                let xdiff = 0
                let ydiff = 0
                if(offsets) {
                    let [ x, y ] = offsets.split(")")[0].split(",")
                    xdiff = parseFloat(x)
                    ydiff = parseFloat(y)
                }

                let list = customMapAddons[name]
                if(!Array.isArray(list)) { list = [ list ] }

                for(let j = 0; j < list.length; j++) {
                    copy = Object.assign({}, list[j]);
                    copy.x += x + xdiff
                    copy.y += y + ydiff
                    addonLayer.push(copy)
                }
            }
        }
    }

    return mapLayer.concat(addonLayer)
}

map = generateMap()


model = loadStateOrDefaultTo(getDefaultModelValues())
//model.character.x = 20

characterResetValues = {
    x: 0.5,
    y: 0,
    lastdirection: "right",
};

function getDefaultModelValues(resetValues) {
    if(resetValues === undefined){
        return {
            character: {
                x: 0.5,
                y: 0,
                vx: 0,
                vy: 0,
            },
            input: {
                direction: "none",
                lastdirection: "right",
                isJumpPossible: false,
                jump: false,
            },
        }
    } else {
        return {
            character: {
                x: resetValues.x,
                y: resetValues.y,
                vx: 0,
                vy: 0,
            },
            input: {
                direction: "none",
                lastdirection: resetValues.lastdirection,
                isJumpPossible: false,
                jump: false,
            },
        }
    }
}

tick = (delta) => {
    if(codeHasChanged()) { return }
    logFps()

    if (model.input.isJumpPossible){
        model.input.isJumpPossible =
        (model.character.vy < maxJumpAcceleration &&
         model.character.vy >= 0)
    }
                   
    onTheGround = model.character.vy === 0

    if(model.input.isJumpPossible) {
        applyKeyboardInput(delta)
    }
    
    if(onTheGround){
        applyFriction(delta)
        model.input.isJumpPossible = true
    }

    applyGravity(delta)

    applyVelocity()

    render(delta)

    saveState(model)
}

applyKeyboardInput = (delta) => {
    if(model.input.direction == "right") {
        if(model.character.vx < maxMovementSpeed) {
            model.character.vx += movementAcceleration * delta
        }
    }

    if(model.input.direction == "left") {
        if(model.character.vx > -maxMovementSpeed) {
            model.character.vx -= movementAcceleration * delta
        }
    }

    if(model.input.jump) {
        if(model.character.vy < maxJumpAcceleration){
            model.character.vy += jumpAcceleration * delta
        }
    }
}

applyFriction = (delta) => {
    // Apply friction to stop player movement
    if(model.character.vx > 0) {
        model.character.vx -= (movementAcceleration / 2) * delta
        if(model.character.vx < 0) {
            model.character.vx = 0
        }
    }

    if(model.character.vx < 0) {
        model.character.vx += (movementAcceleration / 2) * delta

        if(model.character.vx > 0) {
            model.character.vx = 0
        }
    }
}

applyVelocity = () => {
    model.character.x += model.character.vx
    model.character.y += model.character.vy

    bottomCollision = setBottomCollision(model)
    topCollision = setTopCollision(model);
    rightCollision = setRightCollision(model)
    leftCollision = setLeftCollision(model)

    if(model.character.x > rightCollision - 0.2 && rightCollision > 0) {
        model.character.x = rightCollision - 0.2;
    }

    if(model.character.x < leftCollision + 0.2 && leftCollision > 0) {
        model.character.x = leftCollision + 0.2;
    }

    if(model.character.y >= topCollision && topCollision > -0.5) {
      model.character.y = topCollision
      model.character.vy = -0.00001
    }

    leftMapBorder = 0.3;
    if(model.character.x < leftMapBorder) {
        model.character.x = leftMapBorder
    }

    // rightMapBorder = 24.8;
    // if(model.character.x > rightMapBorder) {
    //     model.character.x = rightMapBorder
    // }

    if (model.character.y <= -1){
        console.log("Thus ends the story of our brave kitty! You have died!")
        model = getDefaultModelValues(characterResetValues);
    }

    if(model.character.y <= bottomCollision && model.character.vy <= 0) {
        model.character.y = bottomCollision
        model.character.vy = 0

        characterResetValues.x = model.character.x;
        characterResetValues.y = model.character.y;
        characterResetValues.lastdirection = model.input.lastdirection;
    }
}

function setRightCollision(model){
    closestDistance = 999
    closestMapV = null
    characterV = new Vector(model.character.x, model.character.y*2 + 1)

    for(i = 0; i < map.length; i++) {
        mapV = new Vector(map[i].x, map[i].y)

        if(map[i].collisionType != "solid"){
            continue;
        }

        if(mapV.y != characterV.y.toFixed(0)) {
            continue;
        }

        if(mapV.x < characterV.x.toFixed(0)){
            continue;
        }

        distance = characterV.distanceTo(mapV);
        if(distance < closestDistance) {
          closestDistance = distance
          closestMapV = mapV
        }
    }

    return closestMapV !== null ? closestMapV.x : -1;
}

function setLeftCollision(model){
    closestDistance = 999
    closestMapV = null
    characterV = new Vector(model.character.x, model.character.y*2 + 1)

    for(i = 0; i < map.length; i++) {
        mapV = new Vector(map[i].x + 1, map[i].y)

        if(map[i].collisionType != "solid"){
            continue;
        }

        if(mapV.y != characterV.y.toFixed(0)) {
            continue;
        }

        if(mapV.x > characterV.x.toFixed(0)){
            continue;
        }

        distance = characterV.distanceTo(mapV);
        if(distance < closestDistance) {
          closestDistance = distance
          closestMapV = mapV
        }
    }

    return closestMapV !== null ? closestMapV.x : -1;
}

function setBottomCollision(model){
    closestDistance = 999
    closestMapV = null
    characterV = new Vector(model.character.x-0.5, model.character.y*2)

    for(i = 0; i < map.length; i++) {
        mapV = new Vector(map[i].x, map[i].y)

        if(map[i].collisionType == "bg"){
            continue;
        }
        
        if(mapV.x != characterV.x.toFixed(0)){
            continue;
        }

        if(mapV.y > characterV.y.toFixed(0)) {
            continue;
        }

        distance = characterV.distanceTo(mapV);
        if(distance < closestDistance) {
          closestDistance = distance
          closestMapV = mapV
        }
    }

    return closestMapV !== null ? closestMapV.y/2 : -1;
}

function setTopCollision(model){
    closestDistance = 999
    closestMapV = null
    characterV = new Vector(model.character.x-0.5, model.character.y*2 + 1)

    for(i = 0; i < map.length; i++) {
        mapV = new Vector(map[i].x, map[i].y)

        if(map[i].collisionType != "solid"){
            continue;
        }

        if(mapV.x != characterV.x.toFixed(0)){
            continue;
        }

        if(mapV.y < characterV.y.toFixed(0)) {
            continue;
        }

        distance = characterV.distanceTo(mapV);
        if(distance < closestDistance) {
          closestDistance = distance
          closestMapV = mapV
        }
    }

    return closestMapV !== null ? closestMapV.y/2 - 0.75 : -1;
}

applyGravity = (delta) => {
    model.character.vy -= gravityAcceleration * delta
}

render = (delta) => {
    // Remove previous frame
    app.stage.removeChildren()

    // Calculate character
    cat = currentCatTexture(delta)

    cat.x = model.character.x * 64 + 32*0
    cat.y = app.renderer.height - ((model.character.y + 1) * 64 * 2) + 10

    // Stop character when it reaces the middle of the screen
    // and move the map instead
    mapX = null
    centerOfScreenX = app.renderer.width / 2 - cat.width
    if(cat.x > centerOfScreenX) {
        mapX = cat.x - centerOfScreenX
        cat.x = centerOfScreenX
    }

    // Render sky
    sky = loadTexture("tile_18")
    sky.scale.x = app.renderer.width / 128
    sky.scale.y = app.renderer.width / 128
    app.stage.addChild(sky)

    // Render map
    for(i = 0; i < map.length; i++) {
      tile = map[i]
      texture = loadTexture(tile.texture)

      // Move pieces relative to eachother and the screen size
      texture.x = tile.x * 64
      texture.y = -tile.y * 64 + app.renderer.height - 64

      // Move ground relative to character
      texture.x -= mapX
      //texture.y += model.character.y * 64 * 1

      texture.scale.x = tile.scale
      texture.scale.y = tile.scale
      app.stage.addChild(texture)
    }

    // Render character
    app.stage.addChild(cat)
}

catTextureIndex = 0

currentCatTexture = (delta) => {
    walkingTextureNames = [
        "cat_walk_1",
        "cat_walk_2",
        "cat_walk_3",
        "cat_walk_4",
        "cat_walk_5",
        "cat_walk_6",
        "cat_walk_7",
        "cat_walk_8",
        "cat_walk_9",
        "cat_walk_10",
    ]

    if(model.character.vx === 0) {
        catTextureIndex = 0
    } else {
        catTextureIndex += 0.6 * delta
    }

    if(catTextureIndex > walkingTextureNames.length - 1) {
        catTextureIndex = 0
    }


    sprite = loadTexture(walkingTextureNames[parseInt(catTextureIndex)]);
    sprite.anchor.x = 0.5;

    if(model.input.direction == "right") {
        model.input.lastdirection = "right"
    } else if(model.input.direction == "left") {
        model.input.lastdirection = "left"
    }

    if(model.input.lastdirection == "right") {
        sprite.scale.x = 1
    } else if(model.input.lastdirection == "left") {
        sprite.scale.x = -1
    }

    return sprite;
}

// Helper code below here ------------------------------------------------

Vector = function(x, y) {
    this.x = x
    this.y = y
}

Vector.prototype.sub = function(v) {
    x = this.x - v.x;
    y = this.y - v.y;
    return new Vector(x, y);
}

Vector.prototype.distanceTo = function(v) {
    var dx = this.x - v.x, dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
}

mode = "edit"

var keyWasPressed = (e) => {
    editor.on("focus", function() {
        mode = "edit"
        liveViewElement.style.border = "none"
    })

    if(e.key == "§" && e.type == "keydown") {
        e.preventDefault()

        if(mode == "edit") {
            enterPlayMode(e)
        } else {
            window.editor.focus()
        }
    }

    if(mode == "play") {
        handlePlayInput(e)
    }
}

function handlePlayInput(e,f) {

    if(e.key == "§") {
        return;
    }

    if(e.type == "keydown"){
        if(e.key == "d")
            model.input.direction = "right"
        else if(e.key == "a")
            model.input.direction = "left"
        else if(e.key == "w")
            model.input.jump = true

        return;
    }

    if (e.type == "keyup") {
        if(e.key == "d" && model.input.direction == "right")
            model.input.direction = "none"
        else if(e.key == "a"&& model.input.direction == "left")
            model.input.direction = "none"
        else if(e.key == "w") {
            model.input.jump = false;
            model.input.isJumpPossible = false;
        }

        return;
    }

    if(e.type == "touchmove") {
        var touchObj = e.changedTouches[0];
        var firstObj = f.changedTouches[0];

        var touchDX = parseInt(touchObj.screenX) - parseInt(firstObj.screenX)
        var touchDY = parseInt(firstObj.screenY) - parseInt(touchObj.screenY)

        var swipeTolerance = 30

        if(touchDX < swipeTolerance && touchDX > -swipeTolerance)
            model.input.direction = "none"

        if(touchDX <= -swipeTolerance)
            model.input.direction = "left"

        if(touchDX >= swipeTolerance)
            model.input.direction = "right"

        if(touchDY < swipeTolerance)
            model.input.jump = false

        if(touchDY >= swipeTolerance)
            model.input.jump = true

        return;
    }

    if(e.type == "touchend") {
        model.input.direction = "none"
        model.input.jump = false
        return;
    }


    console.log("Unhandled input in play mode: " + JSON.stringify(e))
}

function IsCanvas(pathObject){
    var object = pathObject[0]
    
    if( object.nodeName == 'CANVAS' ||
        object.tagName == 'CANVAS' ||
        object.localName == 'canvas'){
            return true;
        }
    
    return false;
}

touchStart = undefined;

function touchStartEvent(e) {
    touchStart = e;

    if(IsCanvas(e.path)) {
        if(mode != "play"){
            mode = "play"
            enterPlayMode(e)
        }
    } else {
        if (mode != "edit"){
            editor.on("focus", function() {
                mode = "edit"
                liveViewElement.style.border = "none"
            })
            window.editor.focus()
        }     
    }
}

function touchMoveEvent(e) {
    if(mode == "play"){
        handlePlayInput(e, touchStart)
        e.preventDefault();
    }
}

function touchEndEvent(e) {
    if(mode == "play"){
        handlePlayInput(e)
        e.preventDefault();
    }
}

enterPlayMode = function(e) {
    e.preventDefault()

    mode = "play"
    liveViewElement.style.borderLeft = "5px solid green"
    window.editor.blur()
    liveViewElement.focus()
}

loadTexture = (name) => {
    texture = data.textures[name]

    if(texture) {
        return PIXI.Sprite.fromImage(texture)
    } else {
        throw "No texture with name " + name
    }
}

lastTimeFpsWasUpdated = new Date()
framesSinceLastFpsCheck = 0
logFps = () => {
    framesSinceLastFpsCheck++
    if(new Date() - lastTimeFpsWasUpdated > 1000)
    {
        lastTimeFpsWasUpdated = new Date()
        if(window.location.href.indexOf("logfps") != -1) {
          console.log("FPS: " + framesSinceLastFpsCheck)
        }
        framesSinceLastFpsCheck = 0
    }
}

if(!window.liveEventListeners) { window.liveEventListeners = [] }

if(window.liveEventListeners.length) {
    for(i = 0; i < window.liveEventListeners.length; i++) {
        document.removeEventListener("touchstart", window.liveEventListeners[i])
        document.removeEventListener("touchmove", window.liveEventListeners[i])
        document.removeEventListener("touchend", window.liveEventListeners[i])
        document.removeEventListener("keydown", window.liveEventListeners[i])
        document.removeEventListener("keyup", window.liveEventListeners[i])
        removeByValue(window.liveEventListeners, window.liveEventListeners[i])
    }
}


// touch events
document.addEventListener("touchstart", touchStartEvent)
document.addEventListener("touchmove", touchMoveEvent)
document.addEventListener("touchend", touchEndEvent)
window.liveEventListeners.push(touchStartEvent)
window.liveEventListeners.push(touchMoveEvent)
window.liveEventListeners.push(touchEndEvent)

// keyboard events
document.addEventListener("keydown", keyWasPressed)
document.addEventListener("keyup", keyWasPressed)
window.liveEventListeners.push(keyWasPressed)

// mouse events
liveViewElement.addEventListener("click", enterPlayMode)


function removeByValue(array, value) {
    return array.filter(function(elem, _index){
        return value != elem ? true : false
    })
}

bootstrap = () => {
    // We can only set up the GL context once
    window.app = new PIXI.Application(800, 600, { antialias: true })
    liveViewElement.appendChild(app.view);
    start()
}

start = () => { app.ticker.add(tick); app.stage.removeChildren() }

function fetchFromUrl(url, callback) {
    let xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText)
        }
    }

    xmlhttp.open("GET", url, true)
    xmlhttp.send()
}

if(!window.depsLoaded) {
    script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js"
    document.body.appendChild(script)

    fetchFromUrl("https://gist.githubusercontent.com/joakimk/c014b72f418a9160b72761efd98acdf6/raw/406773b93343a49b3704704317072abc54e673d8/data.json", (body) => {
        window.data = JSON.parse(body)
        setTimeout(bootstrap, 500)
    })

    window.depsLoaded = true
} else {
    start()
}

// All available textures
// tile_1, tile_10, tile_11, tile_12, tile_13, tile_14, tile_15, tile_16, tile_17, tile_18, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7, tile_8, tile_9, cat_dead_1, cat_dead_10, cat_dead_2, cat_dead_3, cat_dead_4, cat_dead_5, cat_dead_6, cat_dead_7, cat_dead_8, cat_dead_9, cat_fall_1, cat_fall_2, cat_fall_3, cat_fall_4, cat_fall_5, cat_fall_6, cat_fall_7, cat_fall_8, cat_hurt_1, cat_hurt_10, cat_hurt_2, cat_hurt_3, cat_hurt_4, cat_hurt_5, cat_hurt_6, cat_hurt_7, cat_hurt_8, cat_hurt_9, cat_idle_1, cat_idle_10, cat_idle_2, cat_idle_3, cat_idle_4, cat_idle_5, cat_idle_6, cat_idle_7, cat_idle_8, cat_idle_9, cat_jump_1, cat_jump_2, cat_jump_3, cat_jump_4, cat_jump_5, cat_jump_6, cat_jump_7, cat_jump_8, cat_run_1, cat_run_2, cat_run_3, cat_run_4, cat_run_5, cat_run_6, cat_run_7, cat_run_8, cat_slide_1, cat_slide_10, cat_slide_2, cat_slide_3, cat_slide_4, cat_slide_5, cat_slide_6, cat_slide_7, cat_slide_8, cat_slide_9, cat_walk_1, cat_walk_10, cat_walk_2, cat_walk_3, cat_walk_4, cat_walk_5, cat_walk_6, cat_walk_7, cat_walk_8, cat_walk_9, object_bush_1, object_bush_2, object_bush_3, object_bush_4, object_crate, object_mushroom_1, object_mushroom_2, object_sign_1, object_sign_2, object_stone, object_tree_1, object_tree_2, object_tree_3