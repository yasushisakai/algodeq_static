function Light(_ambient_color, _directional_light_color, _intensity) {

    var ambient_color, directional_light_color, intensity;

    if (typeof  _ambient_color === 'undefined') ambient_color = 0xaaaaaa;
    //0x959f9f
    else ambient_color = _ambient_color;

    if (typeof  _directional_light_color === 'undefined') directional_light_color = 0xbbbbbb;
    else directional_light_color = _directional_light_color;

    if (typeof  _intensity === 'undefined') intensity = 0.6;
    else intensity = _intensity;


    this.ambient = new THREE.AmbientLight(ambient_color);

    this.light = new THREE.DirectionalLight(directional_light_color, intensity);

    if (is_make) {
        this.light.position.set(
                unit_length * 1.5, unit_length * 2.5, -unit_length * 3
        );
    } else {
        this.light.position.set(
                unit_length * 2, unit_length * 2, -unit_length * 2 *2
        );
    }

    this.light.castShadow = true;
    this.light.shadowMapWidth = 2048;
    this.light.shadowMapHeight = 2048;
    var d = unit_length;
    this.light.shadowCameraLeft = d;
    this.light.shadowCameraRight = -d;
    this.light.shadowCameraTop = d;
    this.light.shadowCameraBottom = -d;
    this.light.shadowCameraNear = 0.0;
    this.light.shadowCameraFar = unit_length * 15;
    //this.light.shadowCameraVisible = true;
    this.light.shadowBias = 0.000001;
    this.light.shadowDarkness = 0.2;
}

Light.prototype.create = function () {

    // added to the scene
    scene.add(this.ambient);
    scene.add(this.light);

}

