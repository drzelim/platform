try {
  var getWebglCanvas = function () {
    var canvas = document.createElement('canvas')
    var gl = null
    try {
      gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    } catch (e) {
    }
    if (!gl) {
      gl = null
    }
    return gl
  }

  var each = function (obj, iterator) {
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
      obj.forEach(iterator)
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        iterator(obj[i], i, obj)
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator(obj[key], key, obj)
        }
      }
    }
  }

  const getConvertString = (str, pad) => pad.substring(str.toString().length) + str;

  const getFakeBufferDataArray = () => {
    const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));
    const fakeNumber1 = getConvertString(getRandomInt(1, 499), '000');
    const fakeNumber2 = getConvertString(getRandomInt(1, 99), '00');
    const fakeNumber3 = getConvertString(getRandomInt(1, 99), '00');
    const fakeNumber4 = getConvertString(getRandomInt(1, 99), '00');
    const fakeNumber5 = getConvertString(getRandomInt(1, 999), '000');

    const fakeArray = [`-0.20${fakeNumber1}298023224`, `-0.900${fakeNumber2}`, 0, `0.400${fakeNumber3}`, `-0.260${fakeNumber4}`, 0, `0.000${fakeNumber5}`, `0.732134444`, 0];
    return new Float32Array(fakeArray.map(number => parseFloat(number)));
  }


  const originalBufferData = WebGLRenderingContext.prototype.bufferData;
  WebGLRenderingContext.prototype.bufferData = function(...args) {
    const newArgs = args.map((arg) => {
      if (typeof arg === 'object' && arg instanceof Float32Array) {
        if (arg.byteLength === 36) {
          // return getFakeBufferDataArray();
        }
      }
      return arg;
    })

    console.log('WebGLRenderingContext', arguments);
    return originalBufferData.apply(this, newArgs);
  }

  const editImage = (context, settings) => {
    if (!context) return;
    context.fillStyle = settings.fillStyle;
    context.fill();
    context.font = `${settings.fontSize}pt Arial`;
    context.rotate(settings.angle);
    context.fillText(settings.text, settings.x, settings.y);
  };

  const settings = {
    "fillStyle": "rgba(250, 255, 252, 0.05)",
    "fontSize": "25",
    "renderer": "ANGLE (AMD, Radeon RX 480 Series Direct3D11 vs_5_0 ps_5_0, D3D11)",
    "text": "SSGxrSLYKnJ",
    "vendor": "Google Inc. (AMD)",
    "x": "5",
    "y": "26"
}

  const originalFunction = HTMLCanvasElement?.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function (type) {
    let context = this.getContext('2d');
    editImage(context, settings);
    context = this.getContext('webgl');
    console.log(context);
    console.log(context.getParameter(context.BLEND_COLOR));
    context.blendColor(0.1, 0.5, 0,7, 1);
    context.clearColor(0.1, 0.5, 0,7, 1);
    console.log(context.getBufferParameter(context.ARRAY_BUFFER, context.BUFFER_SIZE));
    const canvas = originalFunction.apply(this, arguments);
    console.log(canvas);
    return canvas;
  };

  const getWebglFp = () => {
    var gl
    var fa2s = function (fa) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      return '[' + fa[0] + ', ' + fa[1] + ']'
    }
    var maxAnisotropy = function (gl) {
      var ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic')
      if (ext) {
        var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        if (anisotropy === 0) {
          anisotropy = 2
        }
        return anisotropy
      } else {
        return null
      }
    }
    gl = getWebglCanvas()
    if (!gl) {
      return null
    }
    var result = []
    var vShaderTemplate = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
    var fShaderTemplate = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
    var vertexPosBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
    var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0])
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    vertexPosBuffer.itemSize = 3
    vertexPosBuffer.numItems = 3
    var program = gl.createProgram()
    var vshader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vshader, vShaderTemplate)
    gl.compileShader(vshader)
    var fshader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fshader, fShaderTemplate)
    gl.compileShader(fshader)
    gl.attachShader(program, vshader)
    gl.attachShader(program, fshader)
    gl.linkProgram(program)
    gl.useProgram(program)
    program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex')
    program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset')
    gl.enableVertexAttribArray(program.vertexPosArray)
    gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0)
    gl.uniform2f(program.offsetUniform, 1, 1)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
    try {
      const fp = gl.canvas.toDataURL()
      result.push(fp)
      const img = document.createElement('img')
      img.src = fp;
      document.body.prepend(img)
    } catch (err) {
      console.log(err);
    }
    result.push('extensions:' + (gl.getSupportedExtensions() || []).join(';'))
    result.push('webgl aliased line width range:' + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)))
    result.push('webgl aliased point size range:' + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)))
    result.push('webgl alpha bits:' + gl.getParameter(gl.ALPHA_BITS))
    result.push('webgl antialiasing:' + (gl.getContextAttributes().antialias ? 'yes' : 'no'))
    result.push('webgl blue bits:' + gl.getParameter(gl.BLUE_BITS))
    result.push('webgl depth bits:' + gl.getParameter(gl.DEPTH_BITS))
    result.push('webgl green bits:' + gl.getParameter(gl.GREEN_BITS))
    result.push('webgl max anisotropy:' + maxAnisotropy(gl))
    result.push('webgl max combined texture image units:' + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS))
    result.push('webgl max cube map texture size:' + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE))
    result.push('webgl max fragment uniform vectors:' + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))
    result.push('webgl max render buffer size:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE))
    result.push('webgl max texture image units:' + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS))
    result.push('webgl max texture size:' + gl.getParameter(gl.MAX_TEXTURE_SIZE))
    result.push('webgl max varying vectors:' + gl.getParameter(gl.MAX_VARYING_VECTORS))
    result.push('webgl max vertex attribs:' + gl.getParameter(gl.MAX_VERTEX_ATTRIBS))
    result.push('webgl max vertex texture image units:' + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS))
    result.push('webgl max vertex uniform vectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS))
    result.push('webgl max viewport dims:' + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)))
    result.push('webgl red bits:' + gl.getParameter(gl.RED_BITS))
    result.push('webgl renderer:' + gl.getParameter(gl.RENDERER))
    result.push('webgl shading language version:' + gl.getParameter(gl.SHADING_LANGUAGE_VERSION))
    result.push('webgl stencil bits:' + gl.getParameter(gl.STENCIL_BITS))
    result.push('webgl vendor:' + gl.getParameter(gl.VENDOR))
    result.push('webgl version:' + gl.getParameter(gl.VERSION))
    try {
      var extensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (extensionDebugRendererInfo) {
        result.push('webgl unmasked vendor:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL))
        result.push('webgl unmasked renderer:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL))
      }
    } catch (e) {
    }
    if (!gl.getShaderPrecisionFormat) {
      return result
    }
    each(['FLOAT', 'INT'], function (numType) {
      each(['VERTEX', 'FRAGMENT'], function (shader) {
        each(['HIGH', 'MEDIUM', 'LOW'], function (numSize) {
          each(['precision', 'rangeMin', 'rangeMax'], function (key) {
            var format = gl.getShaderPrecisionFormat(gl[shader + '_SHADER'], gl[numSize + '_' + numType])[key]
            if (key !== 'precision') {
              key = 'precision ' + key
            }
            var line = ['webgl ', shader.toLowerCase(), ' shader ', numSize.toLowerCase(), ' ', numType.toLowerCase(), ' ', key, ':', format].join('')
            result.push(line)
          })
        })
      })
    })
    return result
  };


  const webglResult = getWebglFp();
  console.log(webglResult);

  const container = document.querySelector('.container');

  webglResult.forEach(item => {
    const h2 = document.createElement('h2');
    h2.textContent = item;
    container.appendChild(h2);
  });

} catch (err) {
  const h2 = document.createElement('h2');
  h2.textContent = err.message;
  document.body.append(h2)
}
