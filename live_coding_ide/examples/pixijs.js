/* jshint asi:true */

// PixiJS v4 example (WebGL rendering)

model = liveCoding.loadStateOrDefaultTo({
    x: 250,
    y: 250,
})

render = (delta) => {
    if(liveCoding.codeHasChanged()) { return }

    model.x = 320

    graphics = new PIXI.Graphics()

    graphics.lineStyle(2, 0xFF00FF, 1)
    graphics.beginFill(0xFF00BB, 0.25)
    graphics.drawRoundedRect(model.x, model.y, 300, 100, 15)
    graphics.endFill()

    app.stage.removeChildren()
    app.stage.addChild(graphics)

    liveCoding.saveState(model)
}

bootstrap = () => {
    // We can only set up the GL context once
    window.app = new PIXI.Application(800, 600, { antialias: true })
    liveCoding.outputElement.appendChild(app.view);
    start()
}

start = () => { app.ticker.add(render); app.stage.removeChildren() }

if(!window.depsLoaded) {
    script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js"
    document.body.appendChild(script)
    window.depsLoaded = true

    setTimeout(bootstrap, 500)
} else {
    start()
}
