"""Original procedural illustration for Yash Roushan's software portfolio.

Regenerate with Blender 4.3 or later:
    blender -b -t 5 -P compute-core-source.py -- --output compute-core.png

Convert the resulting transparent PNG to WebP with Pillow, at quality=91 and
method=6. This file is an offline authoring source, independent of the website's
JavaScript build. No external textures, models, or licensed stock assets are
required. The assembly is an illustrative software-layer motif.
"""
import argparse
import math
import random
import sys
from pathlib import Path

import bpy
from mathutils import Vector

args = argparse.ArgumentParser()
args.add_argument('--output', required=True)
args.add_argument('--width', type=int, default=1280)
args.add_argument('--height', type=int, default=1080)
args.add_argument('--samples', type=int, default=192)
args = args.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
rng = random.Random(89)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def srgb(x):
    return x / 12.92 if x <= .04045 else ((x + .055) / 1.055) ** 2.4

def color(hexval):
    raw = hexval.strip('#')
    return tuple(srgb(int(raw[i:i+2], 16)/255) for i in (0, 2, 4)) + (1,)

def material(name, hexval, metallic=0.0, rough=.35, coat=0.0, anis=0.0, grain=0, transmission=0, glass_ior=1.45, emission=None, strength=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = color(hexval)
    mat.use_nodes = True
    tree = mat.node_tree
    bsdf = tree.nodes.get('Principled BSDF')
    def setv(name, value):
        sock = bsdf.inputs.get(name)
        if sock: sock.default_value = value
    for n, v in [('Base Color', color(hexval)), ('Metallic',metallic),('Roughness',rough),('Coat Weight',coat),('Coat Roughness',.28),('Anisotropic IOR Level',anis),('Transmission Weight',transmission),('IOR',glass_ior)]: setv(n,v)
    if emission:
        setv('Emission Color', color(emission)); setv('Emission Strength', strength)
    if grain:
        coord = tree.nodes.new('ShaderNodeTexCoord')
        noise = tree.nodes.new('ShaderNodeTexNoise')
        noise.inputs['Scale'].default_value = grain
        noise.inputs['Detail'].default_value = 2
        tree.links.new(coord.outputs['Object'], noise.inputs['Vector'])
        ramp = tree.nodes.new('ShaderNodeValToRGB')
        for point, weight in zip(ramp.color_ramp.elements,[max(rough-.055,.04), min(rough+.055,1)]): point.color=(weight,weight,weight,1)
        tree.links.new(noise.outputs['Fac'],ramp.inputs[0]); tree.links.new(ramp.outputs[0],bsdf.inputs['Roughness'])
        bump=tree.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value=.07; bump.inputs['Distance'].default_value=.007
        tree.links.new(noise.outputs['Fac'],bump.inputs['Height']); tree.links.new(bump.outputs['Normal'],bsdf.inputs['Normal'])
    return mat

cap=material('Graphite ceramic-coated titanium','#3f4a50',.71,.29,.12,.33,125)
edge=material('Peripheral anodised edge','#687279',.75,.24,.1,.36,135)
black=material('Black silicon nitride','#1b2327',.42,.31,.18,grain=100)
cut=material('Recess shadow','#080f13',.22,.38)
trace=material('Electroless graphite','#7b898a',.79,.27,.10)
dimtrace=material('Slate routing layer','#556469',.64,.27,.10)
ink=material('Alumina alignment marks','#9ca8a6',.25,.39)
silver=material('Nickel plated stainless','#b4bab5',.9,.2,.16)
copper=material('Brushed copper','#bd7749',.89,.22,.12,.31,170)
bronze=material('Phosphor bronze','#845630',.8,.3,.1,grain=140)
gold=material('Gold plated contacts','#d59648',.85,.22,.14)
board=material('Solder-mask graphite','#283333',.51,.32,.2,grain=120)
die=material('Ceramic logic die','#302e2c',.60,.2,.35)
glass=material('Amber optical laminate','#d87816',.12,.19,.38,transmission=.37,glass_ior=1.52,emission='#b43f00',strength=.24)
glassdark=material('Polyimide amber','#a74609',.30,.27,.17,emission='#b95109',strength=.16)
glassedge=material('Polished amber edge','#f39b32',.28,.21,.44,emission='#fc8c17',strength=.43)
lightgold=material('Active copper logic','#ffbf67',.52,.2,.28,emission='#ffb555',strength=.50)
led=material('Amber status lamp','#ffad4a',.08,.18,.28,emission='#ffa936',strength=2.3)

# Meshes use matching winding on the top, bottom and sides so their bevels stay clean.
def mesh(name, verts, faces, mat):
    m = bpy.data.meshes.new(name); m.from_pydata(verts,[],faces); m.update()
    ob = bpy.data.objects.new(name,m); bpy.context.collection.objects.link(ob); ob.data.materials.append(mat); return ob

def finish(ob, bevel):
    if bevel:
        b=ob.modifiers.new('Machined edge','BEVEL'); b.width=bevel; b.segments=3; b.limit_method='ANGLE'; b.harden_normals=True
        n=ob.modifiers.new('Face weighted normals','WEIGHTED_NORMAL'); n.keep_sharp=True; n.weight=50
    return ob

def plate(name, x, y, z, w, d, h, chamfer, mat, bevel=.012):
    c=min(chamfer,w*.47,d*.47); w/=2; d/=2
    pts=[(-w+c,-d),(w-c,-d),(w,-d+c),(w,d-c),(w-c,d),(-w+c,d),(-w,d-c),(-w,-d+c)] if c>0 else [(-w,-d),(w,-d),(w,d),(-w,d)]
    n=len(pts); vs=[(x+px,y+py,z+dz) for dz in (-h/2,h/2) for px,py in pts]
    faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    return finish(mesh(name,vs,faces,mat),bevel)

def cylinder(name,x,y,z,rad,h,mat,segments=32,bevel=.003):
    pts=[(math.cos(2*math.pi*i/segments)*rad,math.sin(2*math.pi*i/segments)*rad) for i in range(segments)]
    vs=[(x+a,y+b,z+zz) for zz in [-h/2,h/2] for a,b in pts]; n=segments
    fs=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    return finish(mesh(name,vs,fs,mat),bevel)

def outline(x,y,z,w,d,c):
    w/=2;d/=2
    p=[(-w+c,-d),(w-c,-d),(w,-d+c),(w,d-c),(w-c,d),(-w+c,d),(-w,d-c),(-w,-d+c)]
    return [(x+a,y+b,z) for a,b in p+[p[0]]]

def ringpoints(x,y,z,r,ang1=0,ang2=360,n=40):
    return [(x+math.cos(math.radians(ang1+(ang2-ang1)*i/n))*r,y+math.sin(math.radians(ang1+(ang2-ang1)*i/n))*r,z) for i in range(n+1)]

# Batch independent routes into one curve object per line weight/material.
lines={}
def wire(mat,r,points):
    lines.setdefault((mat,r),[]).append(points)

def finish_lines():
    for (mat,r), paths in lines.items():
        c=bpy.data.curves.new(mat.name+' tracks','CURVE'); c.dimensions='3D'; c.resolution_u=1; c.bevel_depth=r; c.bevel_resolution=2; c.resolution_u=1
        for points in paths:
            s=c.splines.new('POLY');s.points.add(len(points)-1)
            for p,pt in zip(s.points,points): p.co=(*pt,1)
        ob=bpy.data.objects.new(mat.name+' tracks',c); bpy.context.collection.objects.link(ob); ob.data.materials.append(mat)

# Small exposed package passives, copper terminations and top pad.
def resistor(x,y,z,l=.16,w=.083,axis=0):
    dw,dd=(l,w) if axis==0 else (w,l)
    plate('SMD component',x,y,z+.025,dw,dd,.05,.008,black,.006)
    for direction in (-1,1):
        dx,dy=((direction*(l*.38),0) if axis==0 else (0,direction*(l*.38)))
        sx,sy=((l*.22,w*.99) if axis==0 else (w*.99,l*.22))
        plate('Tinned termination',x+dx,y+dy,z+.0255,sx,sy,.047,.007,silver,.005)

def datum(x,y,z,r=.074,light=False):
    cylinder('Fastener well',x,y,z+.004,r*1.30,.012,cut,28,.002)
    cylinder('Captive fastener',x,y,z+.012,r,.015,edge if not light else gold,28,.002)
    cylinder('Hex socket',x,y,z+.021,r*.51,.004,cut,6,0)

def route_fan(cx,cy,z,side,n,spacing,l_start,l_end,mat,weight,dots=False,shorten=0):
    # Non-crossing groups turn 45 degrees between a package and the perimeter.
    for i in range(n):
        p=(i-(n-1)/2)*spacing
        k=(i+.9)/n
        step=.11+.09*k
        end=l_end-(i%4)*shorten
        pts=[(p,l_start),(p,l_start+(end-l_start)*(.26+.25*k)),(p+step,l_start+(end-l_start)*(.26+.25*k)+step),(p+step,end)]
        oriented=[]
        for a,b in pts:
            pos=[(a,-b),(b,a),(-a,b),(-b,-a)][side]
            oriented.append((cx+pos[0],cy+pos[1],z))
        wire(mat,weight,oriented)
        if dots:
            px,py,pz=oriented[-1];wire(mat,weight,ringpoints(px,py,pz,.024,n=9))

def hatch(x,y,z,w,d,n,mat,r,axis=0):
    for i in range(n):
        off=(i/(n-1)-.5)*(d if axis==0 else w)
        pts=[(x-w/2,y+off,z),(x+w/2,y+off,z)] if axis==0 else [(x+off,y-d/2,z),(x+off,y+d/2,z)]
        wire(mat,r,pts)

# Carrier board and its cut, bright nickel perimeter.
bx,by=.04,-.16
plate('Dark socket base',bx,by,-.115,3.94,3.50,.19,.34,black,.049)
plate('Nickel-plated socket edge',bx,by,-.005,4.00,3.56,.076,.32,edge,.024)
plate('Exposed socket copper',bx,by,.061,3.95,3.51,.066,.32,bronze,.014)
plate('Multi-layer carrier',bx,by,.141,4.0,3.57,.118,.30,board,.026)
wire(trace,.009,outline(bx,by,.209,3.91,3.47,.28))
wire(copper,.009,outline(bx,by,.209,3.76,3.32,.25))
# Perimeter contacts around socket wall, with a visible 90-degree return under the base.
for side in range(4):
    long=3.05 if side in (0,2) else 2.55
    num=36 if side in (0,2) else 30
    for i in range(num):
        v=(i/(num-1)-.5)*long
        if side in (0,2):
            dir=-1 if side==0 else 1; x,y=bx+v,by+dir*1.778
            pts=[(x,y-dir*.059,.205),(x,y+dir*.016,.183),(x,y+dir*.022,.029),(x,y-dir*.039,.011)]
        else:
            dir=1 if side==1 else -1;x,y=bx+dir*1.992,by+v
            pts=[(x-dir*.060,y,.205),(x+dir*.015,y,.184),(x+dir*.021,y,.029),(x-dir*.044,y,.011)]
        wire(gold if i%6!=0 else copper,.013,pts)
# Recessed socket face with tactile pin density visible through the open stack.
plate('Socket surround',bx,by,.239,2.60,2.21,.095,.13,cut,.022)
plate('Socket',bx,by,.301,2.47,2.08,.076,.11,cap,.019)
plate('Printed socket array',bx,by,.350,2.26,1.86,.061,.085,board,.011)
wire(copper,.012,outline(bx,by,.382,2.14,1.76,.065))
for i in range(16):
    for j in range(12):
        if (i in (0,15) and j in (0,11)) or ((i*11+j*17)%23==0): continue
        x=bx+(i-7.5)*.127;y=by+(j-5.5)*.145
        wire(gold,.015,[(x-.014,y-.015,.388),(x+.017,y+.014,.386)])
for sd in range(4): route_fan(bx,by,.212,sd,14,.080,1.07 if sd in (0,2) else 1.27,1.51 if sd in (0,2) else 1.75,dimtrace,.0065,True,.014)
# Corner registration holes, passives and an exposed latch at the front.
for xx in (-1,1):
    for yy in (-1,1):
        dx,dy=bx+xx*1.68,by+yy*1.45
        cylinder('Board copper via',dx,dy,.205,.131,.014,copper,32,.002)
        cylinder('Board via socket',dx,dy,.216,.083,.014,cut,24,.002)
        wire(ink,.009,ringpoints(dx,dy,.215,.161,25 if xx==1 else 185,121 if xx==1 else 278,11))
for i in range(4):
    resistor(bx-1.48+i*.22,by-1.40,.214,.14,.069)
    resistor(bx+1.46,by-.49+i*.25,.213,.14,.069,1)
    resistor(bx+1.39,by+.67+i*.16,.214,.12,.064)
for xx in (-1.51,1.51):
    for yy in (-.79,.75):
        plate('Power stage',bx+xx,by+yy,.264,.20,.31,.11,.022,black,.017)
        for j in range(4):
            wire(silver,.010,[(bx+xx-.13,by+yy-.109+j*.070,.217),(bx+xx-.091,by+yy-.109+j*.070,.248)])

# Middle optical logic layer. Two thin amber edges bracket a heavier, textured wafer.
gx,gy=.045,-.035
plate('Logic underside guard',gx,gy,1.329,3.55,3.18,.094,.30,black,.033)
plate('Amber castellated substrate',gx,gy,1.409,3.62,3.25,.086,.31,glassdark,.028)
plate('Amber optical layer',gx,gy,1.486,3.66,3.29,.122,.32,glass,.040)
plate('Etched top veneer',gx,gy,1.557,3.61,3.24,.047,.32,glassedge,.017)
# inset layer on amber contains copper runners and plated center interposer.
plate('Amber control bed',gx,gy,1.583,3.44,3.07,.017,.28,glassdark,.006)
wire(lightgold,.012,outline(gx,gy,1.595,3.49,3.12,.29))
wire(lightgold,.005,outline(gx,gy,1.595,3.40,3.03,.27))
for sd in range(4):
    is_y=sd in (0,2)
    route_fan(gx,gy,1.598,sd,17 if is_y else 15,.056,.48 if is_y else .64,1.35 if is_y else 1.55,lightgold,.0075,True,.019)
for ix in (-1,1):
    for iy in (-1,1):
        xx,yy=gx+ix*1.39,gy+iy*1.19
        wire(lightgold,.012,ringpoints(xx,yy,1.599,.106,n=16))
        cylinder('Amber-mounted datum',xx,yy,1.595,.060,.01,bronze,16,.001)
        for k in range(4):
            # Paired right angle interconnect with truncated corner.
            t=.075*k
            wire(copper,.008,[(gx+ix*(.83+t),gy+iy*.82,1.599),(gx+ix*(.83+t),gy+iy*(1.05+t),1.599),(gx+ix*(.94+t),gy+iy*(1.16+t),1.599),(gx+ix*(1.05+t),gy+iy*(1.16+t),1.599)])
plate('Central interposer border',gx,gy,1.625,1.50,1.25,.065,.11,gold,.016)
plate('Bare logic die',gx,gy,1.672,1.40,1.15,.06,.10,die,.02)
for xx in (-.32,.32):
    for yy in (-.26,.26):
        plate('Etched die bank',gx+xx,gy+yy,1.707,.52,.39,.018,.039,cap,.006)
        hatch(gx+xx,gy+yy,1.718,.40,.24,7,trace,.006)
# Holes/contacts are sharp against front amber edge at hero size.
for side in (0,1):
    num=23 if side==0 else 20
    for i in range(num):
        v=(i/(num-1)-.5)*(2.85 if side==0 else 2.43)
        if side==0: pts=[(gx+v,gy-1.616,1.555),(gx+v,gy-1.648,1.532),(gx+v,gy-1.649,1.465)]
        else: pts=[(gx+1.805,gy+v,1.555),(gx+1.836,gy+v,1.533),(gx+1.836,gy+v,1.469)]
        wire(gold,.010,pts)

# A machined cover and separate side-wall overlap, with thin dark seams and nickel glints.
cx,cy=-.10,.11
plate('Lid underside',cx,cy,2.829,3.48,3.02,.12,.32,cut,.037)
plate('Lid inner shoulder',cx,cy,2.919,3.67,3.20,.135,.32,black,.031)
plate('Lid graphite belt',cx,cy,2.997,3.71,3.25,.062,.31,edge,.016)
plate('Lid milled face',cx,cy,3.096,3.77,3.31,.162,.33,cap,.044)
zt=3.179
wire(dimtrace,.012,outline(cx,cy,zt,3.60,3.14,.28))
wire(cut,.011,outline(cx,cy,zt,3.48,3.02,.245))
# Contoured dissipator fins are broken into offset fields. They follow the outer cap envelope.
for i in range(19):
    x=-1.41+i*.157
    aft=1.30-min(.16,max(0,abs(x)-1.18))
    front=-1.28+min(.18,max(0,abs(x)-1.15))
    clearance=.84-min(.15,max(0,abs(x)-.44)) if -.96<x<.97 else -.53+(.06 if i%3==0 else 0)
    for lo,hi in [(clearance,aft),(front,-clearance)]:
        if clearance<0 and lo<0 and hi>0:
            # A continuous channel remains on each side of the inset emblem.
            if lo==front: continue
            lo=front+.08; hi=aft-.08
        if hi-lo<.17: continue
        if abs(x)>1.13: lo+=.16; hi-=.14
        # Raised land with one dark flank and a slim, milled highlight.
        plate('Dissipator land',cx+x,cy+(lo+hi)/2,zt+.021,.069,hi-lo,.041,.029,cap,.013)
        wire(cut,.011,[(cx+x-.047,cy+lo+.023,zt+.003),(cx+x-.047,cy+hi-.023,zt+.003)])
# The central inset is a design cue, a miniature geometric circuit etch rather than a wordmark.
plate('Inset outer pocket',cx,cy,zt+.011,1.88,1.55,.031,.235,cut,.012)
plate('Inset nickel edge',cx,cy,zt+.033,1.80,1.481,.031,.207,dimtrace,.011)
plate('Inset black glass',cx,cy,zt+.054,1.74,1.42,.034,.196,black,.013)
iz=zt+.075
wire(dimtrace,.007,outline(cx,cy,iz,1.58,1.265,.175))
# Central die motif: overlapping three etched, nested circuits with asymmetric contact spurs.
for k in range(3):
    rw=.56-k*.11; rd=.49-k*.10
    wire(copper if k==0 else trace,.010 if k==0 else .007,outline(cx,cy,iz,rw,rd,.048))
for sd in range(4):
    for i in range(5):
        x=(i-2)*.084
        dl=.31+(i%3)*.067
        walk=[(x,.235),(x,dl),(x+.045,dl+.044),(x+.045,dl+.10)]
        arr=[]
        for a,b in walk:
            v=[(a,b),(-b,a),(-a,-b),(b,-a)][sd]; arr.append((cx+v[0],cy+v[1],iz))
        wire(copper if i==2 else dimtrace,.006,arr)
        if i in (0,4): wire(dimtrace,.006,ringpoints(*arr[-1],.018,n=8))
for dx,dy in [(-1.54,-1.29),(1.54,-1.29),(-1.54,1.29),(1.54,1.29)]: datum(cx+dx,cy+dy,zt,.085)
# Front-edge latch and a small set of amber indicators.
plate('Front-edge dark connector',cx+.52,cy-1.650,3.068,.49,.041,.075,.02,cut,.009)
for i in range(4):
    plate('Latch teeth',cx+.41+i*.067,cy-1.675,3.071,.027,.018,.028,.005,led if i==0 else copper,.004)
# Fine index marks and restrained device engravings are geometric rather than text at any size.
for i in range(11):
    x=cx-.77+i*.094
    wire(ink if i in (0,5,10) else dimtrace,.0047,[(x,cy-1.458,zt+.004),(x,cy-1.458+(.071 if i%5==0 else .040),zt+.004)])
# Tethering posts make the alignment legible without filling the empty space between the planes.
for dx,dy in ((-1.39,.99),(1.38,.99)):
    cylinder('Copper lid post',cx+dx,cy+dy,2.60,.040,.38,copper,24,.006)
    cylinder('Lid post collar',cx+dx,cy+dy,2.756,.072,.072,black,24,.004)
for dx,dy in ((-1.40,.96),(1.41,.96)):
    cylinder('Socket alignment guide',gx+dx,gy+dy,1.15,.031,.28,gold,20,.004)
# Tiny stand-offs underneath the chassis.
for dx,dy in ((-1.49,-1.22),(1.49,-1.22),(-1.49,1.22),(1.49,1.22)):
    cylinder('Board isolation foot',bx+dx,by+dy,-.25,.105,.17,black,32,.014)
finish_lines()

world=bpy.data.worlds.new('Cool studio ambient'); world.use_nodes=True
world.node_tree.nodes['Background'].inputs[0].default_value=(.77,.83,.93,1)
world.node_tree.nodes['Background'].inputs[1].default_value=.34; scene.world=world

def area(name,where,look,size,energy,hexval,shape='DISK',sizey=0):
    data=bpy.data.lights.new(name,'AREA');data.energy=energy;data.color=color(hexval)[:3];data.shape=shape;data.size=size
    if shape=='RECTANGLE': data.size_y=sizey
    ob=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(ob);ob.location=where
    ob.rotation_euler=(Vector(look)-ob.location).to_track_quat('-Z','Y').to_euler()
area('Tall cool softbox',(-4.2,-3.7,7.3),(0,0,1.4),4.7,720,'#eeeff2','RECTANGLE',5.8)
area('White tracing strip',(1.8,5.3,6.4),(0,0,1.2),5.3,1050,'#e5eeff','RECTANGLE',1.5)
area('Side reflector',(5.4,-1.4,4),(0,0,1.4),1.6,405,'#d7e2e5','RECTANGLE',5.4)
area('Copper kick',(-3.7,1.8,2.5),(0,0,1.2),1.4,130,'#ffac6f','RECTANGLE',2.1)
area('Front fill',(0,-5.5,1.8),(0,0,1.2),4,103,'#f5e6cb','RECTANGLE',2.2)

camdata=bpy.data.cameras.new('Product portrait'); cam=bpy.data.objects.new('Product portrait',camdata); bpy.context.collection.objects.link(cam)
look=Vector((0,0,1.38)); camera_dir=Vector((7.0,-9.2,6.1)); cam.location=look+camera_dir
cam.rotation_euler=(look-cam.location).to_track_quat('-Z','Y').to_euler(); camdata.type='ORTHO'; camdata.ortho_scale=6.70; scene.camera=cam
scene.render.engine='CYCLES';scene.cycles.samples=args.samples; scene.cycles.use_denoising=False;scene.cycles.adaptive_threshold=.026
scene.cycles.max_bounces=7;scene.cycles.diffuse_bounces=3;scene.cycles.glossy_bounces=4;scene.cycles.transmission_bounces=5
scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.render.image_settings.color_depth='8'; scene.render.resolution_x=args.width;scene.render.resolution_y=args.height;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=.15
scene.render.filepath=args.output
bpy.ops.render.render(write_still=True)
