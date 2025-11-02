"use client";

import React, { FC, useRef, useState, useEffect, MutableRefObject } from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";

/* =================== SHADERS =================== */

const discVertShaderSource = `#version 300 es
uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;

    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;

    float scale = max(imageAspect / containerAspect, containerAspect / imageAspect);

    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;

    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

/* =================== GEOMETRY HELPERS =================== */

class Face { constructor(public a: number, public b: number, public c: number) {} }
class Vertex {
  public position: vec3; public normal: vec3; public uv: vec2;
  constructor(x: number, y: number, z: number) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}
class Geometry {
  public vertices: Vertex[] = [];
  public faces: Face[] = [];
  addVertex(...args: number[]) { for (let i=0;i<args.length;i+=3) this.vertices.push(new Vertex(args[i],args[i+1],args[i+2])); return this; }
  addFace(...args: number[]) { for (let i=0;i<args.length;i+=3) this.faces.push(new Face(args[i],args[i+1],args[i+2])); return this; }
  get lastVertex() { return this.vertices[this.vertices.length-1]; }
  subdivide(divisions=1){ const mid:Record<string,number>={}; let f=this.faces;
    for(let d=0;d<divisions;++d){ const nf=new Array<Face>(f.length*4);
      f.forEach((face,ndx)=>{const mAB=this.getMid(face.a,face.b,mid);const mBC=this.getMid(face.b,face.c,mid);const mCA=this.getMid(face.c,face.a,mid);
        const i=ndx*4; nf[i+0]=new Face(face.a,mAB,mCA); nf[i+1]=new Face(face.b,mBC,mAB); nf[i+2]=new Face(face.c,mCA,mBC); nf[i+3]=new Face(mAB,mBC,mCA);});
      f=nf;
    } this.faces=f; return this; }
  spherize(radius=1){ this.vertices.forEach(v=>{ vec3.normalize(v.normal,v.position); vec3.scale(v.position,v.normal,radius);}); return this; }
  get data(){return{vertices:this.vertexData,indices:this.indexData,normals:this.normalData,uvs:this.uvData}}
  get vertexData(){return new Float32Array(this.vertices.flatMap(v=>Array.from(v.position)));}
  get normalData(){return new Float32Array(this.vertices.flatMap(v=>Array.from(v.normal)));}
  get uvData(){return new Float32Array(this.vertices.flatMap(v=>Array.from(v.uv)));}
  get indexData(){return new Uint16Array(this.faces.flatMap(f=>[f.a,f.b,f.c]));}
  private getMid(a:number,b:number,cache:Record<string,number>){ const key=a<b?`k_${b}_${a}`:`k_${a}_${b}`; if(cache[key]!=null) return cache[key];
    const A=this.vertices[a].position, B=this.vertices[b].position, ndx=this.vertices.length;
    cache[key]=ndx; this.addVertex((A[0]+B[0])*0.5,(A[1]+B[1])*0.5,(A[2]+B[2])*0.5); return ndx; }
}
class IcosahedronGeometry extends Geometry {
  constructor(){ super(); const t=Math.sqrt(5)*0.5+0.5;
    this.addVertex(
      -1, t, 0,  1, t, 0,  -1,-t,0,  1,-t,0,  0,-1, t,  0, 1, t,  0,-1,-t,  0, 1,-t,  t,0,-1,  t,0, 1, -t,0,-1, -t,0, 1
    ).addFace(
      0,11,5, 0,5,1, 0,1,7, 0,7,10, 0,10,11,
      1,5,9, 5,11,4, 11,10,2, 10,7,6, 7,1,8,
      3,9,4, 3,4,2, 3,2,6, 3,6,8, 3,8,9,
      4,9,5, 2,4,11, 6,2,10, 8,6,7, 9,8,1
    );
  }
}
class DiscGeometry extends Geometry {
  constructor(steps=56, radius=1){ super(); const a=(2*Math.PI)/Math.max(4,steps);
    this.addVertex(0,0,0); this.lastVertex.uv[0]=0.5; this.lastVertex.uv[1]=0.5;
    for(let i=0;i<Math.max(4,steps);++i){ const x=Math.cos(a*i), y=Math.sin(a*i);
      this.addVertex(radius*x, radius*y, 0); this.lastVertex.uv[0]=x*0.5+0.5; this.lastVertex.uv[1]=y*0.5+0.5;
      if(i>0) this.addFace(0,i,i+1);
    } this.addFace(0, Math.max(4,steps), 1);
  }
}

/* =================== GL UTILS =================== */

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const sh = gl.createShader(type)!; gl.shaderSource(sh, source); gl.compileShader(sh);
  if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
  console.error(gl.getShaderInfoLog(sh)); gl.deleteShader(sh); return null;
}
function createProgram(gl: WebGL2RenderingContext, sources:[string,string], varyings?:string[]|null, attribs?:Record<string,number>) {
  const prog = gl.createProgram()!; [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((t,i)=>{ const s=createShader(gl,t,sources[i]); if(s) gl.attachShader(prog,s);});
  if(varyings) gl.transformFeedbackVaryings(prog, varyings, gl.SEPARATE_ATTRIBS);
  if(attribs) Object.keys(attribs).forEach(name=>gl.bindAttribLocation(prog, attribs[name], name));
  gl.linkProgram(prog);
  if (gl.getProgramParameter(prog, gl.LINK_STATUS)) return prog;
  console.error(gl.getProgramInfoLog(prog)); gl.deleteProgram(prog); return null;
}
function makeVertexArray(gl: WebGL2RenderingContext, bufLocNum: Array<[WebGLBuffer,number,number]>, indices?: Uint16Array) {
  const va = gl.createVertexArray()!; gl.bindVertexArray(va);
  for (const [buf, loc, n] of bufLocNum){ if(loc===-1) continue; gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,n,gl.FLOAT,false,0,0); }
  if(indices){ const ib = gl.createBuffer()!; gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); }
  gl.bindVertexArray(null); return va;
}
function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
  const need = canvas.width !== w || canvas.height !== h; if(need){ canvas.width = w; canvas.height = h; } return need;
}
function makeBuffer(gl: WebGL2RenderingContext, sizeOrData: number | ArrayBufferView, usage: number) {
  const buf = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, sizeOrData as any, usage); gl.bindBuffer(gl.ARRAY_BUFFER, null); return buf;
}
function createAndSetupTexture(gl: WebGL2RenderingContext, min: number, mag: number, wrapS: number, wrapT: number) {
  const tex = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mag);
  return tex;
}

/* =================== CONTROLS =================== */

type UpdateCallback = (dt: number) => void;
class ArcballControl {
  constructor(private canvas: HTMLCanvasElement, private updateCb: UpdateCallback = () => {}) {
    canvas.addEventListener('pointerdown', (e)=>{ vec2.set(this.pointerPos, e.clientX, e.clientY); vec2.copy(this.prevPos, this.pointerPos); this.isPointerDown = true; });
    canvas.addEventListener('pointerup', ()=>{ this.isPointerDown=false; });
    canvas.addEventListener('pointerleave', ()=>{ this.isPointerDown=false; });
    canvas.addEventListener('pointermove', (e)=>{ if(this.isPointerDown){ vec2.set(this.pointerPos, e.clientX, e.clientY);} });
    canvas.style.touchAction = 'none';
  }
  public isPointerDown=false; public orientation=quat.create(); public pointerRotation=quat.create();
  public rotationVelocity=0; public rotationAxis=vec3.fromValues(1,0,0);
  public snapDirection=vec3.fromValues(0,0,-1); public snapTargetDirection: vec3|null = null;
  private pointerPos=vec2.create(); private prevPos=vec2.create(); private _rv=0; private _combined=quat.create();
  private readonly EPS=0.1; private readonly ID=quat.create();

  update(dt:number, target=16){
    const timeScale = dt/target + 0.00001; let angleFactor=timeScale; const snapRot=quat.create();
    if(this.isPointerDown){
      const INT=0.3*timeScale, AMP=5/timeScale; const mid=vec2.sub(vec2.create(), this.pointerPos, this.prevPos); vec2.scale(mid, mid, INT);
      if(vec2.sqrLen(mid)>this.EPS){ vec2.add(mid,this.prevPos,mid);
        const p=this.project(mid), q=this.project(this.prevPos), a=vec3.normalize(vec3.create(),p), b=vec3.normalize(vec3.create(),q);
        vec2.copy(this.prevPos, mid); angleFactor*=AMP; this.quatFromVectors(a,b,this.pointerRotation,angleFactor);
      } else { quat.slerp(this.pointerRotation,this.pointerRotation,this.ID,INT); }
    } else {
      const INT=0.1*timeScale; quat.slerp(this.pointerRotation,this.pointerRotation,this.ID,INT);
      if(this.snapTargetDirection){ const SN=0.2; const a=this.snapTargetDirection, b=this.snapDirection;
        const dist=vec3.squaredDistance(a,b); const factor=Math.max(0.1, 1 - dist*10); angleFactor*=SN*factor; this.quatFromVectors(a,b,snapRot,angleFactor);
      }
    }
    const combined=quat.multiply(quat.create(),snapRot,this.pointerRotation); this.orientation=quat.multiply(quat.create(),combined,this.orientation); quat.normalize(this.orientation,this.orientation);
    const RAINT=0.8*timeScale; quat.slerp(this._combined,this._combined,combined,RAINT); quat.normalize(this._combined,this._combined);

    const rad=Math.acos(this._combined[3])*2., s=Math.sin(rad/2.); let rv=0;
    if(s>0.000001){ rv=rad/(2.*3.14159265); this.rotationAxis[0]=this._combined[0]/s; this.rotationAxis[1]=this._combined[1]/s; this.rotationAxis[2]=this._combined[2]/s; }
    const RVINT=0.5*timeScale; this._rv += (rv - this._rv) * RVINT; this.rotationVelocity = this._rv / timeScale;
    this.updateCb(dt);
  }
  private quatFromVectors(a:vec3,b:vec3,out:quat, factor=1){ const axis=vec3.cross(vec3.create(),a,b); vec3.normalize(axis,axis);
    const d=Math.max(-1, Math.min(1, vec3.dot(a,b))); const angle=Math.acos(d)*factor; quat.setAxisAngle(out, axis, angle); return {q:out, axis, angle}; }
  private project(pos:vec2){ const r=2, w=this.canvas.clientWidth, h=this.canvas.clientHeight, s=Math.max(w,h)-1;
    const x=(2*pos[0]-w-1)/s, y=(2*pos[1]-h-1)/s; let z=0, xy=x*x+y*y, r2=r*r; z = (xy<=r2/2.) ? Math.sqrt(r2-xy) : r2/Math.sqrt(xy);
    return vec3.fromValues(-x, y, z);
  }
}

/* =================== MENU (ENGINE) =================== */

interface MenuItem { image: string; link: string; title: string; description: string; }
type ActiveItemCallback = (index: number) => void;
type MovementChangeCallback = (isMoving: boolean) => void;
type InitCallback = (instance: InfiniteGridMenu) => void;

interface Camera {
  matrix: mat4; near: number; far: number; fov: number; aspect: number; position: vec3; up: vec3;
  matrices: { view: mat4; projection: mat4; inversProjection: mat4; };
}

class InfiniteGridMenu {
  private gl: WebGL2RenderingContext | null = null;
  private discProgram: WebGLProgram | null = null;
  private discVAO: WebGLVertexArrayObject | null = null;
  private discBuffers!: { vertices: Float32Array; indices: Uint16Array; normals: Float32Array; uvs: Float32Array; };
  private icoGeo!: IcosahedronGeometry;
  private discGeo!: DiscGeometry;
  private worldMatrix = mat4.create();
  private tex: WebGLTexture | null = null;
  private control!: ArcballControl;

  private discLocations!: {
    aModelPosition: number;
    aModelUvs: number;
    aInstanceMatrix: number;
    uWorldMatrix: WebGLUniformLocation | null;
    uViewMatrix: WebGLUniformLocation | null;
    uProjectionMatrix: WebGLUniformLocation | null;
    uCameraPosition: WebGLUniformLocation | null;
    uScaleFactor: WebGLUniformLocation | null;
    uRotationAxisVelocity: WebGLUniformLocation | null;
    uTex: WebGLUniformLocation | null;
    uFrames: WebGLUniformLocation | null;
    uItemCount: WebGLUniformLocation | null;
    uAtlasSize: WebGLUniformLocation | null;
  };

  private viewportSize = vec2.create();
  private drawBufferSize = vec2.create();

  private discInstances!: { matricesArray: Float32Array; matrices: Float32Array[]; buffer: WebGLBuffer | null; };
  private instancePositions: vec3[] = [];
  private DISC_INSTANCE_COUNT = 0;
  private atlasSize = 1;

  private _time = 0; private _deltaTime = 0; private _deltaFrames = 0; private _frames = 0;
  private movementActive = false;

  private TARGET_FRAME_DURATION = 1000/60;
  private SPHERE_RADIUS = 2;

  public camera: Camera = {
    matrix: mat4.create(), near: 0.1, far: 40, fov: Math.PI/4, aspect: 1,
    position: vec3.fromValues(0,0,3), up: vec3.fromValues(0,1,0),
    matrices: { view: mat4.create(), projection: mat4.create(), inversProjection: mat4.create() }
  };

  public smoothRotationVelocity = 0;
  public scaleFactor = 1.0;

  constructor(
    private canvas: HTMLCanvasElement,
    private items: MenuItem[],
    private onActiveItemChange: ActiveItemCallback,
    private onMovementChange: MovementChangeCallback,
    onInit?: InitCallback
  ){ this.init(onInit); }

  public resize(){ const need = resizeCanvasToDisplaySize(this.canvas); if(!this.gl) return;
    if(need){ this.gl.viewport(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight); }
    this.updateProjectionMatrix();
  }

  public run(time=0){ this._deltaTime = Math.min(32, time - this._time); this._time = time; this._deltaFrames = this._deltaTime / this.TARGET_FRAME_DURATION; this._frames += this._deltaFrames;
    this.animate(this._deltaTime); this.render(); requestAnimationFrame(t=>this.run(t)); }

  private init(onInit?: InitCallback){
    const gl = this.canvas.getContext('webgl2', { antialias:true, alpha:false });
    if(!gl) throw new Error('No WebGL 2 context!');
    this.gl = gl;

    vec2.set(this.viewportSize, this.canvas.clientWidth, this.canvas.clientHeight);
    vec2.clone(this.drawBufferSize);

    this.discProgram = createProgram(gl,[discVertShaderSource, discFragShaderSource], null, {
      aModelPosition: 0, aModelNormal: 1, aModelUvs: 2, aInstanceMatrix: 3
    });

    this.discLocations = {
      aModelPosition: gl.getAttribLocation(this.discProgram!, 'aModelPosition'),
      aModelUvs: gl.getAttribLocation(this.discProgram!, 'aModelUvs'),
      aInstanceMatrix: gl.getAttribLocation(this.discProgram!, 'aInstanceMatrix'),
      uWorldMatrix: gl.getUniformLocation(this.discProgram!, 'uWorldMatrix'),
      uViewMatrix: gl.getUniformLocation(this.discProgram!, 'uViewMatrix'),
      uProjectionMatrix: gl.getUniformLocation(this.discProgram!, 'uProjectionMatrix'),
      uCameraPosition: gl.getUniformLocation(this.discProgram!, 'uCameraPosition'),
      uScaleFactor: gl.getUniformLocation(this.discProgram!, 'uScaleFactor'),
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram!, 'uRotationAxisVelocity'),
      uTex: gl.getUniformLocation(this.discProgram!, 'uTex'),
      uFrames: gl.getUniformLocation(this.discProgram!, 'uFrames'),
      uItemCount: gl.getUniformLocation(this.discProgram!, 'uItemCount'),
      uAtlasSize: gl.getUniformLocation(this.discProgram!, 'uAtlasSize'),
    };

    this.discGeo = new DiscGeometry(56, 1);
    const data = this.discGeo.data;
    this.discBuffers = data;
    const vao = makeVertexArray(gl, [
      [makeBuffer(gl, data.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],
      [makeBuffer(gl, data.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2],
    ], data.indices);
    this.discVAO = vao;

    this.icoGeo = new IcosahedronGeometry();
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePositions = this.icoGeo.vertices.map(v => v.position);
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;
    this.initDiscInstances(this.DISC_INSTANCE_COUNT);
    this.initTexture();

    this.control = new ArcballControl(this.canvas, dt => this.onControlUpdate(dt));
    this.updateCameraMatrix(); this.updateProjectionMatrix();
    this.resize();
    onInit?.(this);
  }

  private initTexture(){
    if(!this.gl) return; const gl=this.gl;
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);

    const count = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(count));
    const cell = 512;
    const cvs = document.createElement('canvas'); const ctx = cvs.getContext('2d')!;
    cvs.width = this.atlasSize * cell; cvs.height = this.atlasSize * cell;

    Promise.all(this.items.map(item=>new Promise<HTMLImageElement>(resolve=>{
      const img = new Image(); img.crossOrigin='anonymous'; img.onload=()=>resolve(img); img.src=item.image;
    }))).then(images=>{
      images.forEach((img,i)=>{ const x=(i%this.atlasSize)*cell; const y=Math.floor(i/this.atlasSize)*cell; ctx.drawImage(img,x,y,cell,cell); });
      gl.bindTexture(gl.TEXTURE_2D, this.tex); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,cvs); gl.generateMipmap(gl.TEXTURE_2D);
    });
  }

  private initDiscInstances(count:number){
    if(!this.gl || !this.discVAO) return; const gl=this.gl;
    const matricesArray=new Float32Array(count*16); const matrices:Float32Array[]=[];
    for(let i=0;i<count;++i){ const arr=new Float32Array(matricesArray.buffer, i*16*4, 16); mat4.identity(arr as unknown as mat4); matrices.push(arr); }
    this.discInstances={ matricesArray, matrices, buffer: gl.createBuffer() };

    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);
    const slots=4, bytes=16*4;
    for(let j=0;j<slots;++j){ const loc=this.discLocations.aInstanceMatrix + j; gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,4,gl.FLOAT,false,bytes,j*4*4); gl.vertexAttribDivisor(loc,1); }
    gl.bindBuffer(gl.ARRAY_BUFFER,null); gl.bindVertexArray(null);
  }

  private animate(dt:number){
    if(!this.gl) return; this.control.update(dt, this.TARGET_FRAME_DURATION);
    const positions = this.instancePositions.map(p=>vec3.transformQuat(vec3.create(), p, this.control.orientation));
    const scale=0.25, SCALE_INT=0.6;

    positions.forEach((p,ndx)=>{ const s=(Math.abs(p[2])/this.SPHERE_RADIUS)*SCALE_INT + (1-SCALE_INT); const finalScale=s*scale; const m=mat4.create();
      mat4.multiply(m,m,mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(m,m,mat4.targetTo(mat4.create(), [0,0,0], p, [0,1,0]));
      mat4.multiply(m,m,mat4.fromScaling(mat4.create(), [finalScale,finalScale,finalScale]));
      mat4.multiply(m,m,mat4.fromTranslation(mat4.create(), [0,0,-this.SPHERE_RADIUS]));
      mat4.copy(this.discInstances.matrices[ndx], m);
    });

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.discInstances.buffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    this.smoothRotationVelocity = this.control.rotationVelocity;
  }

  private render(){
    if(!this.gl || !this.discProgram) return; const gl=this.gl;
    gl.useProgram(this.discProgram); gl.enable(gl.CULL_FACE); gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3f(this.discLocations.uCameraPosition!, this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    gl.uniform4f(this.discLocations.uRotationAxisVelocity!, this.control.rotationAxis[0], this.control.rotationAxis[1], this.control.rotationAxis[2], this.smoothRotationVelocity*1.1);

    gl.uniform1i(this.discLocations.uItemCount!, this.items.length);
    gl.uniform1i(this.discLocations.uAtlasSize!, this.atlasSize);

    // uniforms yang mungkin dioptimasi oleh compiler → cek null dulu
    if (this.discLocations.uFrames) gl.uniform1f(this.discLocations.uFrames, this._frames);
    if (this.discLocations.uScaleFactor) gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);

    gl.uniform1i(this.discLocations.uTex!, 0);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tex);

    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(gl.TRIANGLES, this.discBuffers.indices.length, gl.UNSIGNED_SHORT, 0, this.DISC_INSTANCE_COUNT);
    gl.bindVertexArray(null);
  }

  private updateCameraMatrix(){ mat4.targetTo(this.camera.matrix, this.camera.position, [0,0,0], this.camera.up); mat4.invert(this.camera.matrices.view, this.camera.matrix); }
  private updateProjectionMatrix(){
    if(!this.gl) return; const canvasEl = this.gl.canvas as HTMLCanvasElement;
    this.camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
    const height = this.SPHERE_RADIUS * 0.35; const distance = this.camera.position[2];
    this.camera.fov = (this.camera.aspect>1) ? 2*Math.atan(height/distance) : 2*Math.atan(height/this.camera.aspect/distance);
    mat4.perspective(this.camera.matrices.projection, this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
  }

  private onControlUpdate(dt:number){
    const timeScale = dt/this.TARGET_FRAME_DURATION + 0.0001; let damping = 5/timeScale; let cameraTargetZ = 3;
    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;
    if(isMoving !== this.movementActive){ this.movementActive = isMoving; this.onMovementChange(isMoving); }

    if(!this.control.isPointerDown){
      const nearest = this.findNearestVertexIndex(); const itemIndex = nearest % Math.max(1,this.items.length);
      this.onActiveItemChange(itemIndex);
      const snapDir = vec3.normalize(vec3.create(), this.getVertexWorldPosition(nearest));
      this.control.snapTargetDirection = snapDir;
    } else {
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7/timeScale;
    }

    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;
    this.updateCameraMatrix();
  }

  private findNearestVertexIndex(){ const n=this.control.snapDirection; const inv=quat.conjugate(quat.create(), this.control.orientation);
    const nt=vec3.transformQuat(vec3.create(), n, inv); let maxD=-1, nearest=0;
    for(let i=0;i<this.instancePositions.length;++i){ const d=vec3.dot(nt, this.instancePositions[i]); if(d>maxD){ maxD=d; nearest=i; } }
    return nearest;
  }
  private getVertexWorldPosition(i:number){ const p=this.instancePositions[i]; return vec3.transformQuat(vec3.create(), p, this.control.orientation); }
}

/* =================== REACT WRAPPER =================== */

const defaultItems: MenuItem[] = [{ image: "https://picsum.photos/900/900?grayscale", link: "https://google.com/", title: "", description: "" }];

interface InfiniteMenuProps { items?: MenuItem[]; }

const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null) as MutableRefObject<HTMLCanvasElement | null>;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; let sketch: InfiniteGridMenu | null = null;

    const handleActive = (index: number) => {
      if (!items.length) return;
      setActiveItem(items[index % items.length]);
    };

    if (canvas) {
      sketch = new InfiniteGridMenu(canvas, items.length ? items : defaultItems, handleActive, setIsMoving, (sk) => sk.run());
    }

    const handleResize = () => { sketch?.resize(); };
    window.addEventListener("resize", handleResize); handleResize();

    return () => { window.removeEventListener("resize", handleResize); };
  }, [items]);

  const handleButtonClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith("http")) window.open(activeItem.link, "_blank");
    else console.log("Internal route:", activeItem.link);
  };

  return (
    <div className="relative h-full w-full">
      <canvas
        id="infinite-grid-menu-canvas"
        ref={canvasRef}
        className="relative h-full w-full cursor-grab overflow-hidden outline-none active:cursor-grabbing"
      />
      {activeItem && (
        <>
          <h2
            className={[
              "select-none absolute font-black left-[1.6em] top-1/2 -translate-y-1/2 translate-x-[20%]",
              "[font-size:4rem] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
              isMoving ? "opacity-0 pointer-events-none duration-[100ms]" : "opacity-100 pointer-events-auto duration-[500ms]",
            ].join(" ")}
          >
            {activeItem.title}
          </h2>

          <p
            className={[
              "select-none absolute max-w-[10ch] text-[1.5rem] top-1/2 right-[1%] transition-all",
              "ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
              isMoving
                ? "opacity-0 pointer-events-none duration-[100ms] translate-x-[-60%] -translate-y-1/2"
                : "opacity-100 pointer-events-auto duration-[500ms] translate-x-[-90%] -translate-y-1/2",
            ].join(" ")}
          >
            {activeItem.description}
          </p>

          <div
            onClick={handleButtonClick}
            className={[
              "absolute left-1/2 z-10 grid h-[60px] w-[60px] place-items-center",
              "rounded-full border-[5px] border-black bg-[#00ffff] cursor-pointer",
              "transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
              isMoving
                ? "bottom-[-80px] -translate-x-1/2 scale-0 opacity-0 pointer-events-none duration-[100ms]"
                : "bottom-[3.8em] -translate-x-1/2 scale-100 opacity-100 pointer-events-auto duration-[500ms]",
            ].join(" ")}
          >
            <p className="relative top-[2px] select-none text-[26px] text-[#060010]">&#x2197;</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteMenu;
