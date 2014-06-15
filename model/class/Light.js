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

//    this.light.position.set(
//        camera.position.x,
//        camera.position.y,
//        camera.position.z
//    );

    this.light.position.set(
        unit_length*2,unit_length*2,-unit_length*2
    );

    // todo: fine-tune the shadows,
    this.light.castShadow = true;
    this.light.shadowMapWidth = 2048;
    this.light.shadowMapHeight = 2048;
    var d = unit_length;
    this.light.shadowCameraLeft = d;
    this.light.shadowCameraRight = -d;
    this.light.shadowCameraTop = d;
    this.light.shadowCameraBottom = -d;
    this.light.shadowCameraNear = 0.0;
    this.light.shadowCameraFar = unit_length*15;
    this.light.shadowCameraVisible = true;
    this.light.shadowBias = 0.000001;
    this.light.shadowDarkness = 0.2;
}

Light.prototype.create = function () {

    // added to the scene
    scene.add(this.ambient);
    scene.add(this.light);

}

