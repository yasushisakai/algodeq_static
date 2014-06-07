function Light(_ambient_color,_directional_light_color,_intensity) {

    var ambient_color,directional_light_color,intensity;

    if(typeof  _ambient_color === 'undefined') ambient_color = 0x959f9f;
    else ambient_color = _ambient_color;

    if(typeof  _directional_light_color === 'undefined') directional_light_color = 0xcccccc;
    else directional_light_color = _directional_light_color;

    if(typeof  _intensity === 'undefined') intensity = 1;
    else intensity = _intensity;


    this.ambient = new THREE.AmbientLight(ambient_color);

    this.light = new THREE.DirectionalLight(directional_light_color, intensity);

    this.light.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
    );

    // todo: fine-tune the shadows,
    this.light.castShadow = true;
    this.light.shadowMapWidth = 4096;
    this.light.shadowMapHeight = 4096;
    var d = 1000000;
    this.light.shadowCameraLeft = d;
    this.light.shadowCameraRight = -d;
    this.light.shadowCameraTop = d;
    this.light.shadowCameraBottom = -d;
    this.light.shadowCameraNear = 100000;
    this.light.shadowCameraFar = 2500000;
    //this.light.shadowCameraVisible = true;
    this.light.shadowBias = 0.000001;
    this.light.shadowDarkness = 0.2;
}

Light.prototype.create = function () {

    // added to the scene
    scene.add(this.ambient);
    scene.add(this.light);

}

